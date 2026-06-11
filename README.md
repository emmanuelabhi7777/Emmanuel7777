# Distributor Forecast App

Field sales forecast tool for DOT, KEHE, and TOPS distributors.

## Deploy to Vercel (5 minutes)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free). Skip if you already have one.

### Step 2 — Upload this project to GitHub
1. Go to https://github.com/new
2. Name it `distributor-forecast`, keep it Private, click **Create repository**
3. Click **uploading an existing file**
4. Drag the entire contents of this zip (all files and the src folder) into the upload area
5. Click **Commit changes**

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and click **Sign up with GitHub**
2. Click **Add New Project**
3. Find `distributor-forecast` and click **Import**
4. Leave all settings as default — Vercel auto-detects Vite
5. Click **Deploy**

### Step 4 — Share the URL
Vercel gives you a URL like `distributor-forecast.vercel.app`
Share that with your reps — they can bookmark it on phone or desktop.

## Default credentials
- Manager PIN: `mgr2025` (change in src/App.jsx line with MANAGER_PIN)

## Data storage
All forecast data is saved in the browser's localStorage on each device.
For a shared multi-device setup, data entered on one device won't sync to another.
To enable true multi-user sync, contact your developer to add a backend database.

## Adding new products or customers
Open `src/App.jsx` and find the `DISTRIBUTORS` array near the top.
Each distributor has a `customers` and `products` list — add entries there.
Reps can also add new customers directly from the app without touching code.
