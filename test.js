import { profanity } from "@2toad/profanity";
import { createRequire } from "module";
import ConfigClient from "./ConfigClient.js";
import Bot from "./Bot.js";

const config = new ConfigClient();
const fala = new Bot({});

const require = createRequire(import.meta.url);
const badwords = require("./badwords.json");

fala.profanity.addWords(badwords);

console.log(
	fala.profanity.censor(`abcdiet
  affanculo
  anabootcampdiet
  bagasce
  bagascia
  bagascione
  baldracca
  baldraccacce
  baldraccaccia
  baldracche
  baldraccona
  baldraccone
  bariledimerda
  bastardacce
  bastardacci
  bastardaccia
  bastardaccio
  bastardamadonna
  bastarde
  bastardi
  bastardo
  bastardona
  bastardone
  bastardoni
  battona
  battone
  bbwpit
  bocchinara
  bocchinare
  bocchinari
  bocchinaro
  budellodidio
  bustadipiscio
  cacaminchia
  cacare
  cacasotto
  cagacazzo
  cagaminchia
  cagare
  cagasotto
  canacciodidio
  canagliadidio
  caned'allah
  caned'eva
  canedidio
  cazzacci
  cazzaccio
  cazzata
  cazzate
  cazzetti
  cazzetto
  cazzi
  cazzissimo
  cazzo
  cazzona
  cazzone
  cazzoni
  cazzuta
  cazzute
  cazzuti
  cazzutissimo
  cazzuto
  cesso
  checca
  checche
  chiavare
  chiavata
  chiavate
  chiavatona
  chiavatone
  ciucciamelo
  ciucciapalle
  cogliona
  coglionaggine
  coglionare
  coglionata
  coglionate
  coglionatore
  coglionatrice
  coglionatura
  coglionature
  coglionazzi
  coglionazzo
  coglioncelli
  coglioncello
  coglioncini
  coglioncino
  coglione
  coglioneria
  coglionerie
  coglioni
  coprofago
  coprofilo
  cornutoilpapa
  credoana
  cretinetti
  cristod'undio
  cristodecapitato
  cristoincroce
  culattone
  culattoni
  culi
  culo
  culona
  culone
  deficiente
  dietaabc
  dietaana
  dietaanabootcamp
  dietabootcamp
  dietadell'abc
  diobastardo
  diobestia
  diobestiazza
  dioboia
  diocan
  diocane
  diocannaiolo
  diocapra
  diocoglione
  diocomunista
  diocrasto
  diocristo
  dioculattone
  diofarabutto
  diofascista
  diofinocchio
  dioflagellato
  dioimpestato
  dioimpiccato
  dioladro
  diolebbroso
  diolobotomizzato
  diolurido
  diomaiale
  diomaledetto
  diomerda
  diominchione
  dionegro
  dioporco
  diopoveraccio
  diopovero
  diorotto
  diorottoinculo
  diorutto
  diosbudellato
  dioschifoso
  dioseppellito
  dioserpente
  diostracane
  diostramerda
  diostronzo
  diosventrato
  dioverme
  facciadaculo
  facciadimerda
  fanculo
  fica
  ficata
  ficate
  fichetta
  fichette
  fichetti
  fichetto
  ficona
  ficone
  figa
  figata
  figate
  fighe
  fighetta
  fighette
  fighetti
  fighetto
  figliadicane
  figliadimignotta
  figliadiputtana
  figliaditroia
  figlidicani
  figlidimignotta
  figlidiputtana
  figliditroia
  figliedicani
  figliedimignotta
  figliediputtana
  figlieditroia
  figliodicane
  figliodimignotta
  figliodiputtana
  figlioditroia
  figona
  figone
  figoni
  fottere
  fottiti
  fottuta
  fottute
  fottuti
  fottutissima
  fottutissime
  fottutissimi
  fottutissimo
  fottuto
  fregna
  frocetto
  froci
  frociara
  frociaro
  frociarola
  frociarolo
  frocio
  frocione
  frocioni
  frocissimo
  gesùcristaccio
  gesùesorcizzato
  gesùhandicappato
  gesùimpasticcato
  gesùmalandato
  gesùradioattivo
  gesùsieropositivo
  gesùstordito
  gesùzozzo
  incazzare
  incazzata
  incazzate
  incazzati
  incazzatissima
  incazzatissime
  incazzatissimi
  incazzatissimo
  incazzato
  inculare
  inculata
  inculate
  infrociato
  leccacazzi
  leccaculi
  leccaculo
  leccafica
  leccafiga
  leccafighe
  leccapalle
  madonnaassassinata
  madonnacane
  madonnaimpestata
  madonnaisterica
  madonnalurida
  madonnamaiala
  madonnamongoloide
  madonnanegra
  madonnaputtana
  madonnaschiava
  madonnastregaccia
  madonnasudicia
  madonnasuicida
  madonnasurgelata
  madonnatroia
  madonnaviolentata
  mannaggiacristo
  mannaggiadio
  mannaggiailbattesimo
  mannaggiailclero
  mannaggiaisanti
  mannaggial'arcangelo
  mannaggialabibbia
  mannaggialadiocesi
  mannaggialamadonna
  mannaggialaputtana
  mannaggiapadrepio
  mannaggiasangiuseppe
  merda
  merdacce
  merdaccia
  merdamalcagata
  merdata
  merdate
  merde
  merdina
  merdine
  merdolina
  merdoline
  merdona
  merdone
  merdosa
  merdose
  merdosi
  merdoso
  mezzasega
  mezzeseghe
  mignotta
  mignotte
  minchia
  minchiadura
  minchiaduro
  minchiata
  minchiate
  minchie
  minchione
  minchioni
  mona
  mongoloide
  negra
  negraccia
  negraccio
  negro
  negrona
  negrone
  nerchia
  patonza
  patonze
  pigliacazzi
  pisciare
  pisciasotto
  pisciata
  pisciatina
  pisciato
  pisciatona
  piscio
  pisciona
  piscione
  piscioni
  pompinara
  pompinare
  pompini
  pompino
  porcamadonna
  porcaputtana
  porcodidio
  porcodio
  porcoilclero
  porcoilsignore
  pro-ana
  pro-anoressia
  pro-bulimia
  pro-ed
  pro-ednos
  pro-mia
  proana
  proanoressia
  probulimia
  proed
  proednos
  promia
  pugnetta
  pugnette
  puppa
  puppamela
  puppamelo
  puppare
  puppe
  puttana
  puttanacce
  puttanaccia
  puttanaeva
  puttanamadonna
  puttanata
  puttanate
  puttane
  puttanella
  puttanelle
  puttaniere
  puttanieri
  puttano
  puttanona
  puttanone
  raspone
  rasponi
  ricchione
  ricchioni
  rincoglionito
  rizzacazzi
  rompicazzi
  rompicazzo
  rompicoglioni
  rottinculo
  sbocchinare
  sbocchinato
  sbocchiniamolo
  sborra
  sborrare
  sborrata
  sborrate
  sborrato
  sborratona
  sburra
  sburrare
  scassacazzo
  scassacoglioni
  scassaminchia
  scazzare
  scazzata
  scazzate
  scazzati
  scazzato
  scopare
  scopata
  scopate
  segaiolo
  signorebastardo
  spompinare
  spompinata
  spompinato
  spompiniamolo
  stronzata
  stronzate
  stronzetta
  stronzette
  stronzetti
  stronzetto
  stronzina
  stronzine
  stronzini
  stronzino
  stronzo
  stronzoli
  stronzolo
  stronzomalcagato
  stronzona
  stronzone
  stronzoni
  succhiacazzi
  succhiamelo
  succhiaminchia
  succhiapalle
  tarzanelli
  tarzanello
  tetta
  tette
  tettina
  tettine
  tettona
  tettone
  thinspiration
  thinspo
  troia
  troiacce
  troiaccia
  troiamadonna
  troie
  troietta
  troiette
  troio
  troiona
  troioncella
  troioncelle
  troione
  trombare
  trombata
  trombatona
  vaccamadonna
  vaffanculo
  zinne
  zoccola`)
);

console.log(
	`abcdiet
affanculo
anabootcampdiet
bagasce
bagascia
bagascione
baldracca
baldraccacce
baldraccaccia
baldracche
baldraccona
baldraccone
bariledimerda
bastardacce
bastardacci
bastardaccia
bastardaccio
bastardamadonna
bastarde
bastardi
bastardo
bastardona
bastardone
bastardoni
battona
battone
bbwpit
bocchinara
bocchinare
bocchinari
bocchinaro
budellodidio
bustadipiscio
cacaminchia
cacare
cacasotto
cagacazzo
cagaminchia
cagare
cagasotto
canacciodidio
canagliadidio
caned'allah
caned'eva
canedidio
cazzacci
cazzaccio
cazzata
cazzate
cazzetti
cazzetto
cazzi
cazzissimo
cazzo
cazzona
cazzone
cazzoni
cazzuta
cazzute
cazzuti
cazzutissimo
cazzuto
cesso
checca
checche
chiavare
chiavata
chiavate
chiavatona
chiavatone
ciucciamelo
ciucciapalle
cogliona
coglionaggine
coglionare
coglionata
coglionate
coglionatore
coglionatrice
coglionatura
coglionature
coglionazzi
coglionazzo
coglioncelli
coglioncello
coglioncini
coglioncino
coglione
coglioneria
coglionerie
coglioni
coprofago
coprofilo
cornutoilpapa
credoana
cretinetti
cristod'undio
cristodecapitato
cristoincroce
culattone
culattoni
culi
culo
culona
culone
deficiente
dietaabc
dietaana
dietaanabootcamp
dietabootcamp
dietadell'abc
diobastardo
diobestia
diobestiazza
dioboia
diocan
diocane
diocannaiolo
diocapra
diocoglione
diocomunista
diocrasto
diocristo
dioculattone
diofarabutto
diofascista
diofinocchio
dioflagellato
dioimpestato
dioimpiccato
dioladro
diolebbroso
diolobotomizzato
diolurido
diomaiale
diomaledetto
diomerda
diominchione
dionegro
dioporco
diopoveraccio
diopovero
diorotto
diorottoinculo
diorutto
diosbudellato
dioschifoso
dioseppellito
dioserpente
diostracane
diostramerda
diostronzo
diosventrato
dioverme
facciadaculo
facciadimerda
fanculo
fica
ficata
ficate
fichetta
fichette
fichetti
fichetto
ficona
ficone
figa
figata
figate
fighe
fighetta
fighette
fighetti
fighetto
figliadicane
figliadimignotta
figliadiputtana
figliaditroia
figlidicani
figlidimignotta
figlidiputtana
figliditroia
figliedicani
figliedimignotta
figliediputtana
figlieditroia
figliodicane
figliodimignotta
figliodiputtana
figlioditroia
figona
figone
figoni
fottere
fottiti
fottuta
fottute
fottuti
fottutissima
fottutissime
fottutissimi
fottutissimo
fottuto
fregna
frocetto
froci
frociara
frociaro
frociarola
frociarolo
frocio
frocione
frocioni
frocissimo
gesùcristaccio
gesùesorcizzato
gesùhandicappato
gesùimpasticcato
gesùmalandato
gesùradioattivo
gesùsieropositivo
gesùstordito
gesùzozzo
incazzare
incazzata
incazzate
incazzati
incazzatissima
incazzatissime
incazzatissimi
incazzatissimo
incazzato
inculare
inculata
inculate
infrociato
leccacazzi
leccaculi
leccaculo
leccafica
leccafiga
leccafighe
leccapalle
madonnaassassinata
madonnacane
madonnaimpestata
madonnaisterica
madonnalurida
madonnamaiala
madonnamongoloide
madonnanegra
madonnaputtana
madonnaschiava
madonnastregaccia
madonnasudicia
madonnasuicida
madonnasurgelata
madonnatroia
madonnaviolentata
mannaggiacristo
mannaggiadio
mannaggiailbattesimo
mannaggiailclero
mannaggiaisanti
mannaggial'arcangelo
mannaggialabibbia
mannaggialadiocesi
mannaggialamadonna
mannaggialaputtana
mannaggiapadrepio
mannaggiasangiuseppe
merda
merdacce
merdaccia
merdamalcagata
merdata
merdate
merde
merdina
merdine
merdolina
merdoline
merdona
merdone
merdosa
merdose
merdosi
merdoso
mezzasega
mezzeseghe
mignotta
mignotte
minchia
minchiadura
minchiaduro
minchiata
minchiate
minchie
minchione
minchioni
mona
mongoloide
negra
negraccia
negraccio
negro
negrona
negrone
nerchia
patonza
patonze
pigliacazzi
pisciare
pisciasotto
pisciata
pisciatina
pisciato
pisciatona
piscio
pisciona
piscione
piscioni
pompinara
pompinare
pompini
pompino
porcamadonna
porcaputtana
porcodidio
porcodio
porcoilclero
porcoilsignore
pro-ana
pro-anoressia
pro-bulimia
pro-ed
pro-ednos
pro-mia
proana
proanoressia
probulimia
proed
proednos
promia
pugnetta
pugnette
puppa
puppamela
puppamelo
puppare
puppe
puttana
puttanacce
puttanaccia
puttanaeva
puttanamadonna
puttanata
puttanate
puttane
puttanella
puttanelle
puttaniere
puttanieri
puttano
puttanona
puttanone
raspone
rasponi
ricchione
ricchioni
rincoglionito
rizzacazzi
rompicazzi
rompicazzo
rompicoglioni
rottinculo
sbocchinare
sbocchinato
sbocchiniamolo
sborra
sborrare
sborrata
sborrate
sborrato
sborratona
sburra
sburrare
scassacazzo
scassacoglioni
scassaminchia
scazzare
scazzata
scazzate
scazzati
scazzato
scopare
scopata
scopate
segaiolo
signorebastardo
spompinare
spompinata
spompinato
spompiniamolo
stronzata
stronzate
stronzetta
stronzette
stronzetti
stronzetto
stronzina
stronzine
stronzini
stronzino
stronzo
stronzoli
stronzolo
stronzomalcagato
stronzona
stronzone
stronzoni
succhiacazzi
succhiamelo
succhiaminchia
succhiapalle
tarzanelli
tarzanello
tetta
tette
tettina
tettine
tettona
tettone
thinspiration
thinspo
troia
troiacce
troiaccia
troiamadonna
troie
troietta
troiette
troio
troiona
troioncella
troioncelle
troione
trombare
trombata
trombatona
vaccamadonna
vaffanculo
zinne
zoccola`.replace(/\n/g, ",")
);
