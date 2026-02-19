#!/usr/bin/env node

/**
 * Check that all infographics exist and are valid
 */

const fs = require('fs');
const path = require('path');

// Required infographics
const requiredInfographics = [
    'claw-stars-verified.gif',
    'claw-size-verified.gif',
    'claw-timeline-verified.gif',
    'claw-features-verified.gif',
    'claw-decision-verified.gif'
];

// Root directory
const rootDir = path.join(__dirname, '..');

console.log('Checking infographics...\n');

let allPresent = true;

for (const filename of requiredInfographics) {
    const filepath = path.join(rootDir, filename);
    
    if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        const modified = stats.mtime.toISOString();
        
        console.log(`✓ ${filename}`);
        console.log(`  Size: ${sizeKB} KB`);
        console.log(`  Modified: ${modified}\n`);
    } else {
        console.log(`✗ ${filename} - MISSING\n`);
        allPresent = false;
    }
}

if (allPresent) {
    console.log('All infographics are present!');
    process.exit(0);
} else {
    console.log('Some infographics are missing. Please create them using x-gif-maker.');
    process.exit(1);
}