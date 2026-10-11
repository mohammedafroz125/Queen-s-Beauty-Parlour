<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture
- Keep the core beauty site as a single scrolling homepage with reusable enquiry and presentation components; the requested experience is one homepage.
- Keep business contact configuration and pure enquiry formatting in a browser-safe shared module; unconfirmed contact details must never produce a live destination.
- Prepare enquiry drafts entirely in memory without storage or network submission until a backend is explicitly requested; this prevents false booking confirmations.
