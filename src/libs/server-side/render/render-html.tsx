import React from 'react';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { renderToNodeStream } from 'react-dom/server';

import { RenderModel, RenderOption } from '../types';
import HtmlStructure from './html-structure';
import ServerSideRenderError from './error';

const createHtml = (controllerResult: Observable<any>, options: RenderOption) =>
    controllerResult.pipe(
        map((result) => renderHtml({ controllerResult: result, renderOption: options })),
        switchMap((_) => _), // convert multiple observable to one
    );

const createBuffer = (renderModel: RenderModel) => (onEnd: (buf: Buffer) => void, onError: (err: Error) => void) => {
    let buf = Buffer.from('<!DOCTYPE html>');

    const stream = renderToNodeStream(
        <HtmlStructure.HtmlStructure bodyElement={renderModel?.renderOption?.rootElement} headOption={undefined} />,
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

export default { createHtml };
