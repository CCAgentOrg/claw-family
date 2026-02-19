#!/usr/bin/env node

/**
 * Check if infographics exist and report their status
 * Usage: node check-infographics.js
 */

const fs = require('fs');
const path = require('path');

const INFOGRAPHICS = [
    'claw-stars-verified.gif',
    'claw-size-verified.gif',
    'claw-timeline-verified.gif',
    'claw-features-verified.gif'
];

const ROOT = path.resolve(__dirname, '..');

function checkFile(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return {
            exists: true,
            size: stats.size,
            modified: stats.mtime
        };
    } catch (error) {
        return {
            exists: false,
            size: 0,
            modified: null
        };
    }
}

function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function main() {
    console.log('Checking infographics...\n');

    let allExist = true;

    for (const gif of INFOGRAPHICS) {
        const filePath = path.join(ROOT, gif);
        const status = checkFile(filePath);

        if (status.exists) {
            console.log(`✓ ${gif}`);
            console.log(`  Size: ${formatSize(status.size)}`);
            console.log(`  Modified: ${status.modified.toISOString()}\n`);
        } else {
            console.log(`✗ ${gif} - NOT FOUND\n`);
            allExist = false;
        }
    }

    if (allExist) {
        console.log('All infographics are present!');
        process.exit(0);
    } else {
        console.error('Some infographics are missing!');
        process.exit(1);
    }
}

main();
