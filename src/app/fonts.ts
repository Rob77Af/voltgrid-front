import { 
    Rajdhani, 
    Inter, 
    Space_Grotesk, 
    JetBrains_Mono, 
    Titillium_Web, 
    Montserrat, 
    IBM_Plex_Sans 
} from 'next/font/google';

export const fontRajdhani = Rajdhani({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-rajdhani' });
export const fontInter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const fontSpaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
export const fontJetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });
export const fontTitillium = Titillium_Web({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-titillium' });
export const fontMontserrat = Montserrat({ weight: ['400', '600', '700', '900'], subsets: ['latin'], variable: '--font-montserrat' });
export const fontIBMPlexSans = IBM_Plex_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-ibm' });

export const allFonts = [
    fontRajdhani,
    fontInter,
    fontSpaceGrotesk,
    fontJetBrainsMono,
    fontTitillium,
    fontMontserrat,
    fontIBMPlexSans
];

export const allFontVariables = allFonts.map(f => f.variable).join(' ');
