const fs = require('fs');
// 1. Add Navigation to layout.tsx
let layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
if (!layoutContent.includes('Navigation')) {
    layoutContent = layoutContent.replace(
        'import { GlobalProvider } from "../../global-context";',
        'import { GlobalProvider } from "../../global-context";\nimport Navigation from "../components/navigation";\nimport Footer from "../components/footer";'
    );
    layoutContent = layoutContent.replace(
        '{children}',
        '<Navigation />\n          {children}\n          <Footer />'
    );
    fs.writeFileSync('src/app/layout.tsx', layoutContent);
}

// 2. Remove Navigation and Footer from bet.tsx
let betContent = fs.readFileSync('src/views/bet.tsx', 'utf8');
betContent = betContent.replace(/import Navigation.*\n/, '');
betContent = betContent.replace(/import Footer.*\n/, '');
betContent = betContent.replace(/<Navigation \/>/, '');
betContent = betContent.replace(/<Footer \/>/, '');
// Fix the overflow by changing the container class
betContent = betContent.replace('className="homepage-container1"', 'className="bet-now-container1"');
fs.writeFileSync('src/views/bet.tsx', betContent);

// 3. Remove Navigation and Footer from homepage.tsx
let homeContent = fs.readFileSync('src/views/homepage.tsx', 'utf8');
homeContent = homeContent.replace(/import Navigation.*\n/, '');
homeContent = homeContent.replace(/import Footer.*\n/, '');
homeContent = homeContent.replace(/<Navigation><\/Navigation>/, '');
homeContent = homeContent.replace(/<Footer><\/Footer>/, '');
fs.writeFileSync('src/views/homepage.tsx', homeContent);

// 4. Remove Navigation and Footer from terms-conditions.tsx (just in case)
let termsContent = fs.readFileSync('src/views/terms-conditions.tsx', 'utf8');
termsContent = termsContent.replace(/import Navigation.*\n/, '');
termsContent = termsContent.replace(/import Footer.*\n/, '');
termsContent = termsContent.replace(/<Navigation><\/Navigation>/, '');
termsContent = termsContent.replace(/<Footer><\/Footer>/, '');
fs.writeFileSync('src/views/terms-conditions.tsx', termsContent);

console.log('Layout updated.');
