/**
 * Project types for multi-tenant builder.
 *
 * A Project binds a logged-in GitHub user to a target repository that holds
 * their editable content (content/pages/*.json) and gets published to GitHub
 * Pages. The default repo for a user is their `<username>.github.io` user site.
 *
 * The project registry (see project/store.server.ts) is a convenience cache:
 * a project is fully reconstructible from `{ owner, repo }`, so creation is
 * idempotent.
 */

export interface Project {
	/** Unique ID (nanoid) */
	id: string;
	/** GitHub username that owns the target repo */
	owner: string;
	/** Target repo name (default `<owner>.github.io`) */
	repo: string;
	/** Target branch (default "main") */
	branch: string;
	/** Path within the repo where page JSON lives (default "content/pages") */
	contentPath: string;
	/** Human-readable project title */
	title?: string;
	createdAt: string;
	updatedAt: string;
}

/** The conventional GitHub Pages user-site repo for a username. */
export function defaultRepoFor(username: string): string {
	return `${username}.github.io`;
}
