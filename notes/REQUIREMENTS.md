# Caretaking app — requirements working doc

A web app to replace the hand-written caretaking chart, used by multiple family members (and possibly aides) to track medications and activities for a care recipient, with summary views for doctor visits.

## Core pieces

1. **Item setup** — define what's being tracked (medications, activities) and their constraints
2. **Logging** — record when something happens
3. **Reporting** — summaries for doctor visits and for keeping the family in sync
4. **Auth & sharing** — multiple users, shared records

## Data model: care circles

- A **care circle** is its own entity (e.g. "Mom," "Dad," "Emma") — trackable items, logs, and the activity feed all belong to a circle, not to a user. The circle's name is the only identifier most screens need; nothing requires referring to "the patient" or "the recipient" as an abstract role in user-facing copy.
- Users and circles are many-to-many: a single user can belong to more than one circle (e.g. a sibling helping with two parents, or a parent and a child), via a **membership** that carries that user's role and status for that specific circle.
- Not exposed in the v1 UI (no circle switcher yet — a user just lands in their one circle), but the schema supports multiple circles per user from the start so this doesn't require restructuring data later.
- Notification preferences are per-user, global — not per-circle.
- Invites target a specific circle explicitly (an invite is "join circle X as role Y").

## Data model: care recipient designation

The person being cared for — the **care recipient** — is tracked as a fact about the circle, independent of role and independent of whether that person even has an account. This is necessary because the recipient doesn't fit one fixed shape:

- They might create and own the circle themselves (e.g. someone setting things up ahead of their own surgery, who later hands day-to-day logging to family).
- They might never have an account at all (e.g. a parent tracking a young child's medications; the child is the recipient but isn't a user in the system).
- They might have an account at any role — owner, admin, write, or read.

This is modeled as an `is_recipient` flag on membership, structurally similar to self-log mode below, but with a different cardinality: **zero or one** recipient-flagged membership per circle, rather than exactly one. A circle with no account-holding recipient (the child-tracking case) is a valid, ordinary steady state — not a gap to fill.

The flag can be set in two places:

- **At circle creation** — the creator can mark themselves as the recipient, setting the flag on the owner membership they're about to receive.
- **At invite time** — whoever sends the invite can mark it "this is the care recipient," so the flag is set once the invite is accepted.

_Open question:_ should marking an invite as "the recipient" be restricted to the circle owner, even though admins can otherwise send ordinary invites? This designation is a one-shot identity claim with no built-in undo, which makes it closer in spirit to the owner's two reserved powers (removing an admin, deleting the circle) than to routine invite-sending.

_Open question:_ reassignment. Invite-time and creation-time are currently the only places to set this flag — there's no path yet for fixing a misclick, or for transferring the designation later (e.g. the child eventually gets her own account and the family wants to move the flag from "no recipient" to her new membership). This probably belongs as a standing action on the People & Permissions screen rather than a one-time checkbox.

_Open question:_ what happens when a recipient-flagged member is removed from the circle — does the flag simply revert to "none," with no replacement required, or should removal be blocked/warned against in that case?

## Data model: trackable items

Every tracked thing is a "trackable item" with two independent attributes, rather than one fixed category. This avoids forcing edge cases (a scheduled benzo, a once-daily med where duplicate dosing is the actual risk) into the wrong bucket.

- **Monitoring** — does this need a safety check against over- or duplicate-dosing?
    - **Duplicate check** — for fixed-schedule items where the risk is re-administering something already given in that slot (e.g. a strict twice-daily med, or a memory-impaired recipient being re-dosed by a second caregiver).
    - **Interval-and-max check** — for variable/PRN items where the risk is cumulative dosing in a short window (pain meds, oxycodone, benzos). Shows a "next dose available at ___" countdown plus a running daily total.
    - **No monitoring** — just tracks whether it happened.
- **Cadence** — is it on a fixed schedule, or as-needed?
    - **Scheduled** — expected slots (AM/PM or custom), flagged if missed.
    - **As-needed** — logged when it happens, never flagged as missed. Can optionally carry an "expected times/day" for display only (e.g. fiber, laxatives), without blocking anything.

Four templates for the add-item flow, each a common combination of the two attributes above (editable if the default doesn't fit):

- **Highly-monitored meds** — monitoring: yes (interval-max), cadence: usually as-needed. _Tylenol, Oxycodone, Tramadol, Ibuprofen._
- **Scheduled meds** — monitoring: usually no, cadence: scheduled. _Citracal, Lisinopril, Aspirin._
- **As-needed, unmonitored** — monitoring: no, cadence: as-needed. _Psyllium, Senna, Clearlax._
- **Other activities/events** — non-medication; frequency-based (ice, exercises) or one-off (bowel movements).

The add/edit item form asks the two yes/no questions independently, with the four templates as fast-path presets.

## Logging UX

- Optimized for speed: a single tap to log "now" from a day view listing all active items.
- Easy to backdate/edit the timestamp afterward — caretakers often log in batches, not in real time.
- On a safety-check violation, confirm-with-override rather than a hard block (real caretaking sometimes needs it), with a clear warning (e.g. "already logged at 7:45a, log again?").
- Self-reported entries (if the recipient logs for themselves) pass through the same safety checks and are tagged as self-reported, so others can see provenance at a glance.

## Roles & permissions

Role is a single ordinal field per circle membership — each tier includes everything the tier below it can do:

- **Owner** — everything admin can do, plus two reserved actions: removing another admin, and deleting the circle entirely. Exactly one owner per circle.
- **Admin** (siblings) — invite people, assign/change roles up to admin, edit item definitions and dosing rules, log entries, remove non-admin members. Cannot remove another admin or delete the circle.
- **Write** (caregiver/aide) — log entries and view today's schedule; no access to edit item definitions; access easily revocable.
- **Read** — can view the log/activity feed but can't log or change anything.

Role tier is entirely independent of the care recipient designation above — a recipient can hold any role, including owner (e.g. the pre-surgery setup case).

Owner-specific behavior:

- The owner can remove an admin unilaterally.
- If the owner wants to leave the circle, they're prompted to either transfer ownership to another member first or delete the circle outright — a circle can't be left without an owner.

## Simplified UI mode

A personal, opt-in display preference — large tap targets, reduced navigation — that any member can toggle on for themselves regardless of role or recipient status. Default off for everyone. Decoupled from being the care recipient: useful for a recipient who wants a simpler interface, but equally useful for, say, an aide who's less comfortable with apps in general. Entries made while this mode is on are _not_ automatically tagged as self-reported — that tag is driven by the care recipient designation (see above), not by which UI a person happens to be using.

## Notifications

- Always-on visual indicator in-app (due now / next available at ___), regardless of notification settings.
- Push notifications are opt-in per user.

## Platform

- Installable PWA.
- Offline-first: writes save locally, sync when connectivity returns (spotty wifi at hospitals/clinics).
- Worth testing push notification behavior on the actual phones in use; PWA push support varies by platform and has shifted over time.

## Reporting & sharing

- **Doctor's-visit summary** — medication totals/timelines (especially pain meds, since dosage patterns over time are clinically relevant), BM frequency, scheduled-med adherence. Exportable/printable, since people often want a sheet to hand over rather than navigate a phone live at an appointment.
- **Activity feed** — simple chronological "who logged what, when" across the circle. Lower-effort than a formal report; may end up being the highest day-to-day value for keeping siblings in sync.
- **Free-text notes** — for things that don't fit a structured item (mood, appetite, new symptoms). Should surface in both the activity feed and the doctor summary timeline.

## Screen inventory (draft)

**Setup & accounts**

- Sign up / log in
- Accept invite
- Create or join a care circle (creation flow includes the option to mark the creator as the care recipient)
- Invite people, assign role (owner's invite flow includes the option to mark the invite as the care recipient)
- (Later, once multi-circle is exposed: circle switcher — not needed in v1 since each user has one circle)

**Daily use**

- Today / home view
- Log-entry interaction (slide-up sheet: defaults to now, backdate option, dose field if monitored)

**Management**

- Item library (edit / archive)
- Add / edit item form
- People & permissions (also where care recipient reassignment would live, per open question above)

**Reporting & sharing**

- Doctor's-visit summary
- Activity feed
- Free-text notes entry

**Settings**

- Notification preferences
- Simplified UI mode toggle
- Account / profile

## Open questions

- Should marking an invite as "the care recipient" be restricted to the owner, or open to any admin sending an invite?
- How/where does care recipient reassignment work after the initial designation?
- What happens to the recipient designation when that member is removed from the circle?
- Structure for free-text notes — plain text + timestamp, or tags/categories too?
- Invite flow specifics — email vs. link, expiry?
- Which screen to spec out first
