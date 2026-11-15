# PlanWise (BananaPeel app)

The whole PlanWise family as one Mac app:

- **PlanWise** (`planwise.html`), the shared trip board, opens first
- **PlanwiseER** (`planwiseer.html`), destination and stay ideas
- **Plany** (`plany.html`), the place finder
- **Plany Live** (`plany/live.html`), the voice version

They link to each other inside the app and share one login, the same Firebase database as the websites at blockblock2.github.io.

```bash
bananapeel install blockblock2/planwise-app
bananapeel run planwise
```

Invite links made in the app still point at the website, so people without the app can join.
