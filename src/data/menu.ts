// What Kesariya serves, grouped by the katori (bowl) each choice fills on the thali.
// Dish names and descriptions come from the original site's copy.
// Gujarati and Hindi text is a draft that still needs native-speaker review.

export type Lang = 'en' | 'gu' | 'hi';
type T = Record<Lang, string>;

export type KatoriId =
  | 'sabzi' | 'dal' | 'chaat' | 'global' | 'mithai' | 'drinks' | 'decor' | 'rice' | 'roti';

export interface MenuItem {
  id: string;
  katori: KatoriId;
  name: T;
  desc: T;
  live?: boolean;
}

export interface MenuGroup {
  id: 'main' | 'chaat' | 'global' | 'mithai' | 'drinks' | 'decor';
  title: T;
  note: T;
  single?: boolean;
  items: MenuItem[];
}

export const MENU: MenuGroup[] = [
  {
    id: 'main',
    title: { en: 'Royal main course', gu: 'શાહી મુખ્ય ભોજન', hi: 'शाही मुख्य भोजन' },
    note: {
      en: 'Cooked in pure desi ghee.',
      gu: 'શુદ્ધ દેશી ઘીમાં બનાવેલું.',
      hi: 'शुद्ध देसी घी में बना।',
    },
    items: [
      {
        id: 'paneer', katori: 'sabzi',
        name: { en: 'Kesariya Shahi Paneer', gu: 'કેસરિયા શાહી પનીર', hi: 'केसरिया शाही पनीर' },
        desc: {
          en: 'Malai paneer in a saffron, cashew and cardamom gravy.',
          gu: 'કેસર, કાજુ અને એલચીની ગ્રેવીમાં મલાઈ પનીર.',
          hi: 'केसर, काजू और इलायची की ग्रेवी में मलाई पनीर।',
        },
      },
      {
        id: 'dal', katori: 'dal',
        name: { en: 'Dal Dum Pukht', gu: 'દાલ દમ પુખ્ત', hi: 'दाल दम पुख़्त' },
        desc: {
          en: 'Black lentils slow-cooked overnight in a clay pot with white butter.',
          gu: 'માટીના વાસણમાં આખી રાત ધીમા તાપે સફેદ માખણ સાથે રાંધેલી કાળી દાળ.',
          hi: 'मिट्टी के बर्तन में रात भर धीमी आँच पर सफ़ेद मक्खन के साथ पकी काली दाल।',
        },
      },
      {
        id: 'biryani', katori: 'rice',
        name: { en: 'Zafrani Subz Biryani', gu: 'ઝાફરાની સબ્ઝ બિરયાની', hi: 'ज़ाफ़रानी सब्ज़ बिरयानी' },
        desc: {
          en: 'Saffron basmati layered with garden vegetables, sealed in a handi.',
          gu: 'શાકભાજી સાથે કેસરી બાસમતી, હાંડીમાં દમ પર.',
          hi: 'सब्ज़ियों के साथ केसरी बासमती, हांडी में दम पर।',
        },
      },
      {
        id: 'roti', katori: 'roti',
        name: { en: 'Desi ghee tandoori roti', gu: 'દેશી ઘી તંદૂરી રોટી', hi: 'देसी घी तंदूरी रोटी' },
        desc: {
          en: 'Fresh from the tandoor, brushed with ghee.',
          gu: 'તંદૂરમાંથી ગરમાગરમ, ઘી લગાવેલી.',
          hi: 'तंदूर से गरमागरम, घी लगी।',
        },
      },
    ],
  },
  {
    id: 'chaat',
    title: { en: 'Live chaat counter', gu: 'લાઇવ ચાટ કાઉન્ટર', hi: 'लाइव चाट काउंटर' },
    note: {
      en: 'Made in front of your guests.',
      gu: 'મહેમાનોની સામે જ બનાવાય છે.',
      hi: 'मेहमानों के सामने ही बनता है।',
    },
    items: [
      {
        id: 'panipuri', katori: 'chaat', live: true,
        name: { en: '6-flavour pani puri', gu: '૬ સ્વાદની પાણીપુરી', hi: '6 स्वाद की पानी पूरी' },
        desc: {
          en: 'Hing jeera, kesar pudina, khajur, guava chilli, raw mango and lemon waters.',
          gu: 'હિંગ જીરું, કેસર ફુદીનો, ખજૂર, જામફળ મરચું, કાચી કેરી અને લીંબુનું પાણી.',
          hi: 'हींग जीरा, केसर पुदीना, खजूर, अमरूद मिर्च, कच्चा आम और नींबू का पानी।',
        },
      },
      {
        id: 'tamatar', katori: 'chaat', live: true,
        name: { en: 'Banarasi tamatar chaat', gu: 'બનારસી ટમેટા ચાટ', hi: 'बनारसी टमाटर चाट' },
        desc: {
          en: 'Spiced tomato, cooked live on a cast-iron tawa.',
          gu: 'મસાલેદાર ટમેટા, લોખંડના તવા પર લાઇવ.',
          hi: 'मसालेदार टमाटर, लोहे के तवे पर लाइव।',
        },
      },
      {
        id: 'palak', katori: 'chaat', live: true,
        name: { en: 'Palak patta chaat', gu: 'પાલક પત્તા ચાટ', hi: 'पालक पत्ता चाट' },
        desc: {
          en: 'Crisp spinach leaves, sweet yogurt and tamarind.',
          gu: 'કરકરી પાલક, મીઠું દહીં અને આમલી.',
          hi: 'कुरकुरा पालक, मीठा दही और इमली।',
        },
      },
      {
        id: 'sevkhamani', katori: 'chaat',
        name: { en: 'Sev khamani', gu: 'સેવ ખમણી', hi: 'सेव खमणी' },
        desc: {
          en: 'The Surati favourite.',
          gu: 'સુરતીઓની મનપસંદ.',
          hi: 'सूरत की पसंदीदा।',
        },
      },
    ],
  },
  {
    id: 'global',
    title: { en: 'Global veg counter', gu: 'ગ્લોબલ વેજ કાઉન્ટર', hi: 'ग्लोबल वेज काउंटर' },
    note: {
      en: 'Loved by children and young guests.',
      gu: 'બાળકો અને યુવા મહેમાનોને ગમે.',
      hi: 'बच्चों और युवा मेहमानों को पसंद।',
    },
    items: [
      {
        id: 'pizza', katori: 'global', live: true,
        name: { en: 'Woodfired pizza', gu: 'વુડફાયર પિઝા', hi: 'वुडफ़ायर पिज़्ज़ा' },
        desc: {
          en: 'From a portable wood-fired oven at the venue.',
          gu: 'સ્થળ પર પોર્ટેબલ લાકડાના ઓવનમાંથી.',
          hi: 'जगह पर ही पोर्टेबल लकड़ी के ओवन से।',
        },
      },
      {
        id: 'dimsum', katori: 'global',
        name: { en: 'Dim sums and baos', gu: 'ડિમ સમ અને બાઓ', hi: 'डिम सम और बाओ' },
        desc: {
          en: 'Steamed vegetable dumplings and soft bao buns.',
          gu: 'બાફેલા શાકભાજીના ડમ્પલિંગ અને નરમ બાઓ.',
          hi: 'भाप में पके सब्ज़ी डम्पलिंग और नरम बाओ।',
        },
      },
      {
        id: 'taco', katori: 'global',
        name: { en: 'Mexican taco boats', gu: 'મેક્સિકન ટાકો બોટ', hi: 'मैक्सिकन टैको बोट' },
        desc: { en: 'Crisp shells, beans, salsa.', gu: 'કરકરા શેલ, રાજમા, સાલસા.', hi: 'कुरकुरे शेल, राजमा, साल्सा।' },
      },
      {
        id: 'noodles', katori: 'global', live: true,
        name: { en: 'Wok noodles', gu: 'વોક નૂડલ્સ', hi: 'वोक नूडल्स' },
        desc: { en: 'Tossed live in the wok.', gu: 'કડાઈમાં લાઇવ.', hi: 'कड़ाही में लाइव।' },
      },
    ],
  },
  {
    id: 'mithai',
    title: { en: 'Mithai', gu: 'મીઠાઈ', hi: 'मिठाई' },
    note: { en: 'The sweet finish.', gu: 'મીઠો અંત.', hi: 'मीठा अंत।' },
    items: [
      {
        id: 'jalebi', katori: 'mithai', live: true,
        name: { en: 'Live jalebi with rabdi', gu: 'લાઇવ જલેબી અને રબડી', hi: 'लाइव जलेबी और रबड़ी' },
        desc: {
          en: 'Saffron jalebi fried live in desi ghee, over thick rabdi.',
          gu: 'દેશી ઘીમાં લાઇવ તળેલી કેસરી જલેબી, ઘટ્ટ રબડી સાથે.',
          hi: 'देसी घी में लाइव तली केसरी जलेबी, गाढ़ी रबड़ी के साथ।',
        },
      },
      {
        id: 'rasmalai', katori: 'mithai',
        name: { en: 'Angoori rasmalai', gu: 'અંગૂરી રસમલાઈ', hi: 'अंगूरी रसमलाई' },
        desc: {
          en: 'Small chenna dumplings in chilled saffron milk with pistachio.',
          gu: 'ઠંડા કેસરિયા દૂધમાં નાની રસમલાઈ, પિસ્તા સાથે.',
          hi: 'ठंडे केसरिया दूध में छोटी रसमलाई, पिस्ता के साथ।',
        },
      },
    ],
  },
  {
    id: 'drinks',
    title: { en: 'Drinks bar (zero alcohol)', gu: 'પીણાં (આલ્કોહોલ વગર)', hi: 'पेय (बिना अल्कोहल)' },
    note: {
      en: 'Soft drinks, sharbat, mocktails and coffee only.',
      gu: 'ફક્ત સોફ્ટ ડ્રિંક્સ, શરબત, મોકટેલ અને કોફી.',
      hi: 'सिर्फ़ सॉफ़्ट ड्रिंक्स, शरबत, मॉकटेल और कॉफ़ी।',
    },
    items: [
      {
        id: 'sharbat', katori: 'drinks',
        name: { en: 'Kesariya badam sharbat', gu: 'કેસરિયા બદામ શરબત', hi: 'केसरिया बादाम शरबत' },
        desc: {
          en: 'Almond milk with saffron, pistachio and rose petals.',
          gu: 'કેસર, પિસ્તા અને ગુલાબની પાંખડી સાથે બદામ દૂધ.',
          hi: 'केसर, पिस्ता और गुलाब की पंखुड़ियों के साथ बादाम दूध।',
        },
      },
      {
        id: 'spritz', katori: 'drinks',
        name: { en: 'Rosemary passionfruit fizz', gu: 'રોઝમેરી પેશનફ્રૂટ ફિઝ', hi: 'रोज़मेरी पैशनफ़्रूट फ़िज़' },
        desc: {
          en: 'Passionfruit, soda, lime and a smoked rosemary sprig.',
          gu: 'પેશનફ્રૂટ, સોડા, લીંબુ અને રોઝમેરી.',
          hi: 'पैशनफ़्रूट, सोडा, नींबू और रोज़मेरी।',
        },
      },
      {
        id: 'mango', katori: 'drinks',
        name: { en: 'Alphonso mango cooler', gu: 'હાફૂસ કેરી કૂલર', hi: 'अल्फ़ांसो आम कूलर' },
        desc: {
          en: 'Alphonso pulp with tender coconut water and mint.',
          gu: 'હાફૂસનો રસ, નાળિયેર પાણી અને ફુદીનો.',
          hi: 'अल्फ़ांसो का रस, नारियल पानी और पुदीना।',
        },
      },
      {
        id: 'coffee', katori: 'drinks',
        name: { en: 'Barista coffee bar', gu: 'બરિસ્તા કોફી બાર', hi: 'बरिस्ता कॉफ़ी बार' },
        desc: { en: 'Fresh coffee, made to order.', gu: 'ઓર્ડર મુજબ તાજી કોફી.', hi: 'ऑर्डर पर ताज़ा कॉफ़ी।' },
      },
    ],
  },
  {
    id: 'decor',
    single: true,
    title: { en: 'Décor theme', gu: 'ડેકોરેશન થીમ', hi: 'सजावट थीम' },
    note: {
      en: 'Built by the same team that cooks.',
      gu: 'રસોઈ કરતી એ જ ટીમ સજાવે છે.',
      hi: 'खाना बनाने वाली वही टीम सजाती है।',
    },
    items: [
      {
        id: 'rajwada', katori: 'decor',
        name: { en: 'Royal Rajwada', gu: 'રોયલ રાજવાડા', hi: 'रॉयल राजवाड़ा' },
        desc: {
          en: 'Marigold and lotus canopies, brass urns, warm chandeliers.',
          gu: 'ગલગોટા અને કમળના માંડવા, પિત્તળના કળશ, ઝુમ્મર.',
          hi: 'गेंदे और कमल के मंडप, पीतल के कलश, झूमर।',
        },
      },
      {
        id: 'garden', katori: 'decor',
        name: { en: 'Enchanted garden', gu: 'ફૂલોનો બગીચો', hi: 'फूलों का बग़ीचा' },
        desc: {
          en: 'Orchids, baby’s breath arches, fairy lights.',
          gu: 'ઓર્કિડ, ફૂલોની કમાનો, ફેરી લાઇટ્સ.',
          hi: 'ऑर्किड, फूलों के मेहराब, फ़ेयरी लाइट्स।',
        },
      },
      {
        id: 'birthday', katori: 'decor',
        name: { en: 'Birthday pastels', gu: 'બર્થડે પેસ્ટલ', hi: 'बर्थडे पेस्टल' },
        desc: {
          en: 'Balloon garlands, neon-sign photo booth, candy bar.',
          gu: 'ફુગ્ગાની માળા, નિયોન ફોટો બૂથ, કેન્ડી બાર.',
          hi: 'गुब्बारों की माला, नियॉन फ़ोटो बूथ, कैंडी बार।',
        },
      },
      {
        id: 'candlelight', katori: 'decor',
        name: { en: 'Candlelight dinner', gu: 'કેન્ડલલાઇટ ડિનર', hi: 'कैंडललाइट डिनर' },
        desc: {
          en: 'Amber votives, fine china, printed menu scrolls.',
          gu: 'મીણબત્તીઓ, સુંદર ક્રોકરી, છાપેલા મેનુ.',
          hi: 'मोमबत्तियाँ, सुंदर क्रॉकरी, छपे मेन्यू।',
        },
      },
    ],
  },
];

export const ALL_ITEMS = MENU.flatMap((g) => g.items.map((i) => ({ ...i, group: g.id })));
export const ITEM_IDS = new Set(ALL_ITEMS.map((i) => i.id));
export const itemName = (id: string, lang: Lang = 'en') =>
  ALL_ITEMS.find((i) => i.id === id)?.name[lang] ?? id;
