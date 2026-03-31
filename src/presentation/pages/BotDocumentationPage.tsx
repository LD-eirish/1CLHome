

import { Header } from '../components/Header';
import '../styles/components.css';
import '../../styles/documentation.css';

export default function BotDocumentationPage() {
  return (
    <>
      <Header subtitle="1CL Bot — Full Feature Documentation" />
      <main className="documentation-layout docs-centered">
        <section className="docs-content docs-dark-bg">
          <section className="docs-hero">
            <h1 className="docs-title">1CL Bot — Full Feature Documentation</h1>
            <p className="docs-lead">This document describes every feature available in the 1CL Bot.</p>
          </section>
          <div className="docs-toc-top-full">
            <nav>
              <h2 className="docs-toc-title">Table of Contents</h2>
              <ol className="docs-toc-list">
                <li><a href="#overview">Overview</a></li>
                <li><a href="#logistics-system">Logistics System</a></li>
                <li><a href="#events-system">Events System</a></li>
                <li><a href="#awards-system">Awards System</a></li>
                <li><a href="#applications-forms-system">Applications & Forms System</a></li>
                <li><a href="#role-synchronization">Role Synchronization</a></li>
                <li><a href="#channel-protection">Channel Protection</a></li>
                <li><a href="#recruitment-tracking">Recruitment Tracking</a></li>
                <li><a href="#war-system">War System</a></li>
                <li><a href="#administrative-tools">Administrative Tools</a></li>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#help-statistics">Help & Statistics</a></li>
                <li><a href="#permissions-reference">Permissions Reference</a></li>
              </ol>
            </nav>
          </div>
          <hr className="docs-divider" />
          {/* --- Overview --- */}
          <section className="docs-section" id="overview">
            <h2>Overview</h2>
            <p>The 1CL Bot is a full-featured Discord bot designed for the 1CL Discord Community. It provides tools for managing logistics, planning and running events, issuing awards and certifications, processing member applications, synchronising roles across multiple servers, and moderating specific channels. All major systems are self-contained, each is configured separately in its own dedicated forum or channel, and each can be set up or removed independently without affecting the others.</p>
            <p>The bot stores all its data locally and persists it within a database. Most commands are restricted by configurable manager roles, meaning you can delegate moderation without granting full administrator access.</p>
          </section>
          <hr className="docs-divider" />
          {/* --- Logistics System --- */}
          <section className="docs-section" id="logistics-system">
            <h2>Logistics System</h2>
            <p>The logistics system provides a structured workflow for submitting, tracking, and fulfilling supply requests and transport jobs. Everything happens inside a configured Discord forum channel. Each request becomes a forum thread that the bot actively manages.</p>
            <h3>Setting Up</h3>
            <p>Before any logistics commands work, an administrator must run <code>/logisetup configure</code> in the forum channel where requests should appear. This command requires specifying the target forum channel and optionally separae ping roles for Logistic-Requests and Transport-Requests (the role that gets notified on new requests) and up to five manager roles (members with those roles can manage requests they did not create).</p>
            <p>The configuration can be reviewed at any time with <code>/logisetup view</code>, and removed with <code>/logisetup remove</code> (requires confirmation). To post or re-post the How to Use guide inside the forum, use <code>/logiguide</code>.</p>
            <p><code>/logisetup configure</code> can be re-run from within an already configured Forum to reconfigure any setup-parameter.</p>
            <h3>Creating Requests</h3>
            <p><b>/request</b> — Creates a standard supply request.</p>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>regiment</td><td>Yes</td><td>The regiment or unit the request is for</td></tr>
                <tr><td>items</td><td>Yes</td><td>Up to 6 items, each with a required quantity (autocomplete from built-in Foxhole item list)</td></tr>
                <tr><td>delivery location</td><td>Yes</td><td>Where the items should be delivered</td></tr>
                <tr><td>description</td><td>Yes</td><td>Notes or details about the request</td></tr>
                <tr><td>priority</td><td>Yes</td><td>High, Medium, or Low</td></tr>
                <tr><td>use_crates</td><td>No</td><td>When enabled, quantities are interpreted as crate counts instead of individual items</td></tr>
                <tr><td>ping</td><td>No</td><td>Whether to ping the configured logistics role on creation</td></tr>
                <tr><td>time limit</td><td>No</td><td>Optional, in days — if set, the request expires after that many days</td></tr>
              </tbody>
            </table>
            <p><b>/transport</b> — Same as <b>/request</b> but adds a pickup location field.</p>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>regiment</td><td>Yes</td><td>The regiment or unit the request is for</td></tr>
                <tr><td>items</td><td>Yes</td><td>Up to 6 items, each with a required quantity (autocomplete from built-in Foxhole item list)</td></tr>
                <tr><td>pickup location</td><td>Yes</td><td>Where the items should be picked up</td></tr>
                <tr><td>delivery location</td><td>Yes</td><td>Where the items should be delivered</td></tr>
                <tr><td>description</td><td>Yes</td><td>Notes or details about the request</td></tr>
                <tr><td>priority</td><td>Yes</td><td>High, Medium, or Low</td></tr>
                <tr><td>use_crates</td><td>No</td><td>When enabled, quantities are interpreted as crate counts instead of individual items</td></tr>
                <tr><td>ping</td><td>No</td><td>Whether to ping the configured transport role on creation</td></tr>
                <tr><td>time limit</td><td>No</td><td>Optional, in days — if set, the request expires after that many days</td></tr>
              </tbody>
            </table>
            <p>The bot creates a forum thread, posts an informational message listing all the details, and then posts a living tracking embed that shows:</p>
            <ul>
              <li>Progress for each item (delivered vs. required)</li>
              <li>A list of contributors (who has delivered items)</li>
              <li>A list of members actively working on the request</li>
              <li>The overall completion percentage</li>
              <li>Action buttons for marking items in-progress, recording deliveries, and completing or cancelling the request</li>
            </ul>
            <p>Threads are numbered automatically in a <code>1CL/C&#123;####&#125;</code> format scoped to the forum.</p>
            <p><b>/transport</b> — Works exactly like <b>/request</b> but adds a <b>pickup location</b> field in addition to the delivery location, making it suitable for transport jobs that require collecting materials from a specific place before delivering them.</p>
            <h3>Working on a Request</h3>
            <p><b>In-Progress tracking</b> lets members signal they are actively gathering items before they deliver. This prevents duplicate work and improves team coordination.</p>
            <ul>
              <li><b>/in-progress-add</b> — Reserves a quantity of a specific item in the current request (autocompletes from items in the request). The team can see who is gathering what.</li>
              <li><b>/in-progress-remove</b> — Cancels a previously placed reservation (only shows items where you have active reservations, and validates you cannot remove more than you reserved).</li>
              <li><b>/in-progress-clear</b> — Clears all in-progress reservations for the entire request. Administrator only.</li>
            </ul>
            <p>There is also an <b>"I'm Working On This"</b> button on each request embed. Clicking it toggles your name onto or off a "workers" list that is visible to everyone, giving a quick signal of active participation without committing to specific items.</p>
            <h3>Recording Deliveries</h3>
            <ul>
              <li><b>/add</b> — Records delivered items against the request. Items autocomplete from the current request. When a delivery is recorded:
                <ul>
                  <li>In-progress reservations are automatically deducted — the contributor's own reservations first, then other members' in chronological order</li>
                  <li>The tracking embed updates immediately with the new delivery total and progress percentage</li>
                  <li>If the delivery completes the required quantity for an item, the channel is notified</li>
                </ul>
              </li>
              <li><b>/remove</b> — Corrects an inadvertent over-count. Only shows items that have recorded deliveries. Any member can make a correction; the reviewer is tracked separately from the original contributor.</li>
            </ul>
            <h3>Editing Requests</h3>
            <ul>
              <li><b>/edit</b> — Only usable inside the request's forum thread. Any of the following fields can be updated: delivery location, priority, description, or the time limit. Only the original requester, administrators, and configured manager roles can edit requests. Every change is recorded in an immutable edit history — visible in the tracking embed — with the editor's name and a timestamp.</li>
            </ul>
            <h3>Completing and Cancelling</h3>
            <ul>
              <li><b>Mark as Completed</b> — The button on the tracking embed validates that all required quantities have been met. If so, the request is marked complete, completion statistics are saved, the logistics role is notified, and the thread is locked and archived automatically.</li>
              <li><b>Cancel Request</b> — The button marks the request as cancelled, then locks and archives the thread. No delivery validation is performed.</li>
            </ul>
          </section>
          <hr className="docs-divider" />
          {/* --- Events System --- */}
          <section className="docs-section" id="events-system">
            <h2>Events System</h2>
            <p>The events system manages the full lifecycle of in-game operations and events: creating them, managing sign-ups, assigning squad leads, and closing them out with a summary. It integrates with Discord's native Scheduled Events feature and creates temporary Discord roles to track attendance.</p>
            <h3>Setting Up</h3>
            <p>An administrator runs <code>/event-setup configure</code> in the forum where event threads should be created. This requires specifying a ping role (notified on event creation) and at least one manager role. Optionally, up to two additional manager roles can be specified, and a default thread auto-archive duration can be chosen (60 minutes, 24 hours, 3 days, or 7 days).</p>
            <p>Configuration can be reviewed with <code>/event-setup view</code>, removed with <code>/event-setup remove</code> (requires confirmation), and the How to Use guide can be re-posted at any time with <code>/event-setup guide</code>.</p>
            <h3>Campaigns</h3>
            <p>Campaigns are reusable labels that can be attached to events and logistics requests for grouping and filtering. They are managed server-wide.</p>
            <ul>
              <li><b>/campaign add</b> — Adds a campaign name to the list (autocompleted in <b>/event</b> and other commands)</li>
              <li><b>/campaign remove</b> — Removes a campaign from the list</li>
              <li><b>/campaign list</b> — Lists all currently saved campaigns</li>
            </ul>
            <h3>Creating an Event</h3>
            <p><b>/event</b> — Creates a full event. Parameters:</p>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>name</td><td>Yes</td><td>The name of the event</td></tr>
                <tr><td>time</td><td>Yes</td><td>Event date/time as a Discord timestamp (e.g. &lt;t:1234567890:F&gt;)</td></tr>
                <tr><td>description</td><td>Yes</td><td>A brief summary of the event</td></tr>
                <tr><td>pingrole</td><td>Yes</td><td>Whether to ping the configured event role on creation</td></tr>
                <tr><td>squadlead</td><td>Yes</td><td>Whether to enable squad lead tracking for this event</td></tr>
                <tr><td>customrole1–customrole12</td><td>No</td><td>Up to 12 sign-up roles</td></tr>
                <tr><td>customrole1_limit–customrole3_limit</td><td>No</td><td>Optional per-role signup caps (roles 1–3 only)</td></tr>
                <tr><td>war</td><td>No</td><td>Optional war identifier/label to associate with the event</td></tr>
                <tr><td>campaign</td><td>No</td><td>The campaign this event belongs to (autocompletes from saved campaigns)</td></tr>
              </tbody>
            </table>
            <p></p>
            <p><b>INFO:</b></p>
            <p>Roles 1–3 can have individual signup limits; when a role is full its button is disabled and a message is shown to latecomers. Roles 4–12 have no limit option due to Discord's command option cap.</p>
            <p>When the event is created, the bot automatically does three additional things:</p>
            <ol>
              <li><b>Creates a Discord Scheduled Event</b> on the server, set to start at the timestamp provided and end four hours later. The location links directly to the event thread. Members can click "Interested" on the Scheduled Event in Discord's event tab.</li>
              <li><b>Creates a temporary attendance Discord role</b> named after the event. This role is assigned to every member who signs up for the event (except those who mark themselves as Not Available) and is removed when they remove their signup or switch to Not Available.</li>
              <li><b>Creates a temporary squad lead Discord role</b> (if squadlead has been enabled) named <code>[SL] &lt;event name&gt;</code>. This role is assigned to members who are designated as squad leads for any role in the event.</li>
            </ol>
            <h3>Signing Up for Events</h3>
            <p>Inside the event thread, the sign-up embed contains one button per role plus a <b>Not Available</b> button. Members interact directly with the buttons:</p>
            <ul>
              <li>Clicking a role button <b>signs you up</b> for that role</li>
              <li>Clicking the same role button again <b>removes your signup</b></li>
              <li>Clicking a different role button <b>switches you</b> to that role without losing the temporary attendance role</li>
              <li>Clicking <b>Not Available</b> marks you as unavailable; clicking it again removes that status</li>
            </ul>
            <p>The temporary attendance role is managed fully automatically using these rules:</p>
            <table className="docs-table">
              <thead>
                <tr><th>Action</th><th>Role result</th></tr>
              </thead>
              <tbody>
                <tr><td>Sign up for any role</td><td>Attendance role assigned</td></tr>
                <tr><td>Switch to a different role</td><td>Attendance role kept</td></tr>
                <tr><td>Remove signup (last active signup)</td><td>Attendance role removed</td></tr>
                <tr><td>Switch to Not Available</td><td>Attendance role removed</td></tr>
                <tr><td>Click "Interested" on the Discord Scheduled Event</td><td>Attendance role assigned</td></tr>
                <tr><td>Remove "Interested" on the Discord Scheduled Event (and no bot signup exists)</td><td>Attendance role removed</td></tr>
              </tbody>
            </table>
            <h3>Squad Leads</h3>
            <p><b>/event-squadlead</b> — Assigns or removes a squad lead for a specific role. Only usable inside the event thread by managers or administrators. Options:</p>
            <ul>
              <li><b>role</b> — The event role to manage (autocompletes from the event's configured roles)</li>
              <li><b>name</b> — The member to assign as squad lead (autocompletes from server members)</li>
              <li><b>remove</b> — Set to <code>True</code> to clear the current squad lead for that role</li>
            </ul>
            <p>The sign-up embed always displays the current squad lead for each role directly below that role's signup list. The temporary squad lead Discord role is managed automatically: it is assigned when a member becomes squad lead for any role in the event, and removed only when they are no longer a squad lead for any role in that event.</p>
            <h3>Editing an Event</h3>
            <p><b>/event-edit</b> — Edits the details of an existing event. Any of the following can be updated: event name, time, description, campaign (enter <code>-</code> to remove the campaign link), and whether squad lead tracking is enabled or disabled. When squad lead tracking is toggled, the sign-up embed is rebuilt immediately. The event autocompletes from all active event threads in the configured forum.</p>
            <h3>Listing and Pinging</h3>
            <ul>
              <li><b>/event-list</b> — Lists all currently open events in the configured forum. For each event it shows the name, scheduled time, campaign (if set), all roles with their current filled/limit counts, total participants, and a direct link to the thread.</li>
              <li><b>/event-ping</b> — Posts a public ping of the configured event role with the current sign-up counts per role. An optional custom message can be included. Restricted to managers and administrators.</li>
              <li><b>/event-roster</b> — Shows you (and only you, as an ephemeral message) the full sign-up roster for the current event, listing every role with the display names of all signed-up members.</li>
            </ul>
            <h3>Closing, Cancelling, and Deleting</h3>
            <ul>
              <li><b>/event-close</b> — Marks the event as completed. The bot posts a public summary embed listing all sign-ups grouped by role and the total participant count, then renames the thread with a ✅ prefix, locks it, and archives it.</li>
              <li><b>/event-cancel</b> — Cancels the event. By default a brief public cancellation notice is posted inside the thread; adding <code>silent: True</code> skips that notice. The thread is then locked and archived.</li>
              <li><b>/event-delete</b> — Permanently deletes the event thread and all associated database records. Requires <code>confirm: True</code>. Administrator only.</li>
            </ul>
          </section>
          <hr className="docs-divider" />
          {/* --- Awards System --- */}
          <section className="docs-section" id="awards-system">
            <h2>Awards System</h2>
            <p>The awards system tracks medals and certifications for members, generates visual award cards, and posts them to a dedicated forum. Each member has exactly one forum post that is kept up to date automatically as awards change.</p>
            <h3>Setting Up</h3>
            <p>An administrator runs <code>/awards-setup configure</code>. This requires a forum channel for the award posts and at least one manager role. Optionally, up to two additional manager roles can be specified, a notification channel can be set, and member notification on card update can be enabled or disabled. The awards guide is posted automatically when configuring the forum for the first time, and can be re-posted at any time with <code>/awards-setup guide</code>. Configuration is viewable with <code>/awards-setup view</code> and removable with <code>/awards-setup remove</code>.</p>
            <h3>Medal Types</h3>
            <p>Medals must be defined before they can be awarded. Medal types have a name and an optional custom ribbon colour (specified as a hex code, e.g. <code>#FF4500</code>).</p>
            <ul>
              <li><b>/awards create_medal_type</b> — Creates a new medal type with a name and optional colour</li>
              <li><b>/awards edit_medal_type</b> — Renames a medal type, changes its colour, or clears its custom colour; any change retroactively regenerates the forum posts for all members who hold this medal</li>
              <li><b>/awards remove_medal_type</b> — Removes a medal type entirely</li>
              <li><b>/awards list_types</b> — Lists all configured medal and certification types</li>
            </ul>
            <h3>Certification Types</h3>
            <p>Certifications represent qualifications with distinct levels (e.g. I, II, III). Each certification type has a name, a comma-separated list of level labels, and an optional colour.</p>
            <ul>
              <li><b>/awards create_certification_type</b> — Creates a new certification type with a name and level list</li>
              <li><b>/awards edit_certification_type</b> — Edits the name, level list, or colour of a certification type. When the level list is changed, existing certifications held by members are migrated positionally — level 1 maps to the new level 1, level 2 to new level 2, and so on</li>
              <li><b>/awards remove_certification_type</b> — Removes a certification type entirely</li>
            </ul>
            <h3>Awarding Medals and Certifications</h3>
            <p>Both commands must be run from inside the member's forum thread (in the awards forum).</p>
            <p><b>/awards medal</b> — Awards a medal to a member.</p>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>member</td><td>Yes</td><td>The member receiving the medal</td></tr>
                <tr><td>medal</td><td>Yes</td><td>The medal type (autocompletes from configured medal types)</td></tr>
                <tr><td>description</td><td>No</td><td>Optional notes about the award (e.g. reason, operation name)</td></tr>
                <tr><td>operation</td><td>No</td><td>Optional operation associated with the award</td></tr>
              </tbody>
            </table>
            <p><b>/awards certification</b> — Awards a certification to a member.</p>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>member</td><td>Yes</td><td>The member receiving the certification</td></tr>
                <tr><td>type</td><td>Yes</td><td>The certification type (autocompletes)</td></tr>
                <tr><td>level</td><td>Yes</td><td>The certification level to award (autocompletes from the type's levels)</td></tr>
                <tr><td>expires</td><td>No</td><td>Optional expiry date in YYYY-MM-DD format</td></tr>
                <tr><td>notes</td><td>No</td><td>Optional notes</td></tr>
              </tbody>
            </table>
            <p>If the member already holds the certification at a different level, the record is updated to the new level.</p>
            <h3>Prestige</h3>
            <p>Prestige represents overall rank or seniority beyond normal medals. It is tracked as a numeric level capped at 10, with an overflow counter for levels beyond 10 (displayed as "Prestige 10 +N").</p>
            <ul>
              <li><b>/awards add_prestige</b> — Adds one prestige level</li>
              <li><b>/awards remove_prestige</b> — Removes one prestige level</li>
            </ul>
            <h3>Viewing and Removing Awards</h3>
            <ul>
              <li><b>/awards list</b> — Lists all medals and certifications held by a specific member. Medals show the type, description, awarding manager, and date. Certifications show the level, expiry date (struck-through if expired), and notes.</li>
              <li><b>/awards remove_medal</b> — Removes the most recently awarded medal from a member. The forum post updates automatically; if the member has no remaining awards the post is deleted.</li>
              <li><b>/awards remove_certification</b> — Removes a specific certification level from a member.</li>
            </ul>
            <h3>Notifications</h3>
            <p>Award notifications are bundled — rather than sending an immediate ping for every individual award, the bot queues notifications and delivers them in a single message per member after a 10-minute window. This prevents notification spam when multiple awards are given in quick succession.</p>
            <p>The <code>notify_member</code> setting in <code>/awards-setup configure</code> controls whether the awarded member is pinged in Discord when their award card is updated. This is <b>enabled by default</b>; set it to <code>False</code> to suppress pings.</p>
          </section>
          <hr className="docs-divider" />
          {/* --- Applications & Forms System --- */}
          <section className="docs-section" id="applications-forms-system">
            <h2>Applications & Forms System</h2>
            <p>The applications system allows administrators to build custom multi-question forms that members fill out via direct messages. Submissions are reviewed in a configured channel where managers can approve or deny them. Approved or denied submissions can automatically assign or remove Discord roles.</p>
            <h3>Creating Forms</h3>
            <p><b>/application create</b> — Launches the form creation wizard.</p>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>name</td><td>Yes</td><td>Name of the form</td></tr>
                <tr><td>description</td><td>Yes</td><td>Description of the form</td></tr>
                <tr><td>review channel</td><td>Yes</td><td>Channel where submissions will appear for staff review</td></tr>
                <tr><td>questions</td><td>Yes</td><td>One or more questions (see below for types)</td></tr>
              </tbody>
            </table>
            <p>Question types:</p>
            <table className="docs-table">
              <thead>
                <tr><th>Type</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>Text</td><td>Short single-line answer</td></tr>
                <tr><td>Paragraph</td><td>Long multi-line answer</td></tr>
                <tr><td>Number</td><td>Numeric answer</td></tr>
                <tr><td>Yes/No</td><td>Boolean yes-or-no choice</td></tr>
                <tr><td>Choice</td><td>Single-select from a list of options</td></tr>
                <tr><td>Multiple Choice</td><td>Select multiple answers from a list of options</td></tr>
              </tbody>
            </table>
            <p>Each question can be marked as required or optional and can include placeholder text shown in the input field. The wizard shows a live preview of the form as questions are added.</p>
            <h3>Deploying Forms</h3>
            <p>Once created, forms must be deployed to a channel before members can fill them out.</p>
            <ul>
              <li><b>/application deploy</b> — Posts a single form button in any channel. Members click "Start Application" to begin filling out the form in their DMs.</li>
              <li><b>/application deploy-multi</b> — Posts a shared embed in a channel that contains buttons for multiple forms at once (up to 5). Each button is labelled with its form name. You specify the display name of the embed, a comma-separated list of forms, the target channel, and an optional description.</li>
              <li><b>/application manage-group</b> — Adds or removes forms from an existing multi-form embed group after initial deployment.</li>
            </ul>
            <h3>Filling Out Applications</h3>
            <p>When a member clicks a form button the bot contacts them via DM and guides them through the form one question at a time. For choice questions, a select menu appears. For multi-choice questions the member selects their answers from a dropdown and confirms. For all other types the member types their answer.</p>
            <p>Sessions expire after one hour of inactivity. If a session expires, the in-progress submission is cleaned up and the member can start again. Stale sessions from before a bot restart are also cleaned up automatically on startup.</p>
            <h3>Reviewing Submissions</h3>
            <p>Completed submissions appear in the configured review channel as a formatted embed showing the applicant's name, form name, submission date, and all answers. Staff have three buttons:</p>
            <ul>
              <li><b>Approve</b> — Marks the submission as approved and assigns any configured approval roles. If the form is configured to open a ticket on approval, a ticket channel is also created automatically.</li>
              <li><b>Deny</b> — Marks the submission as denied and assigns any configured denial roles. If the form is configured to open a ticket on denial, a ticket channel is also created automatically.</li>
              <li><b>Create Ticket</b> — Manually creates a private text channel for the submission. The channel is only visible to the applicant and server staff, is placed in a configurable ticket category, and is named <code>application-&lt;username&gt;</code>. Once the submission is approved or denied, the ticket channel is automatically deleted.</li>
            </ul>
            <h3>Managing Roles on Forms</h3>
            <p><b>/application roles</b> — Opens a role configuration menu for a specific form. Three types of role rules can be set:</p>
            <ul>
              <li><b>Approve roles</b> — Roles automatically assigned when a submission is approved</li>
              <li><b>Deny roles</b> — Roles automatically assigned when a submission is denied</li>
              <li><b>Conditional roles</b> — Roles assigned only if a specific question in the form received a specific answer. The condition is case-insensitive and supports both single and multi-select answers</li>
            </ul>
            <h3>Listing and Managing Forms</h3>
            <ul>
              <li><b>/application list</b> — Lists all forms for the server, showing each form's name, question count, status (active or inactive), and review channel.</li>
              <li><b>/application submissions</b> — Views submissions, optionally filtered by form name and/or status (all, pending, approved, denied, in-progress). Shows submitter, form name, status, and submission date, plus summary statistics.</li>
              <li><b>/application delete</b> — Deletes a form and cleans up all associated data: active sessions are cancelled, temporary channels are deleted, and members with in-progress submissions are notified that the form has been removed.</li>
            </ul>
          </section>
          <hr className="docs-divider" />
          {/* --- Role Synchronization --- */}
          <section className="docs-section" id="role-synchronization">
            <h2>Role Synchronization</h2>
            <p>The role synchronization system links roles across multiple Discord servers. One server is designated as the "main" server; when a member on the main server gains or loses a synchronised role, the change is automatically propagated to all participating servers that have mapped a local role to that main server role.</p>
            <p>This is useful for multi-regiment communities where membership rank or membership status should be reflected uniformly across all affiliated servers.</p>
            <h3>Setting Up on the Main Server</h3>
            <ul>
              <li><b>/role-synchronize-setup</b> — Registers a role on the main server as synchronisable. Only the main server's administrator needs to do this. Once registered, other servers can map their own roles to it.</li>
              <li><b>/role-sync-remove-main</b> — Removes a role from the main server's synchronisable list. The role ID autocompletes from currently registered roles.</li>
            </ul>
            <h3>Setting Up on Participating Servers</h3>
            <ul>
              <li><b>/role-synchronize</b> — Maps a local role to a main server role.</li>
            </ul>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>main_server</td><td>Yes</td><td>The ID of the main server</td></tr>
                <tr><td>local_role</td><td>Yes</td><td>The local Discord role to assign</td></tr>
                <tr><td>main_role_id</td><td>Yes</td><td>The ID of the main server role to watch</td></tr>
              </tbody>
            </table>
            <ul>
              <li>When this link is created, the bot immediately performs a retroactive sync: it checks all members of the participating server and assigns the local role to anyone who already holds the corresponding main server role.</li>
              <li><b>/role-unsynchronize</b> — Removes a synchronization link. The link autocompletes from all current links (both outgoing and incoming).</li>
            </ul>
            <h3>Viewing Synchronisations</h3>
            <ul>
              <li><b>/role-sync-list-all</b> — Lists all synchronization links, both outgoing (this server has roles that others watch) and incoming (this server watches another server's roles). Each entry shows the main guild, main role, participating guild, and participating role.</li>
            </ul>
            <h3>How It Propagates</h3>
            <p>Role changes are detected in real time. When a member on the main server has a synchronised role added or removed, the bot automatically finds all participating servers with a mapping for that role and updates the member's roles there. The propagation runs up to five tasks concurrently to avoid Discord rate limits.</p>
            <p>On startup, the bot also performs a full sync check for all configured links to catch any changes that occurred while it was offline.</p>
          </section>
          <hr className="docs-divider" />
          {/* --- Channel Protection --- */}
          <section className="docs-section" id="channel-protection">
            <h2>Channel Protection</h2>
            <p>The channel protection system allows designating specific channels as protected zones where posting is not permitted. This is useful for channels that are used to trap harmful bots and scammers. The bot automatically deletes any message posted in a protected channel by an unauthorized member and takes further action depending on the configured mode.</p>
            <h3>Adding and Removing Protection</h3>
            <ul>
              <li><b>/protect add</b> — Protects a channel.</li>
            </ul>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>channel</td><td>Yes</td><td>The channel to protect</td></tr>
                <tr><td>instant_ban</td><td>No</td><td>When True, any unauthorized post immediately results in a ban (no warning first)</td></tr>
                <tr><td>exclude_admins</td><td>No</td><td>When True, server administrators are exempt from protection rules</td></tr>
              </tbody>
            </table>
            <ul>
              <li><b>/protect remove</b> — Removes protection from a channel and clears all stored violation history for that channel.</li>
            </ul>
            <h3>Protection Modes</h3>
            <p>When <b>instant_ban</b> is disabled (the default), first-time violations result in a warning message sent to the offending member. A second violation in the same protected channel results in a ban. The bot DMs the member a notification of the ban.</p>
            <p>When <b>instant_ban</b> is enabled, the very first unauthorized post immediately triggers a ban without a warning.</p>
            <h3>Managing Violations</h3>
            <ul>
              <li><b>/protect list</b> — Lists all currently protected channels and their settings (mode and admin exemption status).</li>
              <li><b>/protect toggle</b> — Toggles either the <code>instant_ban</code> or <code>exclude_admins</code> setting for an existing protected channel.</li>
              <li><b>/protect clear</b> — Clears warnings for a specific member across one or all protected channels, giving them a clean slate.</li>
            </ul>
          </section>
          <hr className="docs-divider" />
          {/* --- Recruitment Tracking --- */}
          <section className="docs-section" id="recruitment-tracking">
            <h2>Recruitment Tracking</h2>
            <p>The recruitment tracking system records which server members joined via which invite link, building a history of who recruited whom. This allows leadership to track recruitment activity and credit members for bringing in new recruits.</p>
            <h3>How It Works</h3>
            <p>When a new member joins the server, the bot compares the current usage count of all invite links against its cached copy to determine which link was used. The inviter, invite code, the new member's username, and the timestamp are recorded. The cache is updated after each join so subsequent joins are detected correctly.</p>
            <p>If the member joined via the server's vanity URL, that is recorded separately.</p>
            <h3>Viewing Recruitment Data</h3>
            <ul>
              <li><b>/recruitdata view</b> — Displays recruitment history with optional filters.</li>
            </ul>
            <table className="docs-table">
              <thead>
                <tr><th>Option</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>inviter</td><td>No</td><td>Filter to only show recruits credited to a specific member</td></tr>
                <tr><td>member</td><td>No</td><td>Show data for a specific recruited member</td></tr>
                <tr><td>page</td><td>No</td><td>Navigate through paginated results</td></tr>
              </tbody>
            </table>
            <ul>
              <li>The output includes a leaderboard of the top recruiters by recruit count and a chronological list of recent joins with the invite link used.</li>
            </ul>
            <h3>Managing Data</h3>
            <ul>
              <li><b>/recruitdata remove</b> — Removes a specific recruitment entry. Requires confirmation.</li>
              <li><b>/recruitdata manual</b> — Manually assigns recruitment credit to a member, useful for cases where the automatic detection could not determine the inviter.</li>
              <li><b>/recruitdata backfill</b> — Analyses all currently active invite links and creates aggregate placeholder entries based on how many times each link has been used. This is a best-effort import for historical data — it cannot attribute individual joins to specific dates, but it does allow the recruiter leaderboard to reflect historical invite usage even before the bot was active.</li>
            </ul>
          </section>
          <hr className="docs-divider" />
          {/* --- War System --- */}
          <section className="docs-section" id="war-system">
            <h2>War System</h2>
            <p>War tracking is an optional but helpful tool to help you organise and label Logistics-Requests and Events.</p>
            <h3>War Management</h3>
            <ul>
              <li><b>/war start</b> — Starts a new war within the systm. Automatically disables the previously active war. There can only be one active war at the same time. This will also reset the Logistics-Request number.</li>
              <li><b>/war end</b> — End the current war without starting a new one. Closes and archives all currently active Logistics-Requests.</li>
              <li><b>/war list</b> — List all recorded wars.</li>
              <li><b>/war current</b> — Show the currently active war and request stats.</li>
            </ul>
          </section>
          <hr className="docs-divider" />
          {/* --- Administrative Tools --- */}
          <section className="docs-section" id="administrative-tools">
            <h2>Administrative Tools</h2>
            <p><b>Note:</b> These admin commands can only be run by users who have been set as admins directly in the bot's <code>.env</code> file. Assigning Discord roles or permissions is not sufficient, only users explicitly listed as admins in the environment configuration can use these commands.</p>
            <h3>Bot Health and Diagnostics</h3>
            <ul>
              <li><b>/admin health</b> — Shows the current health status of the bot: whether it is ready, uptime, memory usage (heap used and total), WebSocket ping to Discord, and the number of servers the bot is active in.</li>
              <li><b>/admin logs</b> — Retrieves the last 10 log entries. Optionally filter by category (Command, Form, Application, Review, Web, Error, or All) and by log level (Debug, Info, Warn, Error). Useful for diagnosing issues without server access.</li>
              <li><b>/admin db-schema</b> — Shows the database table schema and a sample of stored data for debugging purposes.</li>
            </ul>
            <h3>Data Cleanup</h3>
            <ul>
              <li><b>/admin clear-logistics</b> — Clears all logistics requests for the current forum channel only. Destructive and irreversible.</li>
              <li><b>/admin clear-all-logistics</b> — Clears all logistics requests for the entire server across all configured forums. Destructive and irreversible. Also outputs debug information about stored guild IDs and request counts.</li>
            </ul>
          </section>
          <hr className="docs-divider" />
          {/* --- Dashboard --- */}
          <section className="docs-section" id="dashboard">
            <h2>Dashboard</h2>
            <p><b>/dashboard</b> — Returns an OAuth2 link for accessing the 1CL web dashboard. The dashboard provides a browser-based interface for managing the bot's configuration and data. The link is ephemeral (visible only to the person who ran the command). Administrator only.</p>
            <p>The dashboard uses HTTP-only session cookies for authentication and is protected against CSRF attacks. It is intended for in-depth server management tasks that benefit from a full UI rather than Discord slash commands.</p>
          </section>
          <hr className="docs-divider" />
          {/* --- Help & Statistics --- */}
          <section className="docs-section" id="help-statistics">
            <h2>Help & Statistics</h2>
            <p><b>/help</b> — Posts a full command reference, organised by category. Lists every available command with a brief description.</p>
          </section>
          <hr className="docs-divider" />
          {/* --- Permissions Reference --- */}
          <section className="docs-section" id="permissions-reference">
            <h2>Permissions Reference</h2>
            <p>The table below summarises who can use each category of command.</p>
            <div className="docs-table-wrapper">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>System</th>
                    <th>Create/Configure</th>
                    <th>Day-to-day Management</th>
                    <th>Users</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td>Logistics</td>
                      <td>Administrator</td>
                      <td>Configured manager roles or request creator</td>
                      <td>Create requets, add to requests, track progress</td>
                  </tr>
                  <tr>
                    <td>Events</td>
                    <td>Administrator</td>
                    <td>Configured manager roles</td>
                    <td>Sign-up buttons, /event-roster</td>
                  </tr>
                  <tr>
                    <td>Awards</td>
                    <td>Administrator</td>
                    <td>Configured manager roles</td>
                    <td>View posts only</td>
                  </tr>
                  <tr>
                    <td>Applications</td>
                    <td>Administrator</td>
                    <td>Configured manager roles via review channel</td>
                    <td>Form buttons in deployment channels</td>
                  </tr>
                  <tr>
                    <td>Role Sync</td>
                    <td>Administrator (main server)</td>
                    <td>Administrator (participating servers)</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Channel Protection</td>
                    <td>Administrator</td>
                    <td>Administrator</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Recruitment</td>
                    <td>Administrator</td>
                    <td>Administrator</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Admin tools</td>
                    <td>Administrator</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Dashboard</td>
                    <td>Administrator</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </section>
        </section>
      </main>
    </>
  );
}
