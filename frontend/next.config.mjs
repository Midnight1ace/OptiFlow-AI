import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnv({ path: path.resolve(__dirname, "../.env"), quiet: true });

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
