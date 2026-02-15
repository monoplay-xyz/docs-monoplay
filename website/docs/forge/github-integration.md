---
sidebar_position: 5
title: GitHub Integration
---

# GitHub Integration

MonoPlay Forge integrates directly with GitHub, allowing you to push your game's source code to a repository with full version control. Every iteration becomes a commit, giving you complete history of your game's development.

## Why Use GitHub Integration?

### Version Control
Every time you iterate on your game in Forge, a new commit is created in your repository. This gives you:
- Full history of all changes
- Ability to roll back to any previous version
- Diff views to see exactly what changed

### Collaboration
Once your code is on GitHub, you can:
- Invite collaborators to contribute
- Create branches for experimental features
- Use pull requests for code review
- Share your game with the open-source community

### Local Development
Clone your repository and continue development locally:
- Use your preferred code editor (VS Code, RustRover, etc.)
- Run the game natively for better performance
- Install custom dependencies and tools
- Debug with breakpoints and profiling

### Continuous Integration
Set up GitHub Actions to:
- Automatically build your game on every commit
- Run tests and linting
- Deploy to platforms (Steam, Itch.io, etc.)
- Generate release builds

### Portfolio
Your GitHub repository serves as:
- A portfolio piece showing your work
- Documentation of your development process
- A learning resource for other developers
- Proof of authorship and intellectual property

## Connecting Your GitHub Account

### Initial Setup

1. Go to your Forge dashboard at [forge.monoplay.xyz](https://forge.monoplay.xyz)
2. Click your profile icon in the top-right corner
3. Select **"Settings"** from the dropdown
4. Navigate to the **"Integrations"** tab
5. Click **"Connect GitHub"**
6. You'll be redirected to GitHub's authorization page
7. Review the requested permissions and click **"Authorize MonoPlay"**
8. You'll be redirected back to Forge with a success message

### What Permissions Does Forge Need?

Forge requests the following GitHub OAuth scopes:

- **`repo`** — Create repositories and commit code
- **`user:email`** — Access your email address for commit attribution
- **`read:user`** — Read your public profile information

Forge **cannot** and **will not**:
- Access private repositories you don't explicitly share
- Delete repositories or branches
- Modify repository settings without your action
- Share your code with third parties

You can revoke Forge's access at any time from your [GitHub Settings → Applications](https://github.com/settings/applications).

## Pushing Your Game to GitHub

### Creating a New Repository

Once GitHub is connected, you can push any Forge project to a new repository:

1. Open your game project in Forge
2. Click the **"GitHub"** button in the top toolbar
3. Click **"Push to New Repository"**
4. Fill out the repository details:
 - **Repository name** — e.g., `my-platformer-game`
 - **Description** — Brief explanation of your game
 - **Visibility** — Public (anyone can see) or Private (only you and collaborators)
5. Click **"Create and Push"**

Forge will create the repository and push your current game code with the commit message: `"Initial commit from MonoPlay Forge"`

### Pushing to an Existing Repository

If you've already created a repository manually or want to push to a specific repo:

1. Open your game project in Forge
2. Click **"GitHub"** → **"Push to Existing Repository"**
3. Select the repository from the dropdown
4. Choose a branch (usually `main` or `master`)
5. Click **"Push"**

**Note:** Forge will not overwrite existing code. If the repository already has commits, Forge creates a new branch named `forge-import-[timestamp]` to avoid conflicts.

## How Commits Work

### Automatic Commits on Iteration

Every time you iterate on your game in Forge, a commit is automatically created with:

- **Commit message** — A summary of your iteration prompt
- **Changed files** — Only files modified by the AI
- **Author** — Your GitHub account
- **Timestamp** — When the iteration completed

Example commit messages:
```
Add double jump mechanic
Increase enemy spawn rate by 25%
Fix collision detection on moving platforms
Add health bar UI with smooth color transition
```

### Viewing Commit History

You can view your commit history in three places:

1. **Forge UI** — Click "GitHub" → "View Commits" to see iterations
2. **GitHub Web** — Visit your repository and navigate to the "Commits" page
3. **Locally** — Run `git log` in your cloned repository

### Customizing Commit Messages

By default, Forge uses your iteration prompt as the commit message. To customize:

1. After generating an iteration, click **"Customize Commit"** before pushing
2. Edit the commit message
3. Optionally add a longer description
4. Click **"Commit and Push"**

## Working Locally After Export

### Cloning Your Repository

Once your game is on GitHub, clone it to your local machine:

```bash
git clone https://github.com/your-username/your-game.git
cd your-game
```

### Building Locally

Your game is a standard Rust/Bevy project. Build and run it with Cargo:

```bash
# Install Rust if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Build and run your game
cargo run --release
```

**Native builds are significantly faster** than the WebAssembly version in the browser.

### Project Structure

Your repository includes:

```
your-game/
├── Cargo.toml # Rust project configuration
├── Cargo.lock # Dependency lockfile
├── README.md # Generated documentation
├── .gitignore # Files to exclude from version control
├── src/
│ ├── main.rs # Game entry point
│ ├── components/ # Entity component definitions
│ ├── systems/ # Game logic (movement, combat, etc.)
│ ├── resources/ # Shared game state
│ └── ui/ # User interface code
├── assets/
│ ├── textures/ # Sprites and images
│ ├── fonts/ # Text rendering fonts
│ ├── audio/ # Sound effects and music
│ └── config/ # Game configuration files
└── tests/ # Automated tests
```

### Editing Code Manually

You can modify any file locally:

```bash
# Open in VS Code
code .

# Or use any editor
vim src/systems/player_movement.rs
```

After editing, test your changes:

```bash
cargo run
```

If everything works, commit and push:

```bash
git add .
git commit -m "Adjust jump physics for better feel"
git push origin main
```

### Continuing to Use Forge

Even after editing locally, you can continue using Forge:

1. Push your local changes to GitHub
2. Open your project in Forge
3. Click **"Sync from GitHub"** to pull your changes
4. Continue iterating with prompts

Forge respects your manual edits and builds on top of them.

**Note:** If you've made extensive manual changes, Forge's AI might not understand your custom code. Consider describing your changes in comments to help the AI.

## Collaboration Workflows

### Inviting Collaborators

1. Go to your GitHub repository
2. Click **"Settings"** → **"Collaborators"**
3. Click **"Add people"** and enter their GitHub username
4. They'll receive an invitation email

Collaborators can:
- Clone the repository
- Create branches and make commits
- Open pull requests
- Use Forge to iterate (if they have a Forge account)

### Branching Strategy

For team projects, use branches to organize work:

- **`main`** — Stable, working version
- **`dev`** — Active development and Forge iterations
- **`feature/new-mechanic`** — Experimental features
- **`fix/collision-bug`** — Bug fixes

Merge branches with pull requests for code review.

### Merge Conflicts

If multiple people edit the same file, you might encounter merge conflicts. Resolve them manually:

```bash
# Pull latest changes
git pull origin main

# If there's a conflict, Git will notify you
# Edit the conflicted files and choose which changes to keep
# Then commit the resolution
git add .
git commit -m "Resolve merge conflict in player movement"
git push origin main
```

## Forge-Generated README

Every repository pushed from Forge includes a comprehensive README with:

- **Project description** — Based on your game concept
- **Build instructions** — How to compile and run locally
- **Gameplay overview** — What your game is about
- **Controls** — Input mappings
- **Credits** — Attribution to MonoPlay Forge and dependencies
- **License** — MIT license by default

You can edit the README to add:
- Screenshots and gameplay GIFs
- Contribution guidelines
- Roadmap and planned features
- Links to your social media and portfolio

## Repository Visibility

### Public Repositories

**Pros:**
- Build a portfolio visible to employers and community
- Receive contributions from other developers
- Participate in open-source ecosystem

**Cons:**
- Anyone can see and clone your code
- Competitors can copy your ideas

**Best for:** Portfolio projects, learning games, community-driven projects

### Private Repositories

**Pros:**
- Keep your code confidential
- Control who has access
- Protect commercial projects

**Cons:**
- No portfolio visibility
- Can't receive external contributions

**Best for:** Commercial games, prototypes, client work

You can change visibility at any time in your repository's settings.

## Disconnecting GitHub

To disconnect your GitHub account from Forge:

1. Go to Forge Settings → Integrations
2. Click **"Disconnect GitHub"**
3. Confirm the action

**This does not delete your repositories.** It only removes Forge's ability to push new commits. Your existing repositories and code remain intact on GitHub.

## Common Questions

### Can I push the same game to multiple repositories?

No. Each Forge project can only be linked to one GitHub repository. However, you can manually fork or duplicate the repository on GitHub.

### What happens if I delete the GitHub repository?

Deleting the repository on GitHub doesn't delete your Forge project. You can push to a new repository at any time.

### Can I push to GitHub without a Forge subscription?

Yes. GitHub integration is available on all plans, including the free tier.

### Does Forge support GitLab or Bitbucket?

Not currently. GitHub is the only supported platform. If you need GitLab/Bitbucket, you can manually push your code after downloading it from Forge.

### Can I use GitHub Desktop or other Git tools?

Absolutely. Once your code is on GitHub, use any Git client you prefer (GitHub Desktop, SourceTree, command-line `git`, etc.).

### How do I keep my local changes and Forge changes in sync?

Always pull from GitHub before making local changes, and push local changes before iterating in Forge. Use the "Sync from GitHub" button in Forge to pull your latest commits.

## Best Practices

### Commit Frequently
Don't make 10 iterations in Forge without pushing. Frequent commits make it easier to identify when bugs were introduced.

### Write Descriptive Prompts
Your iteration prompts become commit messages. Be specific so your commit history is meaningful.

### Use Branches for Experiments
Before trying a risky change, create a branch. If it doesn't work, you can discard the branch without affecting `main`.

### Tag Releases
When you reach a milestone, tag the commit:

```bash
git tag -a v0.1.0 -m "First playable demo"
git push origin v0.1.0
```

This makes it easy to reference specific versions later.

### Add a LICENSE File
If your repository is public, add a license (MIT, GPL, Apache, etc.) to clarify how others can use your code.

### Keep Secrets Out of Git
Never commit API keys, passwords, or sensitive data. Use environment variables and add `.env` to `.gitignore`.

## Next Steps

Now that you understand GitHub integration:

- Learn how to [publish your game](./publishing.md) to the MonoPlay store
- Explore [updating published games](./updating-games.md) with new versions
- Review [plan options](./plans.md) if you need more generations per month

For more on Git workflows and best practices, see GitHub's official [Git Handbook](https://guides.github.com/introduction/git-handbook/).
