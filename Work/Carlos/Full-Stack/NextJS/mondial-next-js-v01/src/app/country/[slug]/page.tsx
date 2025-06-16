import { getAllCountries } from '@/lib/db';
import { type Country } from '@/lib/db';
import { notFound } from 'next/navigation';


export default async function CountryDetails({ params }: { params: { slug: string } }) {
// Country code mapping for flagcdn.com
const countryMap: Record<string, string> = {
    // Single letter codes
    'A': 'at',  // Austria
    'B': 'be',  // Belgium
    'C': 'cu',  // Cuba
    'D': 'de',  // Germany
    'E': 'es',  // Spain
    'F': 'fr',  // France
    'G': 'ga',  // Gabon
    'H': 'hu',  // Hungary
    'I': 'it',  // Italy
    'J': 'jp',  // Japan
    'K': 'kh',  // Cambodia
    'L': 'lu',  // Luxembourg
    'M': 'mt',  // Malta
    'N': 'no',  // Norway
    'P': 'pt',  // Portugal
    'Q': 'qa',  // Qatar
    'R': 'ru',  // Russia
    'S': 'se',  // Sweden
    
    // Mondial specific codes to flagcdn codes
    'AFG': 'af',   // Afghanistan
    'AG': 'ag',    // Antigua and Barbuda
    'AL': 'al',    // Albania
    'AMSA': 'as',  // American Samoa
    'AND': 'ad',   // Andorra
    'ANG': 'ao',   // Angola
    'ARM': 'am',   // Armenia
    'ARU': 'aw',   // Aruba
    'AUS': 'au',   // Australia
    'AXA': 'ai',   // Anguilla
    'AZ': 'az',    // Azerbaijan
    'BD': 'bd',    // Bangladesh
    'BDS': 'bb',   // Barbados
    'BEN': 'bj',   // Benin
    'BERM': 'bm',  // Bermuda
    'BF': 'bf',    // Burkina Faso
    'BG': 'bg',    // Bulgaria
    'BHT': 'bt',   // Bhutan
    'BI': 'bi',    // Burundi
    'BIH': 'ba',   // Bosnia and Herzegovina
    'BOL': 'bo',   // Bolivia
    'BR': 'br',    // Brazil
    'BRN': 'bh',   // Bahrain
    'BRU': 'bn',   // Brunei
    'BS': 'bs',    // Bahamas
    'BVIR': 'vg',  // British Virgin Islands
    'BY': 'by',    // Belarus
    'BZ': 'bz',    // Belize
    'CAM': 'cm',   // Cameroon
    'CAYM': 'ky',  // Cayman Islands
    'CDN': 'ca',   // Canada
    'CH': 'ch',    // Switzerland
    'CI': 'ci',    // Cote d'Ivoire
    'CL': 'lk',    // Sri Lanka
    'CO': 'co',    // Colombia
    'COCO': 'cc',  // Cocos Islands
    'COM': 'km',   // Comoros
    'COOK': 'ck',  // Cook Islands
    'CR': 'cr',    // Costa Rica
    'CV': 'cv',    // Cape Verde
    'CY': 'cy',    // Cyprus
    'CZ': 'cz',    // Czech Republic
    'DJI': 'dj',   // Djibouti
    'DK': 'dk',    // Denmark
    'DOM': 'do',   // Dominican Republic
    'DZ': 'dz',    // Algeria
    'EAK': 'ke',   // Kenya
    'EAT': 'tz',   // Tanzania
    'EAU': 'ug',   // Uganda
    'EC': 'ec',    // Ecuador
    'ER': 'er',    // Eritrea
    'ES': 'sv',    // El Salvador
    'ET': 'eg',    // Egypt
    'ETH': 'et',   // Ethiopia
    'EW': 'ee',    // Estonia
    'FALK': 'fk',  // Falkland Islands
    'FARX': 'fo',  // Faroe Islands
    'FGU': 'gf',   // French Guiana
    'FJI': 'fj',   // Fiji
    'FL': 'li',    // Liechtenstein
    'FPOL': 'pf',  // French Polynesia
    'FSM': 'fm',   // Micronesia
    'GAZA': 'ps',  // Gaza Strip (Palestine)
    'GB': 'gb',    // United Kingdom
    'GBG': 'gg',   // Guernsey
    'GBJ': 'je',   // Jersey
    'GBM': 'im',   // Isle of Man
    'GBZ': 'gi',   // Gibraltar
    'GCA': 'gt',   // Guatemala
    'GE': 'ge',    // Georgia
    'GH': 'gh',    // Ghana
    'GNB': 'gw',   // Guinea-Bissau
    'GQ': 'gq',    // Equatorial Guinea
    'GR': 'gr',    // Greece
    'GROX': 'gl',  // Greenland
    'GUAD': 'gp',  // Guadeloupe
    'GUAM': 'gu',  // Guam
    'GUY': 'gy',   // Guyana
    'HCA': 'hn',   // Honduras
    'HELX': 'sh',  // Saint Helena
    'HONX': 'hk',  // Hong Kong
    'HR': 'hr',    // Croatia
    'IL': 'il',    // Israel
    'IND': 'in',   // India
    'IR': 'ir',    // Iran
    'IRL': 'ie',   // Ireland
    'IRQ': 'iq',   // Iraq
    'IS': 'is',    // Iceland
    'JA': 'jm',    // Jamaica
    'JOR': 'jo',   // Jordan
    'KAZ': 'kz',   // Kazakhstan
    'KGZ': 'kg',   // Kyrgyzstan
    'KIR': 'ki',   // Kiribati
    'KN': 'kn',    // Saint Kitts and Nevis
    'KOS': 'xk',   // Kosovo
    'KWT': 'kw',   // Kuwait
    'LAO': 'la',   // Laos
    'LAR': 'ly',   // Libya
    'LB': 'lr',    // Liberia
    'LS': 'ls',    // Lesotho
    'LT': 'lt',    // Lithuania
    'LV': 'lv',    // Latvia
    'MA': 'ma',    // Morocco
    'MACX': 'mo',  // Macau
    'MAL': 'my',   // Malaysia
    'MART': 'mq',  // Martinique
    'MAYO': 'yt',  // Mayotte
    'MC': 'mc',    // Monaco
    'MD': 'md',    // Moldova
    'MEX': 'mx',   // Mexico
    'MH': 'mh',    // Marshall Islands
    'MK': 'mk',    // Macedonia
    'MNE': 'me',   // Montenegro
    'MNG': 'mn',   // Mongolia
    'MNTS': 'ms',  // Montserrat
    'MOC': 'mz',   // Mozambique
    'MS': 'mu',    // Mauritius
    'MV': 'mv',    // Maldives
    'MW': 'mw',    // Malawi
    'MYA': 'mm',   // Myanmar
    'NA': 'nl',    // Netherlands Antilles (now CW, SX, BQ)
    'NAM': 'na',   // Namibia
    'NAU': 'nr',   // Nauru
    'NCA': 'nc',   // New Caledonia
    'NEP': 'np',   // Nepal
    'NIC': 'ni',   // Nicaragua
    'NIUE': 'nu',  // Niue
    'NL': 'nl',    // Netherlands
    'NMIS': 'mp',  // Northern Mariana Islands
    'NOK': 'kp',   // North Korea
    'NORF': 'nf',  // Norfolk Island
    'NZ': 'nz',    // New Zealand
    'OM': 'om',    // Oman
    'PA': 'pa',    // Panama
    'PAL': 'pw',   // Palau
    'PE': 'pe',    // Peru
    'PITC': 'pn',  // Pitcairn Islands
    'PK': 'pk',    // Pakistan
    'PL': 'pl',    // Poland
    'PNG': 'pg',   // Papua New Guinea
    'PR': 'pr',    // Puerto Rico
    'PY': 'py',    // Paraguay
    'RA': 'ar',    // Argentina
    'RB': 'bw',    // Botswana
    'RC': 'tw',    // Taiwan
    'RCA': 'cf',   // Central African Republic
    'RCB': 'cg',   // Congo
    'RCH': 'cl',   // Chile
    'REUN': 're',  // Reunion
    'RG': 'gn',    // Guinea
    'RH': 'ht',    // Haiti
    'RI': 'id',    // Indonesia
    'RIM': 'mr',   // Mauritania
    'RL': 'lb',    // Lebanon
    'RM': 'mg',    // Madagascar
    'RMM': 'ml',   // Mali
    'RN': 'ne',    // Niger
    'RO': 'ro',    // Romania
    'ROK': 'kr',   // South Korea
    'ROU': 'uy',   // Uruguay
    'RP': 'ph',    // Philippines
    'RSA': 'za',   // South Africa
    'RSM': 'sm',   // San Marino
    'RT': 'tg',    // Togo
    'RWA': 'rw',   // Rwanda
    'SA': 'sa',    // Saudi Arabia
    'SD': 'sz',    // Swaziland (now Eswatini)
    'SF': 'fi',    // Finland
    'SGP': 'sg',   // Singapore
    'SK': 'sk',    // Slovakia
    'SLB': 'sb',   // Solomon Islands
    'SLO': 'si',   // Slovenia
    'SMAR': 'mf',  // Saint Martin
    'SME': 'sr',   // Suriname
    'SN': 'sn',    // Senegal
    'SP': 'so',    // Somalia
    'SPMI': 'pm',  // Saint Pierre and Miquelon
    'SRB': 'rs',   // Serbia
    'STP': 'st',   // Sao Tome and Principe
    'SUD': 'sd',   // Sudan
    'SVAX': 'sj',  // Svalbard
    'SY': 'sc',    // Seychelles
    'SYR': 'sy',   // Syria
    'TAD': 'tj',   // Tajikistan
    'THA': 'th',   // Thailand
    'TJ': 'cn',   // China (if stored as TJ instead of CN)
    'TUCA': 'tc',  // Turks and Caicos Islands
    'TUV': 'tv',  // Tuvalu
    'TO': 'to',    // Tonga
    'TL': 'tl',    // Timor-Leste
    'TT': 'tt',    // Trinidad and Tobago
    // Missing countries or territories
    'UAE': 'ae',  // United Arab Emirates
    'UAR': 'ae',   // United Arab Emirates (not in your list)
    'USA': 'us',   // United States (not in your list)
    'UZB': 'uz', // Uzbekistan (not in your list)
    'V': 've',     // Venezuela (not in your list)
    'TCH': 'td',   // Chad (not in your list)
    'TN': 'tn',    // Tunisia (not in your list)
    'TR': 'tr',    // Turkey (not in your list)
    'TM': 'tm',    // Turkmenistan (not in your list)
    'UA': 'ua',    // Ukraine (not in your list)
    'UZ': 'uz',    // Uzbekistan (not in your list)
    'VN': 'vn',    // Vietnam (not in your list)
    'VU': 'vu',    // Vanuatu (not in your list)
    'YE': 'ye',    // Yemen (not in your list)
    'YV': 've',    // Venezuela (not in your list)
    'ZM': 'zm',    // Zambia (not in your list)
    'ZW': 'zw',    // Zimbabwe (not in your list)
    'WAFU': 'wf', // Wallis and Futuna
    'WAG' : 'gm', // Gambia
    'WAL': 'sl',  // Sierra Leone
    'WAN': 'ng', // Nigeria
    'WD': 'dm', // Dominica
    'WL' : 'lc', // Saint Lucia
    'WS': 'ws',    // Samoa (Western Samoa)
    'WSA':'eh',  // Western Sahara
    'WV' : 'vc', // Saint Vincent and the Grenadines
    'VC': 'vc',    // Saint Vincent and Grenadines
    'VIRG': 'vi', // US Virgin Islands
    'XMAS': 'cx', // Christmas Island
    'Z': 'zm',     // Zambia
    'ZRE': 'cd', // Democratic Republic of the Congo (Zaire)
    'WEST': 'ps', // Palestine (West Bank)
    'WG': 'gd', // Grenada
};

    // Decode the URL parameter
    const slug = (await params).slug;
    const countryName = decodeURIComponent(slug);

    // Fetch all countries (or create a getCountryByName function for efficiency)
    const countries: Country[] = await getAllCountries();
    // Find the country object by name
    const country = countries.find(c => c.Name === countryName);

    if (!country) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-2">
{countryMap[country.Code] ? (
  <img
    src={`https://flagcdn.com/32x24/${countryMap[country.Code]}.png`}
    width="32"
    height="24"
    alt={`${country.Name} flag`}
    className="inline-block mr-2 align-middle"
  />
) : (
  <span>
    🏳️
  </span>
)}
                    {country.Name}
                    </h1>
                    <p className="text-emerald-400 text-xl">[{country.Code}]</p>
                </div>
                
                {/* Country Card */}
                <div className="max-w-2xl mx-auto bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Key Facts */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2">Key Facts</h2>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <span className="text-gray-400 w-24">Capital:</span>
                                        <span className="text-white font-medium">{country.Capital || 'N/A'}</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <span className="text-gray-400 w-24">Population:</span>
                                        <span className="text-white font-medium">{country.Population?.toLocaleString() || 'N/A'}</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <span className="text-gray-400 w-24">Area:</span>
                                        <span className="text-white font-medium">{country.Area?.toLocaleString() || 'N/A'} km²</span>
                                    </div>
                                    
                                    {country.Province && (
                                        <div className="flex items-center">
                                            <span className="text-gray-400 w-24">Province:</span>
                                            <span className="text-white font-medium">{country.Province}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Additional Content (placeholder) */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2">Geography</h2>
                                <p className="text-gray-300">
                                    More details about {country.Name} could be displayed here, such as 
                                    languages spoken, currency, or neighboring countries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Back Button */}
                <div className="text-center mt-8">
                    <a href="/country" className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors">
                        ← Back to Countries
                    </a>
                </div>
            </div>
        </div>
    );
}
/*export default function CountryDetails({ params }: { params: { slug: string } }) {
    // Decode the URL parameter
    const countryName = decodeURIComponent(params.slug);

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
        <h1>Welcome in {countryName}!</h1>
            <p className="text-sm">Population: {countryName.Population}</p>
            <p className="text-sm">Area: {countryName.Area} km²</p>
            <p className="text-sm">Capital: {countryName.Capital}</p>
        </div>
    );
}*/