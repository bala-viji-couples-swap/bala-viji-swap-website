# New GitHub repo + AWS Amplify (no secrets in chat)

This agent environment currently has:

- **Git** local repo only  
- **No** `gh auth login`  
- **No** AWS credentials configured  

So the agent **cannot** create a GitHub repo or link Amplify for you until **you** authenticate. Do **not** paste access keys into chat.

Recommended subdomain: **`viji.fuckmywife.top`**

---

## Part 1 — New GitHub repository (you)

### Option A — GitHub website

1. github.com → **New repository**  
2. Name e.g. `viji-fuckmywife` (private recommended)  
3. **Do not** add README if you will push existing project  
4. Create  

### Option B — GitHub CLI (on your machine)

```bash
gh auth login
cd /path/to/bala-viji-swap-website
gh repo create bala-viji-couples-swap/viji-fuckmywife --private --source=. --remote=amplify-origin
# or new org/user as you prefer
```

### Push this project to the new repo

```bash
cd /path/to/bala-viji-swap-website

# Add new remote (keep old origin if you want)
git remote add amplify-origin https://github.com/YOUR_USER/viji-fuckmywife.git

git add -A
git status   # never commit .env or AWS keys
git commit -m "Prepare Amplify static deploy (amplify.yml + dist build)"
git push -u amplify-origin main
```

**Never commit:** AWS keys, Cloudflare tokens, `.env`.

---

## Part 2 — Link Amplify to that repo (you, AWS Console)

1. [AWS Amplify Console](https://console.aws.amazon.com/amplify/) · region e.g. **ap-south-1**  
2. **Create new app** → **Host web app**  
3. **GitHub** → authorize Amplify (OAuth — no long-lived keys in chat)  
4. Select repo `viji-fuckmywife` · branch `main`  
5. Build settings: Amplify should detect **`amplify.yml`** in repo root  
   - Build: `bash cloudflare-build.sh` (via amplify.yml)  
   - Artifact: **`dist`**  
6. Save and deploy  

Wait until status is **Deployed**.

---

## Part 3 — Subdomain `viji.fuckmywife.top`

### In Amplify

1. App → **Hosting** → **Custom domains** → **Add domain**  
2. Domain: `fuckmywife.top`  
3. Subdomain: **`viji`** → connects to the app  
4. Amplify shows **CNAME** target (e.g. `xxxx.cloudfront.net` or Amplify domain)

### In Cloudflare DNS (for fuckmywife.top)

1. DNS → **Add record**  
2. Type: **CNAME**  
3. Name: **`viji`**  
4. Target: value Amplify gave you  
5. Proxy: often **DNS only (grey cloud)** for Amplify SSL (if cert fails, turn proxy off)  
6. Wait for Amplify SSL to become **Available**

Site: **https://viji.fuckmywife.top**

---

## Part 4 — After deploy checklist

- [ ] https://viji.fuckmywife.top opens  
- [ ] Age gate works  
- [ ] Video from S3 still plays (add CORS origin `https://viji.fuckmywife.top` on the bucket)  
- [ ] `/tv/` still unlisted (type URL manually)  
- [ ] No secrets in GitHub  

### S3 CORS example (add your domain)

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": [
      "https://viji.fuckmywife.top",
      "http://localhost:8080"
    ],
    "ExposeHeaders": ["ETag", "Content-Length", "Content-Type"],
    "MaxAgeSeconds": 3000
  }
]
```

---

## Give the agent GitHub access later (optional)

On the machine where the agent runs:

```bash
gh auth login
# follow browser/device flow
```

Then you can ask: *“create repo X and push”* — still **never** paste AWS secret keys; Amplify stays console OAuth.

---

## React conversion

Separate step. Current `amplify.yml` deploys **static HTML** via `dist/`.  
After Vite React conversion, build command becomes `npm ci && npm run build` and `baseDirectory: dist`.
