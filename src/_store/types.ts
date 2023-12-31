export enum ETitleCategory {
	all = 'all',
	drama = 'drama',
	news = 'news',
	comedy = 'comedy',
	reality = 'reality',
	latenight = 'latenight',
	special = 'special',
	peacockoriginal = 'peacockoriginal',
	sports = 'sports',
	other = 'other',
    scifi = 'scifi',
    biopic = 'biopic',
    animation = 'animation',
    action = 'action',
}

export const TitleDisplayCategories = {
	[ETitleCategory.all]: 'All',
	[ETitleCategory.drama]: 'Drama',
	[ETitleCategory.news]: 'News',
	[ETitleCategory.comedy]: 'Comedy',
	[ETitleCategory.reality]: 'Reality',
	[ETitleCategory.latenight]: 'Late Night',
	[ETitleCategory.special]: 'Special',
	[ETitleCategory.sports]: 'Sports',
	[ETitleCategory.peacockoriginal]: 'Peacock Original',
	[ETitleCategory.other]: 'Other',
    [ETitleCategory.scifi]: 'Sci-Fi',
    [ETitleCategory.biopic]: 'Biopic',
    [ETitleCategory.animation]: 'Animation',
    [ETitleCategory.action]: 'Action',
};

export interface IDvdUserObject {
	name: string;
	category: string;
	image: string;
	featured?: boolean;
}

export interface IDvdListObject extends IDvdUserObject {
	id: number;
}

export enum ESortOption {
	titleAscending = 'S0',
	titleDescending = 'S1',
	categoryAscending = 'S2',
	categoryDescending = 'S3',
}

export const DisplaySortOptions = {
	[ESortOption.titleAscending]: 'Title (A-Z)',
	[ESortOption.titleDescending]: 'Title (Z-A)',
	[ESortOption.categoryAscending]: 'Category (A-Z)',
	[ESortOption.categoryDescending]: 'Category (Z-A)',
};
