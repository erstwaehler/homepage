import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export type Page = GetTypeByName<typeof configuration, "pages">;
export declare const allPages: Array<Page>;

export type Team = GetTypeByName<typeof configuration, "team">;
export declare const team: Team;

export type Pressemitteilungen = GetTypeByName<typeof configuration, "Pressemitteilungen">;
export declare const allPressemitteilungens: Array<Pressemitteilungen>;

export type Partner = GetTypeByName<typeof configuration, "partner">;
export declare const partner: Partner;

export type HeroImage = GetTypeByName<typeof configuration, "hero-images">;
export declare const heroImage: HeroImage;

export {};
