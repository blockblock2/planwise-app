# PlanWise (BananaPeel app)

The whole PlanWise family as one Mac app, with all three sites in one window:

- **PlanWise** (`planwise.html`), the shared trip board, opens first
- **PlanwiseER** (`planwiseer.html`), destination and stay ideas
- **Plany** (`plany.html`), the place finder, with Plany Live (`plany/live.html`) for voice

They link to each other inside the app and share one login, the same Firebase database as the websites at blockblock2.github.io.

```bash
bananapeel install blockblock2/planwise-app
bananapeel run planwise
```

Invite links made in the app still point at the website, so people without the app can join.
