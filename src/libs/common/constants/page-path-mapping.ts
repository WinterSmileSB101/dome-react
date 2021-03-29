import { Domain } from '../router';
import { PageAlias } from './page-alias';

type PathMapping = { [key: string]: { path: string; domain: Domain } };

const PagePathMapping: PathMapping = {
    [PageAlias.DemonMInfo]: { path: 'demon/minfo', domain: Domain.MainSite },
    [PageAlias.HomeHome]: { path: 'home', domain: Domain.MainSite },
};

export { PagePathMapping };
