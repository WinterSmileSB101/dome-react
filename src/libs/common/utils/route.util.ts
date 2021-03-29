import { pathToRegexp, compile, Key } from 'path-to-regexp';
import { memoize } from 'lodash';

type PathBuilderFunction = (parameters: { [key: string]: string | boolean | number }) => string;
type Segments = string[];

const getCompiler = memoize((path: string): {
    pathBuilderFunc: PathBuilderFunction;
    segments: Segments;
} => {
    const urlSegments: Key[] = [];

    pathToRegexp(path, urlSegments);

    return {
        pathBuilderFunc: compile(path),
        segments: urlSegments?.map((s) => s?.name?.toString()),
    };
});

function buildPathSegment(path, parameters) {
    const innerParameters = { ...parameters };
    const { pathBuilderFunc, segments } = getCompiler(path);

    const finalSegments = segments?.reduce((rcc, key) => {
        rcc[key] = innerParameters[key];

        return rcc;
    }, {});

    return pathBuilderFunc(finalSegments);
}

export { PathBuilderFunction, Segments, getCompiler, buildPathSegment };
