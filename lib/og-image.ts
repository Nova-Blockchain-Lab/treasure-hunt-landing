// The site-wide card image (app/opengraph-image.tsx). The metadata sets it by
// hand rather than letting Next inject its hashed URL, because a child
// segment's openGraph replaces the parent's wholesale. X, LinkedIn and Slack
// cache card images by URL, so bump ?v= whenever the image changes.
export const OG_IMAGE = 'https://www.treasurehunt.pt/opengraph-image?v=3'
