import '../styles/components.css';
import '../styles/documentation.css';
import { BotDocsLayout } from '../components/BotDocsLayout';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'What It Does', href: '#what-it-does' },
  { label: 'Setup', href: '#setup' },
  { label: 'Setup View/Remove', href: '#setup-view-remove' },
  { label: 'Guide Post', href: '#guide-post' },
  { label: 'Creation Flow', href: '#creation-flow' },
  { label: 'Role Limit', href: '#role-limit' },
  { label: 'Direct Publish', href: '#direct-publish' },
  { label: 'Draft Mode', href: '#draft-mode' },
  { label: 'Draft Permissions', href: '#draft-permissions' },
  { label: 'Draft Editing', href: '#draft-editing' },
  { label: 'Draft Review Actions', href: '#draft-review-actions' },
  { label: 'Publish-Time Draft Rules', href: '#publish-time-drafts' },
  { label: 'Live Event Behavior', href: '#live-event-behavior' },
  { label: 'Signups', href: '#signups' },
  { label: 'Synced Events', href: '#synced-events' },
  { label: 'Squad Leads', href: '#squad-leads' },
  { label: 'Manage Event Controls', href: '#manage-event-controls' },
  { label: 'Reminders', href: '#reminders' },
  { label: 'Ending an Event', href: '#ending-event' },
  { label: 'Permissions Summary', href: '#permissions-summary' },
  { label: 'Quick Reference', href: '#quick-reference' },
];

export function EventFeatureDocsPage() {
  return (
    <BotDocsLayout
      subtitle="Event Feature Documentation"
      title="Events"
      lead="Reference documentation for eirish's Foxhole Assistant event system, from forum setup through live publication and closure."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Bot Documentation', to: '/bot-documentation' },
        { label: 'Event Feature' },
      ]}
      navItems={NAV_ITEMS}
    >
      <section className="docs-section" id="overview">
        <h2>Overview</h2>
        <p>This page explains the current implementation of the Event Feature. It covers the system's functionality, setup, and usage. It is always subject to change.</p>
      </section>

      <section className="docs-section" id="what-it-does">
        <h2>What the Event System Does</h2>
        <ul>
          <li>forum-level event configuration</li>
          <li>guide-post driven creation</li>
          <li>optional draft-first approval workflow</li>
          <li>live Event V2 signup panels</li>
          <li>role-based signups with limits</li>
          <li>synced events across multiple servers</li>
          <li>creator/admin-only squad lead assignment</li>
          <li>automatic 1-hour reminders</li>
          <li>close, cancel, and delete end-of-life flows</li>
        </ul>
      </section>

      <section className="docs-section" id="setup">
        <h2>Setup</h2>
        <p>
          Use <code>/event-setup configure</code> to configure an event forum. Only administrators can run setup.
        </p>
        <ul>
          <li>pass <code>event_forum</code> explicitly to target a specific live event forum from anywhere</li>
          <li>if <code>event_forum</code> is omitted, setup falls back to the parent forum of the current public thread</li>
          <li>for multi-forum servers, explicitly setting <code>event_forum</code> is strongly recommended</li>
        </ul>
        <table className="docs-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>pingrole</code></td><td>Role pinged when a live event is published.</td></tr>
            <tr><td><code>managerrole</code></td><td>Primary role that can manage events and review drafts.</td></tr>
            <tr><td><code>who_can_create</code></td><td>Controls event/draft creation permissions. Supports <code>Everyone</code>, <code>Manager Roles</code>, or <code>Admins</code>.</td></tr>
            <tr><td><code>event_forum</code></td><td>Necessary to determine which forum will be set up as the main event forum.</td></tr>
            <tr><td><code>managerrole2</code>, <code>managerrole3</code></td><td>Optional additional manager roles.</td></tr>
            <tr><td><code>mainvoicechannel</code></td><td>Optional voice/stage channel for scheduled event creation behavior.</td></tr>
            <tr><td><code>enable_event_draft</code></td><td>Enables draft-first publishing workflow.</td></tr>
            <tr><td><code>event_draft_forum</code></td><td>Required when draft mode is enabled.</td></tr>
          </tbody>
        </table>
      </section>

      <section className="docs-section" id="setup-view-remove">
        <h2>Setup View and Remove</h2>
        <p><code>/event-setup view</code> returns configured forum, ping role, main voice channel, manager roles, draft status, who-can-create, and last updated timestamp.</p>
        <p><code>/event-setup remove</code> deletes forum configuration and requires <code>confirm: true</code>. Both commands can accept <code>event_forum</code> to target a specific live forum directly.</p>
      </section>

      <section className="docs-section" id="guide-post">
        <h2>Guide Post</h2>
        <p>
          The bot maintains a guide thread named <code>How to Use the Events System</code>. It refreshes when setup runs, when <code>/event-setup guide</code> runs, and on bot startup.
        </p>
        <p>
          The guide is refreshed in the live event forum stored in <code>EventConfig</code>. If setup was previously run from the wrong forum without explicitly setting <code>event_forum</code>, guide refreshes can continue targeting that wrong forum until config is corrected.
        </p>
        <p>
          Guide content uses Components V2 and adapts to draft mode. Draft disabled: <code>Create Event</code>. Draft enabled: <code>Create Event Draft</code>.
        </p>
      </section>

      <section className="docs-section" id="creation-flow">
        <h2>Creation Flow</h2>
        <p>
          Creation starts from the guide button in both modes. The bot opens the Event V2 modal for name, time, description, roles, and location.
        </p>
        <p>After the core modal submit, the chooser offers <code>Set Optional Settings</code>, <code>Create With Defaults</code>, or <code>Cancel</code>.</p>
        <table className="docs-table">
          <thead>
            <tr>
              <th>Option</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>Create With Defaults</code></td><td><code>pingRole = true</code>, <code>squadLeadEnabled = true</code>, <code>syncServers = false</code>, no explicit role limits.</td></tr>
            <tr><td><code>Set Optional Settings</code></td><td>Optional modal fields: <code>pingRole</code>, <code>squadLeadEnabled</code>, <code>syncServers</code> and <code>roleLimits</code>.</td></tr>
          </tbody>
        </table>
        <p>
          Role limits support named format (<code>Medic:5, Infantry:8</code>) and positional format (<code>5,8,3</code>).
        </p>
      </section>

      <section className="docs-section" id="role-limit">
        <h2>Role Count Limit</h2>
        <p>The Event V2 workflow enforces a maximum of 20 roles to stay compatible with the Discord imposed panel and modal design constraints.</p>
      </section>

      <section className="docs-section" id="direct-publish">
        <h2>Direct Publish</h2>
        <p>
          When draft mode is disabled, successful creation publishes directly into the configured live event forum.
        </p>
        <ul>
          <li>creates the event thread</li>
          <li>posts the starter message</li>
          <li>creates the persistent event record</li>
          <li>creates the temporary attendance role</li>
          <li>optionally creates the temporary squad lead role</li>
          <li>optionally creates a Discord Scheduled Event when the timestamp is valid and in the future</li>
          <li>posts and pins the Event V2 signup panel</li>
          <li>optionally mirrors the event to synced servers</li>
          <li>optionally pings the configured event role</li>
        </ul>
        <h3>Scheduled Event Creation</h3>
        <p>The bot attempts Discord Scheduled Event creation when event time contains a valid future Discord timestamp.</p>
        <p>If scheduled event creation fails, live event publishing still succeeds and failure is reported as a warning.</p>
      </section>

      <section className="docs-section" id="draft-mode">
        <h2>Draft Mode</h2>
        <p>
          When draft mode is enabled, creation stops at a draft review thread instead of publishing immediately.
        </p>
        <p>Draft thread naming format is <code>DRAFT: [Event Name]</code>.</p>
        <p>Each draft thread includes starter details, pinned draft control panel, creator ping, and optional reviewer notes.</p>
        <ul>
          <li>draft panel fields include event name, time, location, creator, status, flags, role summary</li>
          <li>draft panel actions include <code>Edit Event</code>, <code>Approve</code>, <code>Needs Revision</code>, <code>Reject</code></li>
        </ul>
        <h3>Draft Review Notes</h3>
        <p>Notes are informational-only and can include missing/invalid timestamp, missing roles, overlapping near-term open events, or sync requested with no additional servers.</p>
      </section>

      <section className="docs-section" id="draft-permissions">
        <h2>Draft Permissions</h2>
        <p>Draft creation is controlled by <code>who_can_create</code>.</p>
        <p>Draft editing: admins, configured manager roles, and the draft creator.</p>
        <p>Draft review actions are limited to admins and configured manager roles.</p>
      </section>

      <section className="docs-section" id="draft-editing">
        <h2>Draft Editing</h2>
        <p>Clicking <code>Edit Event</code> opens an ephemeral draft edit menu.</p>
        <p>Editable fields: name, time, description, location, roles, and squadlead enabled/disabled.</p>
        <ul>
          <li>updates stored draft data</li>
          <li>rewrites the draft starter post</li>
          <li>renames the draft thread when event name changes</li>
          <li>refreshes draft panel after edits</li>
        </ul>
      </section>

      <section className="docs-section" id="draft-review-actions">
        <h2>Draft Review Actions</h2>
        <h3>Approve</h3>
        <p>Approval uses checkbox confirmation and publishes the current stored draft state into live workflow.</p>
        <ul>
          <li>sets draft status to <code>published</code></li>
          <li>posts link from draft thread to live event</li>
          <li>renames draft thread with an approved prefix</li>
          <li>disables draft action buttons, then locks and archives thread</li>
        </ul>
        <p>Implementation detail: approval publishes immediately, rather than holding a long-lived intermediate approved state.</p>
        <h3>Needs Revision</h3>
        <p>Requires a reason modal, sets <code>needs_revision</code>, stores review comment, posts in thread, and pings draft creator.</p>
        <h3>Reject</h3>
        <p>Requires a reason modal, sets <code>rejected</code>, stores review comment, posts in thread, pings creator, then disables actions and archives.</p>
      </section>

      <section className="docs-section" id="publish-time-drafts">
        <h2>Publish-Time Behavior for Drafts</h2>
        <p>When a draft is approved, pinging and sync are deferred until actual live publish time. Draft forums are not pinged with event role.</p>
      </section>

      <section className="docs-section" id="live-event-behavior">
        <h2>Live Event Thread Behavior</h2>
        <p>Published events become live Event V2 threads with starter post plus pinned signup panel.</p>
        <h3>Live Signup Panel</h3>
        <ul>
          <li>event summary</li>
          <li>role list including participants and squad lead display</li>
          <li><code>Sign Up for Role</code>, <code>Manage Squad Leads</code> (when enabled), <code>N/A</code>, <code>Manage Event</code></li>
        </ul>
        <p>The panel uses compact rendering to stay within component limits.</p>
      </section>

      <section className="docs-section" id="signups">
        <h2>Signups</h2>
        <h3>How Members Sign Up</h3>
        <p>Members use the <code>Sign Up for Role</code> button to select role, switch roles, remove existing signup by re-selecting current role, or mark <code>Not Available</code>.</p>
        <h3>Role Limits</h3>
        <p>If a role limit is reached, signup is rejected with an error.</p>
        <h3>Signups After Event Closure</h3>
        <p>Signup controls only function while event status is <code>open</code>. Closed/cancelled events disable any effective signup changes.</p>
      </section>

      <section className="docs-section" id="synced-events">
        <h2>Synced Events</h2>
        <p>If <code>Share with other Servers</code> is enabled and a sync network exists, the live event is mirrored to synced servers.</p>
        <h3>What Sync Copies</h3>
        <ul>
          <li>thread title</li>
          <li>starter post content</li>
          <li>roles</li>
          <li>live signup panel</li>
          <li>signups</li>
        </ul>
        <h3>Sync Ownership Rules</h3>
        <p>Only the source server can manage mirrored events (edit, close, delete). Non-owner attempts are rejected.</p>
        <h3>Synced Signup Ownership Rules</h3>
        <p>Signups are anchored to the thread where member first signed up; subsequent changes must be done from that origin thread.</p>
        <h3>Display Name Propagation</h3>
        <p>Signup display name is snapshotted from server of origin signup and reused across all mirrored panels.</p>
      </section>

      <section className="docs-section" id="squad-leads">
        <h2>Squad Leads</h2>
        <p>If squad lead mode is enabled, the panel exposes <code>Manage Squad Leads</code>.</p>
        <h3>Who Can Assign Squad Leads</h3>
        <p>Only event creator and administrators can assign/remove squad leads. Manager roles alone do not grant this permission.</p>
        <h3>Squad Lead Actions</h3>
        <ul>
          <li><code>Add Squad Lead</code></li>
          <li><code>Remove Squad Lead</code></li>
        </ul>
        <p>Assignment is only allowed while event status is <code>open</code>.</p>
      </section>

      <section className="docs-section" id="manage-event-controls">
        <h2>Manage Event Controls</h2>
        <p><code>Manage Event</code> opens ephemeral live management actions.</p>
        <ul>
          <li><code>Edit Event</code></li>
          <li><code>Close Event</code></li>
        </ul>
        <p>Live edits update event record, starter post, live panel, and mirrored synced threads when applicable.</p>
      </section>

      <section className="docs-section" id="reminders">
        <h2>Reminders</h2>
        <p>The bot runs a periodic reminder checker.</p>
        <h3>1-Hour Reminder</h3>
        <p>For live events only, reminders are sent 1 hour before start when event is still open, has valid timestamp, and has attendance role to ping.</p>
        <ul>
          <li>posted in event thread</li>
          <li>pings event attendance role</li>
          <li>sent once per event timestamp per runtime session</li>
        </ul>
        <p>Drafts do not send reminders.</p>
      </section>

      <section className="docs-section" id="ending-event">
        <h2>Ending an Event</h2>
        <table className="docs-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>Close Event</code></td><td>Primary Event V2 path: confirmation, summary, lock panel, cleanup roles/events, archive; sync mirrors close when applicable.</td></tr>
            <tr><td><code>/event-cancel</code></td><td>Legacy path: cancel without normal close summary, optional silent mode, cleanup, archive, and sync propagation.</td></tr>
            <tr><td><code>/event-delete</code></td><td>Legacy path: remove thread and records entirely, cleanup artifacts, propagate deletion to mirrors. This is still the preferred way to delete events which are malformed or created for test purposes.</td></tr>
          </tbody>
        </table>
      </section>

      <section className="docs-section" id="permissions-summary">
        <h2>Permissions Summary</h2>
        <table className="docs-table">
          <thead>
            <tr>
              <th>Area</th>
              <th>Allowed users</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Setup</td><td>Admins only</td></tr>
            <tr><td>Draft / Event creation</td><td>Controlled by <code>who_can_create</code> event-setup parameter</td></tr>
            <tr><td>Draft review</td><td>Admins and configured manager roles</td></tr>
            <tr><td>Draft editing</td><td>Admins, configured manager roles, and the draft creator</td></tr>
            <tr><td>Live event management</td><td>Admins, configured manager roles, and the live event creator</td></tr>
            <tr><td>Squad lead assignment</td><td>Admins and the live event creator only</td></tr>
          </tbody>
        </table>
      </section>

      <section className="docs-section" id="quick-reference">
        <h2>Quick Reference</h2>
        <h3>Setup Commands</h3>
        <ul>
          <li><code>/event-setup configure</code></li>
          <li><code>/event-setup view</code></li>
          <li><code>/event-setup remove</code></li>
          <li><code>/event-setup guide</code></li>
        </ul>
        <h3>Lifecycle Commands</h3>
        <ul>
          <li>guide button to create draft/event</li>
          <li><code>Manage Event</code> {'->'} <code>Edit Event</code></li>
          <li><code>Manage Event</code> {'->'} <code>Close Event</code></li>
          <li><code>/event-cancel</code></li>
          <li><code>/event-delete</code></li>
        </ul>
      </section>

    </BotDocsLayout>
  );
}