export enum EShowCategories {
    drama = 'drama',
    news = 'news',
    comedy = 'comedy',
    reality = 'reality',
    latenight = 'latenight',
    special = 'special',
    peacockoriginal = 'peacockoriginal',
    sports = 'sports',
    other = 'other',
};

export interface INbcObject {
    name: string,
    category: EShowCategories,
    image: string | null,
    featured?: boolean,
};

export interface INbcListObject extends INbcObject {
    id: number,
};
