import React from 'react';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { renderToNodeStream } from 'react-dom/server';

import { RenderModel, RenderOption } from '../types';
import HtmlStructure from './html-structure';
import ServerSideRenderError from './error';
import { addScripts, addStyles } from './pipes';
import { addHeader } from './pipes/add-header';

const createBuffer = (renderModel: RenderModel) => (onEnd: (buf: Buffer) => void, onError: (err: Error) => void) => {
    let buf = Buffer.from('<!DOCTYPE html>');

    const stream = renderToNodeStream(
        <HtmlStructure.HtmlStructure
            bodyElement={renderModel?.renderOption?.rootElement}
            headOption={{
                ...renderModel?.headerOption,
                metaList: renderModel.metaList,
                injectedScripts: renderModel.injectedScripts,
                injectedStyles: renderModel.injectedStyles,
            }}
            initData={renderModel.controllerResult?.initData}
        />,
    );

    stream.on('data', (chunk) => {
        buf = Buffer.concat([buf, chunk]);
    });

    stream.on('error', (err) => {
        console.log('error', err);
        onError(new ServerSideRenderError.ServerSideRenderError(err));
    });

    stream.on('end', (data) => {
        onEnd(buf);
    });
};

const renderHtml = (renderModel: RenderModel) =>
    new Observable<Buffer>((subscriber) => {
        createBuffer(renderModel)(
            (buf: Buffer) => {
                subscriber.next(buf);
                subscriber.complete();
            },
            (error: Error) => {
                subscriber.error(error);
            },
        );
    });

const createHtml = (controllerResult: Observable<any>, options: RenderOption) =>
    controllerResult.pipe(
        map((result) => ({ controllerResult: result, renderOption: options } as RenderModel)), // convert to renderModel
        map(addScripts),
        map(addStyles),
        map(addHeader),
        map(renderHtml), // render

        switchMap((_) => _), // convert multiple observable to one
    );

export default { createHtml };
