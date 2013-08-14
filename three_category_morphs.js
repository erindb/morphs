var pairings = [ ["cloud", "squashedBoomarang"], ["fat", "flower"], ["spikes", "choppyCircle"], ["circleSpikes", "oblongSpikes"], ["bigCloud", "frillyCloud"] ];
//var pairings = [ ["star", "fireball"] ];

var shapes = {"cloud": "M 276.52136269274695,150 Q 307.19221542040344,193.30675626861805 254.08734659331532,212.06320470934497 Q 261.143087984363,267.2720902282808 207.5005724672099,259.3744462489543 Q 182.63174786438296,308.8357108239526 140.37325158982296,271.9685610438883 Q 91.52997379716929,301.9602532390247 73.82891110821637,248.98968162111737 Q 21.145177768931347,248.48657896719862 38.03264231537905,196.0597920835883 Q -12.367412638113876,161.35240172665607 27.873208936149837,118.73015841217276 Q -8.361000004057388,92.82456821026842 30.452891378488033,93.38306388901756 Q 34.49148806661751,23.160618284021297 104.72848498770176,25.53799372783422 Q 159.4394507523676,-12.772424925516475 201.65660980577536,46.961649629129695 Q 286.222724024987,65.91007926525218 276.52136269274695,150",
"squashedBoomarang": "M 210.82463351919534,150 Q 235.01554030420107,172.81154563306256 245.92305852399755,205.47022167928233 Q 223.89838978015646,220.5706750572994 198.1312368104406,225.03284623668813 Q 171.96037065728277,226.27821364019627 149.36636463761303,215.19249694936926 Q 133.64786858205517,208.72311214198726 123.40275364629665,195.03788801957924 Q 91.26043529264392,202.79160171706963 57.85079550625461,191.91461874325893 Q 45.03926181642362,175.09662181424906 39.90867011218185,154.68302334337972 Q 68.40118099839583,122.83841465584588 105.55736666282891,113.67902170397807 Q 112.07904136371128,85.72520699010529 134.30882404314372,63.97505254385848 Q 161.91623264931513,57.80753037902757 189.85134005580122,64.79876243524605 Q 217.200764766801,107.24360335274434 210.82463351919534,150",
"fat": "M 216.50741931355506,150 Q 235.8890886191902,171.14192330513276 231.74557598440953,192.8396930568129 Q 225.95207193169446,219.45830126840517 201.66478506873955,230.25614996347255 Q 179.38571954470873,239.97817149027654 154.49458084696502,225.62123744914976 Q 135.43580051776541,257.48824166599604 110.26670963054187,266.4885982363228 Q 89.70409731884918,251.10652219644714 85.97594617588132,219.17297393728114 Q 74.62801359120749,196.24913200384316 87.955301574737,167.61980032620377 Q 51.09381422415403,148.51796806257968 40.14715647925286,115.21440498504109 Q 57.47660680514137,87.24955032525713 92.85965515407784,80.13730151770434 Q 120.86272615775329,69.5143247672161 149.42669249125646,87.16953732219852 Q 179.23187738278995,70.0677735560992 208.2167887219984,82.31329894078245 Q 229.02317613349828,113.73571415656421 216.50741931355506,150",
"flower": "M 270.66352754390056,150 Q 288.65503303447133,186.60194439713797 254.64362078280442,209.38559046873402 Q 252.76334912108211,250.11703058080442 212.33968615691936,253.46548463542632 Q 189.32167373803168,287.85148554878754 151.61700621477272,270.06868435446046 Q 135.56323787805584,292.160248166522 124.32162854852194,267.09492139057113 Q 80.64558712667753,274.81190265742725 64.13610008269737,233.6435811588916 Q 37.1925520744677,237.84154529658701 47.53934109905096,212.94850739487185 Q 15.02262031814925,197.94365115773053 30.642263977781155,165.80832189766963 Q 10.140724876738034,119.1675061265108 48.51420253884298,85.57268073037662 Q 55.47507399027714,42.59926053276979 99.02625116193451,41.2418990357253 Q 152.20852004570875,6.903679286443548 204.3866782417606,42.70715339424075 Q 272.18151557673286,74.9515820903385 270.66352754390056,150",
"spikes": "M 271.327329029622,150 Q 268.07440022932633,162.02374905194134 268.92476350518183,174.47448070342955 Q 262.000770301238,192.93617260730292 256.9134602979136,212.5259010273432 Q 236.86125727683444,221.764640543193 220.38097083699626,230.41443656866164 Q 213.7667035242742,243.62997841468166 207.4044123756384,261.12229171002696 Q 185.42647853201876,261.341543989276 165.82326341740207,262.88032782781767 Q 148.100393253417,264.6168320565841 129.30022351106751,268.86661514105043 Q 111.4586967980299,257.859325389588 94.05415776914396,249.09362976641196 Q 78.65950378345495,237.44497107874838 61.52342147217567,226.99453383626602 Q 53.73561313833967,207.6988577631284 44.815601398871706,190.04946612303132 Q 41.045092901789644,172.95809546856572 34.6352047217416,155.95133841140824 Q 40.633725262139095,148.45809112836392 41.73466658653729,141.348934753007 Q 41.91300864325922,120.76998812668111 41.23403850588787,97.66256694750385 Q 61.09698674196004,84.6382292726092 78.07775670524829,73.00673124765618 Q 88.27234451546369,57.87284784960529 99.30174594044486,39.24818338766349 Q 125.9507095779879,38.87375142189137 150.33704055263433,39.03288926299142 Q 175.31089554370433,41.69670593843399 201.46963124780757,45.096330729243434 Q 224.6912703754445,63.00903250369136 246.7218696237624,82.6891911418742 Q 261.535896941514,115.00948224774233 271.327329029622,150",
"choppyCircle": "M 280.8893549426223,150 Q 245.37164038322962,164.80905840479733 251.09485271209326,182.17116876460923 Q 222.60506436559382,186.85550638064893 231.29445569955146,209.44119670366885 Q 191.2527079500348,190.9429988105597 185.47154390795205,197.75299624437378 Q 179.01573974537922,200.33894564214486 189.84132725272343,242.45061073523323 Q 166.32587537172367,207.0145422276227 159.30230828377807,211.18936576803748 Q 149.2084627208134,189.3242403742812 138.465152045876,209.6169148023675 Q 124.15267501290634,220.6532895594529 84.69898948075001,266.66082890283246 Q 81.74380219626102,234.19844618641474 54.38328817694848,233.63967882438783 Q 79.7810785350551,194.4815559807402 73.75474078899337,183.19761017514764 Q 66.06491907217637,170.433431179609 16.73467869648144,158.93482635321828 Q 48.06398939004639,138.11245624378017 39.49554974968065,115.92205314489767 Q 73.0024973720677,109.53691432889278 69.74356034949741,86.6038480826044 Q 88.853267634493,83.77115349344716 82.26960414747536,48.58174026750655 Q 110.53534152247562,56.92208677149992 123.7184975052048,28.61980637756011 Q 148.5636200211958,48.02377474797231 172.76726595626468,28.382327951193247 Q 187.58395668482495,58.716019581648425 216.0535007898465,52.63422998351554 Q 198.34535121062933,101.10862366933617 202.39905898926665,113.5862238790084 Q 221.92559960518213,127.46217992432237 280.8893549426223,150",
"circleSpikes": "M 261.48390044061216,150 Q 209.81924515945042,152.0340183960457 238.88247609567856,156.05149256778196 Q 191.1007251373793,158.79387478067477 221.14670261877623,176.25982336495093 Q 188.59948727014728,171.67987015192415 223.34564547630066,208.09916457701033 Q 182.56777336151237,184.47946158037155 197.25900983762403,217.1995573462694 Q 175.95164637370078,199.7128821342488 187.9459158465731,254.17325226418694 Q 168.32374376345786,222.49086826881117 167.3732482447994,268.2679465899743 Q 148.04471149860618,233.08543558693162 125.54746194219629,275.1782712569518 Q 124.0389051797606,220.87474867055084 99.15454083839947,241.0442710007212 Q 118.77250571603355,188.89586070955818 92.96561079241091,200.75089614479936 Q 112.74579737677112,177.46061878075602 66.89398213065776,200.18282731353213 Q 113.95308184281294,163.48571760020903 90.1479833833989,160.44360933282928 Q 121.52014442918144,149.68123037537038 74.39126465228563,135.05585178477315 Q 98.93175243445022,129.40022333505092 54.18980505106798,88.35956900734566 Q 117.62150907194835,119.68650702434314 116.87779454717398,105.28484130608075 Q 132.25183187734947,114.78866902967947 119.61875016555416,50.45198090234807 Q 145.42089742508165,101.66272881697087 157.91419854043505,76.53405383839876 Q 166.5121142262815,89.21685093267439 204.59780217888596,28.782798368387773 Q 184.29705249479127,107.62980010791753 195.90917176880964,116.31368288099432 Q 191.6060735269097,136.37300932311277 261.48390044061216,150",
"oblongSpikes": "M 257.15209999298645,150 Q 241.67587867989116,163.1502708225271 252.86344136081215,180.1300521435943 Q 234.6882645584642,187.59459547761048 241.3888657927144,206.10971357058574 Q 220.96035232381416,209.67410698977727 220.9948675913227,230.45927326560457 Q 205.86707383677148,223.94186787769735 207.92350933073644,240.14963551716806 Q 192.23321340481573,232.46111991851802 189.33728800299173,249.77400744092031 Q 169.86555983361254,240.55969338158218 156.04088343542918,257.1161378011897 Q 139.93432495402635,242.19638145326792 120.98110851047534,253.3130224347242 Q 110.75576787619667,234.03876951045675 89.42019705965836,238.56111073383357 Q 87.60877164233214,218.53524682238657 67.59843032592192,218.5263756131352 Q 70.97618780703816,198.2899098937057 51.440928298920795,192.0576321466025 Q 60.178188328091366,172.76176136600003 43.19053277190953,159.9663682863552 Q 57.48894715664022,143.66463703474966 45.52921851168996,125.56185441826158 Q 65.37875718124587,112.13214993437566 62.21400701513835,88.41555922506885 Q 83.2637210938602,85.64850516228968 85.22781617277664,64.46519907938294 Q 108.0951601077166,67.28151567762164 119.35750382054391,47.19825377166043 Q 142.95101272483853,57.56909375610452 164.69418135908504,43.7753289287169 Q 173.5942518289778,60.395118619540895 189.5085560370953,50.35550305376704 Q 203.27597927275104,74.15841055228857 230.40804614807712,78.97404854618945 Q 236.6665064777095,117.20410932974724 257.15209999298645,150",
"bigCloud": "M 278.6415320002035,150 Q 308.85600489388645,172.83353675749078 273.5184958454017,186.2575314149819 Q 291.41892178284445,214.42559741219947 249.77623197243102,213.87268815550686 Q 263.8654382254641,247.2899052185054 227.9903467221212,237.83442559233345 Q 232.38093354831406,275.3197063438547 200.30789790251802,257.70659156446527 Q 197.0955791403474,295.0158702188378 173.2557780240028,270.23274192686694 Q 161.70065563893348,304.47520392902607 145.0674959554206,273.67021021581684 Q 124.35671347575847,301.424895365422 115.09887746690907,264.5903741339779 Q 84.36107707788977,288.1365137146197 81.69876562589226,251.67202078893587 Q 45.04631462856322,262.7875445877885 53.84680833293223,225.15932009289014 Q 20.07787565735626,227.356123267325 42.9388257953911,196.6094348736873 Q 3.6568420777840345,196.21442854013608 25.990916881601677,175.28774503192133 Q -7.38459593280399,155.50811449360236 26.277340814217922,133.67462817840482 Q 0.13098390315073516,111.83234249808197 37.170367464083355,106.55510080133365 Q 9.523882341677648,82.60104598733949 40.149447550631706,86.05707508785511 Q 23.255786348272096,55.32778063054374 58.54803110101035,63.781181934844156 Q 60.78019186469112,25.322269443854154 101.36504410313773,43.2218782618299 Q 117.75609586096704,2.492782311360628 149.63507972252063,28.958315432419695 Q 182.96657715077896,-0.22664958578204164 201.82082353513377,38.49905404486711 Q 247.63148272814954,32.19350782211143 247.0906213494615,80.42107055733817 Q 298.3758946809244,102.32334285442627 278.6415320002035,150",
"frillyCloud": "M 198.46262853691096,150 Q 259.4704351086728,165.3428048937116 228.24571215522283,172.37249233479687 Q 256.49141822477014,195.51952039899118 200.92910768605574,179.7984271104228 Q 247.48418808054367,226.00393934948784 217.91113007282024,219.23260623873185 Q 236.13641380817313,268.1286840183858 198.50622105289457,242.19822551648804 Q 196.53938677087118,283.7195412116813 166.1888306141132,236.25121765019125 Q 154.7675513210553,267.7712462039907 144.07474800866967,206.4310201560067 Q 122.04641184339695,273.0115888662244 114.98723850584142,248.26612541514356 Q 72.81021289435617,293.2888536593574 71.76704017850564,253.77537463163242 Q 40.66545330445973,259.1148649665331 79.83463094003976,202.6744540059417 Q 48.03265347056822,206.73255336540439 99.31014756642153,169.74796303950654 Q 22.306428255604388,177.29204278641396 34.624676359817144,155.73081476747979 Q -20.371856623185863,139.99243269664854 17.29502179980409,127.63339456428777 Q 19.071043334166887,119.07936186621015 108.64390875473774,137.34948064057994 Q 54.951957225942095,100.52227274913668 87.08857723330689,100.86513472443441 Q 53.83312466884955,40.40773594301811 88.77557177762802,46.161577411521904 Q 104.45284336927133,21.26557903082454 140.9942781469521,89.33689481137944 Q 152.3168129105171,42.794706699524184 161.7256643394025,89.2249240471265 Q 180.22504353405046,42.8534924229359 174.445677320353,84.91620394208587 Q 235.3834078209165,31.152838791798246 252.23254015986734,66.62976606295562 Q 277.940290975051,104.4461494963619 198.46262853691096,150",
"star": "M 92.247369,263.75556 97.360343,179.00028 81.553311,182.61511 85.321917,167.2987 15.606622,178.27937 77.202297,129.47486 56.006395,119.43706 75.611268,109.81048 17.388965,70.505038 89.138543,81.974736 88.682683,65.549896 103.24545,67.346168 91.653254,5.468804 129.46618,56.428683 142.15297,45.729329 153.21753,57.881407 193.2468,16.617872 186.02553,77.849816 197.99972,79.176535 200.98959,91.749704 279.39338,89.706211 218.49477,124.33696 225.32898,134.92188 217.84445,141.48209 262.16406,188.18965 194.23051,171.11152 200.37617,191.28661 181.59116,183.68158 195.62326,256.32285 150.19936,189.19096 142.15297,206.77143 134.63646,188.68127 z",
//"star": "M 80,213.86218 84.303022,145.44413 80,141.86218 74.171617,135.99812 15.5,144.86218 67.338235,105.46512 67,98.362182 65.999243,89.5912 17,57.862182 77.383647,67.121008 84,60.862182 89.255865,55.312209 79.5,5.3621821 111.32294,46.499153 121,46.862182 131.31181,47.671853 165,14.362182 158.92266,63.791198 164.5,68.862182 171.51624,75.011776 237.5,73.362182 186.24841,101.31759 186,107.86218 185.70111,115.15786 223,152.86218 165.82788,139.07599 161.5,143.86218 155.19074,149.22308 167,207.86218 128.77175,153.67048 123.5,152.86218 115.67419,153.25904 z",
"fireball": "M 99.495656,271.67942 113.61959,176.29672 79.44014,248.40283 105.38655,166.75171 17.669143,178.57309 109.66499,151.44855 16.866922,160.91499 106.71444,135.59814 16.866922,83.058848 112.14451,118.79053 40.131324,64.59811 126.37947,107.86049 100.29788,17.242307 149.75148,105.75267 125.16672,13.229104 170.59137,104.42461 210.20212,28.479278 186.81363,120.66901 231.05986,39.716248 200.60152,139.48385 284.80865,99.111664 205.78735,152.81701 293.63308,130.41465 199.2937,170.21869 268.76424,197.03382 186.66157,182.12687 259.13759,225.12625 172.80378,186.3762 201.37769,273.2847 149.66935,191.91025 173.29996,276.49526 131.06175,188.84185 z"};
//"fireball": "M 91.5,183.36218 84.303022,145.44413 79,168.86218 74.171617,135.99812 40.5,125.36218 67.338235,105.46512 40,114.36218 65.999243,89.5912 40,65.862182 77.383647,67.121008 54.5,54.362182 89.255865,55.312209 92,24.862182 111.32294,46.499153 107.5,22.362182 131.31181,47.671853 160.5,31.862182 158.92266,63.791198 173.5,38.862182 171.51624,75.011776 207,75.862182 186.24841,101.31759 212.5,95.36218 185.70111,115.15786 197,136.86218 165.82788,139.07599 191,154.36218 155.19074,149.22308 155,184.36218 128.77175,153.67048 137.5,186.36218 115.67419,153.25904 z",};







//logging response, behavior, and rt into data
//randomize properties



// creates an image partway between two other images, as in the animations
// by Raphael.js
function intermediate(from, to, pos) {
  var fromCurve = Raphael.path2curve(from);
  var toCurve = Raphael.path2curve(to);
  var diff = [];
  var attr = "path";
  //compute difference between paths and store in diff
  for (i = 0, ii = fromCurve.length; i < ii; i++) {
    diff[i] = [0];
    for (var j = 1, jj = fromCurve[i].length; j < jj; j++) {
      diff[i][j] = (toCurve[i][j] - fromCurve[i][j]);
    }
  }
  var S = " ";
  now = [];
  //compute new path string for intermediate image
  for (var i = 0, ii = fromCurve.length; i < ii; i++) {
    now[i] = [fromCurve[i][0]];
    for (var j = 1, jj = fromCurve[i].length; j < jj; j++) {
      now[i][j] = +fromCurve[i][j] + pos * diff[i][j];
    }
    now[i] = now[i].join(S);
  }
  return now.join(S);
}


function translate(pathString, xpos, ypos) {
  var segments = pathString.split(" ");
  var ret_string = segments[0]; //M
  var old_xpos = segments[1];
  var old_ypos = segments[2];
  var xdiff = xpos - old_xpos;
  var ydiff = ypos - old_ypos;
  var type = "x";
  for (var i=1; i<(segments.length); i++) {
    var seg = segments[i];
    if (type == "x") {
      if (seg == "Q" || seg == "L" || seg == "C" || seg == "Z" || seg == "z") {
        ret_string += (" " + seg);
        type = "x"
      } else {
        var x = (parseFloat(seg)+xdiff).toString();
        ret_string += (" " + x);
        type = "y";
      }
    } else if (type == "y") {
      var y = (parseFloat(seg)+ydiff).toString();
        ret_string += (" " + y);
      type = "x";
    }
  }
  return ret_string;
}

function uniformAroundMean(mean, radius) {
  var radius = radius || 0.2;
  if (mean + radius < 1) {
    var upper = mean + radius;
  } else {
    var upper = 1;
  }
  if (mean - radius > .1) {
    var lower = mean - radius;
  } else {
    var lower = .1;
  }
  var interval = upper - lower;
  return Math.random() * interval + lower;
}

function myColor(meanColor, hVar, sVar, vVar) {
  var hVar = hVar || 0.01;
  var sVar = sVar || 0.1;
  var vVar = vVar || 0.1;
  var c = Raphael.color(meanColor);
  if (c.h<0.1 || c.h>0.9) { hVar = hVar*0.6; }
  var hMin = c.h - hVar;
  var hMax = c.h + hVar;
  if (hMin < 0) {hMin = 0;}
  var hue = uniform(hMin, hMax);
  if (hue >= 1) { hue = hue-1; }
  var saturation = uniformAroundMean(c.s, sVar);
  var value = uniformAroundMean(c.v, vVar);
  var newColor = Raphael.hsb2rgb(hue, saturation, value);
  return newColor.hex;
}

function posify(pathString, xpos, ypos) {
  var segments = pathString.split(" ");
  var ret_string = segments[0]; //M
  var type = "x";
  for (var i=1; i<(segments.length); i++) {
    var seg = segments[i];
    if (type == "x") {
      if (seg == "Q" || seg == "L" || seg == "C" || seg == "Z" || seg == "z") {
        ret_string += (" " + seg);
        type = "x"
      } else {
        var x = (((parseFloat(seg)-150)*0.2)+xpos).toString();
        ret_string += (" " + x);
        type = "y";
      }
    } else if (type == "y") {
      var y = (((parseFloat(seg)-150)*0.2)+ypos).toString();
        ret_string += (" " + y);
      type = "x";
    }
  }
  return ret_string;
}

function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}
function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.

function numeric(a,b) {return a-b;};

//distributions
/*var peakedDown = [ 0.1503, 0.808, 0.008998, 0.1865, 0.6968,
                   0.08414, 0.5298, 0.04401, 0.08997, 0.1155,
                   0.9365, 0.1723, 0.02402, 0.09271, 0.2748,
                   0.04575, 0.3631, 0.06981, 0.7915, 0.1422 ].slice(0,nExamples).sort(function(a,b){return a-b;});
var peakedMid = [ 0.4483, 0.5501, 0.5131, 0.4047, 0.5896,
                  0.4675, 0.4634, 0.6999, 0.8629, 0.6108,
                  0.3966, 0.6713, 0.5004, 0.5445, 0.5838,
                  0.333, 0.571, 0.7091, 0.2747, 0.4224 ].slice(0,nExamples).sort(function(a,b){return a-b;});
var peakedUp = [ 0.5187, 0.696, 0.9059, 0.5085, 0.06499,
                 0.9219, 0.8298, 0.9483, 0.6705, 0.9913,
                 0.999, 0.7982, 0.8714, 0.406, 0.5344,
                 1, 0.4055, 0.8554, 0.7807, 0.9755 ].slice(0,nExamples).sort(function(a,b){return a-b;});
                 */
var peakedDown = [  0.04583, 0.003231, 0.07391, 0.01884, 0.00003024, 0.04158,
                    0.09081, 0.06746, 0.01949, 0.1007, 0.1633, 0.1441, 0.1655,
                    0.2697, 0.2161 ].sort(numeric);
var peakedMid = [  0.2489, 0.2908, 0.3173, 0.3717, 0.3857, 0.4729, 0.4959,
                   0.4051, 0.4168, 0.492, 0.5714, 0.5028, 0.5001, 0.6427,
                   0.6147 ].sort(numeric);
var peakedUp = [ 0.98453, 0.94511, 0.98374, 0.99169, 0.95354, 0.99290, 0.90903,
                 0.93163, 0.97849, 0.82958, 0.81623, 0.85902, 0.83160, 0.76648,
                 0.73325 ].sort(numeric);


//randomized particulars
//var shapePairs = [ { cloud: "M 221.7571575320564,150 Q 235.33250039697197,183.56816372052631 178.66709439959914,176.68337715408177 Q 189.77066884863115,237.34425189457463 152.67669302195748,230.2622947355221 Q 106.18824144458648,263.08315106222085 87.34457613025721,214.28222693427597 Q 37.157650543250696,192.13597105007403 71.60876085378497,143.4415297870395 Q 69.50098674009855,101.76184621474493 130.13572530091528,119.31686876482323 Q 139.68495874592924,60.558577755087825 174.01994490949298,83.1415789427852 Q 238.04234639979444,88.07874811311186 221.7571575320564,150",
//                     spikey: "M 227.1753318214803,150 Q 230.34329245027482,184.3396911320814 234.17184931397168,238.03432938679111 Q 176.1471395867638,223.02310266966794 145.67111361016336,207.3901616410368 Q 120.60272053801536,208.7539431935977 76.15756846740022,214.53454863270557 Q 70.15797594245315,176.3162788336788 56.02099517470542,142.32813486378728 Q 83.51403297621943,109.59015621330471 104.56308657027593,77.5248400718606 Q 136.0595742073103,58.977915925262366 181.11244904919704,31.15287588330574 Q 219.58206251754342,96.28873096172566 227.1753318214803,150"} ];
var colorBank = [ {word: "red", hex: "ff0000"},
                  {word: "blue", hex: "0000ff"},
                  {word: "green", hex: "#00ff00"}];
var nonceWords = ["fep", "wug", "tig", "dax", "blick", "speff", "zib", "gub",
                  "bort"]
var nounify = { "feppy": "feppiness",
                "wuggy": "wugginess",
                "tiggy": "tigginess",
                "daxy": "daxiness",
                "blicky": "blickiness",
                "speffy": "speffines",
                "zibby": "zibbiness",
                "gubby": "gubbiness",
                "borty": "bortiness" };
var adjify = { "fep": "feppy",
               "wug":"wuggy",
               "tig": "tiggy",
               "blick": "blicky",
               "dax": "daxy",
               "speff": "speffy",
               "zib": "zibby",
               "gub": "gubby",
               "bort": "borty"};
var plural = { "fep": "feps",
               "wug":"wugs",
               "tig": "tigs",
               "blick": "blicks",
               "dax": "daxes",
               "speff": "speffs",
               "zib": "zibs",
               "gub": "gubs",
               "bort": "borts" }
console.log(nonceWords.length == Object.keys(adjify).length);
console.log(Object.keys(adjify).length == Object.keys(nounify).length);
console.log(Object.keys(nounify).length == Object.keys(plural).length);
for (var i=0; i<nonceWords.length; i++) {
  var noun = nonceWords[i];
  var adj = adjify[noun];
  if (adj == null) { console.log("ERROR: no entry in adjify for noun " + noun); }
  var plur = plural[noun];
  if (plur == null) { console.log("ERROR: no entry in plural for noun " + noun); }
  var adjnoun = nounify[adj];
  if (adjnoun == null) { console.log("ERROR: no entry in nounify for adj " + adj); }
}
var distributions = [peakedDown, peakedMid, peakedUp];

var nExamples = 15;
for (var i=0; i<distributions.length; i++) {
  var dist = distributions[i];
  console.log(dist.length == nExamples);
}
var grey = "#e0e0e0";

//as many compare as classify, should be roughly half easy half difficult
var nArtifacts = 3;
var nTargets = nArtifacts * 3;
var compareParams = [ [0.1, 0.7], [0.2, 0.9], [0.4, 0.3], [0.45, 0.55], [0.6, 0.7] ];
var classifyParams = [0.1, 0.25, 0.5, 0.75, 0.9];
var nComparisons = compareParams.length//2;
var nClassifications = classifyParams.length//2;
var nWarmups = nComparisons + nClassifications;
console.log( nComparisons == nClassifications );
var nQns = nWarmups + nTargets + 2; //plus 1 for language, one for sliderPractice
warmupStagesBank = [];
for (var i=0; i<nComparisons; i++) { warmupStagesBank.push("compare"); }
for (var i=0; i<nClassifications; i++) { warmupStagesBank.push("classify"); }
var shuffledCompare = shuffle(compareParams);
var shuffledClassify = shuffle(classifyParams);
var parameters = {"compare": shuffledCompare,
                  "classify": shuffledClassify };
var conds = ["speech-act", "non-speech-act"];


/*var nComparison = 3;
var nArtifacts = 3;
var nClassifications = 9;
var toClassify = [];
for (var i=0; i<nClassifications; i++) {
  toClassify.push(i/(nClassifications - 1));
}
var compareQns = nComparison * nArtifacts;
var classifyQns = nClassifications;
var totQns = (nArtifacts * nComparison) + nClassifications + 9 + 1;
*/

$(document).ready(function() {
  //experiment.questionaire();
  //experiment.sliderPractice();
  //experiment.warmup("start");
  //experiment.compare("start");
  //experiment.classify("start");
  showSlide("consent");
  $("#mustaccept").hide();
});

//parameters randomized for each subject
var shuffledNonce = shuffle(nonceWords);
var nouns = shuffledNonce.slice(0,3);
var adjective = adjify[ shuffledNonce[4] ];
var colors = getColors();
var shuffledPairings = shuffle(pairings);
var unshuffledPair = shuffledPairings[0];
var pair = shuffle(unshuffledPair);
var leastLabel = pair[0];
var mostLabel = pair[1];
var least = shapes[ leastLabel ];
var most = shapes[ mostLabel ];
var warmupIndices = shuffle([0, 1, 2]); //order in which categories are displayed in warmup from top to bottom

var experiment = {
  data: {"nouns":{"most":nouns[0], "mid":nouns[1], "least":nouns[2]},
                  "adjective":adjective, "colors":colors,
                  "least":{"label": leastLabel, "path":least},
                  "most":{"label":mostLabel, "path":most},
                  "windowWidth":window.innerWidth,
                  "windowHeight":window.innerHeight,
                  "warmupIndices":warmupIndices, "warmups":[] },
  warmupStages: getWarmupStages(),
  colors: getColors(),
  cond: 'speech-act',

  instructions: function() {
    if (turk.previewMode) {
      $("#instructions #mustaccept").show();
    } else {
      showSlide("instructions");
      //$("#begin").click(function() { experiment.warmup('start'); })
      $("#begin").click(function() { experiment.sliderPractice(); })
    }
  },
  
  sliderPractice: function() {
    $("#sliderText").html("<p>You will learn about three kinds of alien artifacts" +
                          " that differ in color and <b>" +
                          nounify[adjective] + "</b>.</p><p>" +
                          caps(nounify[adjective]) + " is an important " +
                          "property, so please take a moment to understand " +
                          "a bit about it. You can adjust the slider below " +
                          "to vary the " + nounify[adjective] +
                          " of this shape.<p>");
    var interactivePaper = Raphael("interactiveCanvas", 300, 300);
    $("#leftTag").html("least " + adjective);
    $("#rightTag").html("most " + adjective);
    var halfway = intermediate(least, most, 0.5);
    var interactiveShape = interactivePaper.path(halfway);
    interactiveShape.attr({fill: makeGradient("r", grey)});
    showSlide("sliderPractice");
    var maxRange = 0.5;
    var minRange = 0.5;
    var visitedPositions = [];
    var practiceSlider = new Dragdealer("introSlider", {
      x: 0.5,
      speed: 50,
      animationCallback: function(x) {
        var inter = intermediate(least, most, x);
        interactiveShape.attr({path: inter});
        if ( x>maxRange ) { maxRange=x; }
        if ( x<minRange ) { minRange=x; }
      },
      callback: function(x) { visitedPositions.push(x); }
    });
    $("#sliderMoveon").click(function() {
      $("#sliderMoveon").unbind("click");
      experiment.data["slider-practice"] = { "min": minRange, "max": maxRange,
                                             "positions": visitedPositions };
      experiment.warmup('start');
    })
  },
 
  warmup: function(stage, qNumber) {
    if (stage == "start") {
      $('.bar').css('width', ( (100/nQns) + "%"));
      function buttonSide(side) { return "The artifact on the " + side + " is " +
                                         "more " + adjective + "."; }
      $("#leftButton").html(buttonSide("left"));
      $("#rightButton").html(buttonSide("right"));
      var top = warmupIndices[0];
      var mid = warmupIndices[1];
      var bottom = warmupIndices[2];
      $("#introObjs").html("<p>Here are examples of the three different kinds of alien" +
                           " artifacts.<br/>The " + colors[top].word + 
                           " ones  are called <b>" + plural[nouns[top]] + "</b>, " +
                           "the " + colors[mid].word + " ones are " +
                           "called <b>" + plural[nouns[mid]] + "</b>, and the " +
                           colors[bottom].word + " ones are called <b>" +
                           plural[nouns[bottom]] + "</b>.</p><p>Some of the " +
                           "artifacts are more <b>" + adjective +
                           "</b> than others. Within each category, we" +
                           " have lined the objects up in order from least to most " +
                           adjective + ".</p>");
      $("#adjLeft").html("less " + adjective);
      $("#adjRight").html("more " + adjective);
      $("#warmupText").html("We need your help to sort and describe some" +
                            " new artifacts. These new artifacts " +
                            "have lost their original colors, but each is " +
                            "either a " + nouns[top] + ", a " +
                            nouns[mid] + ", or a " +
                            nouns[bottom] + ".");
      $("#compare").hide();
      $("#classify").hide();
      for (var pos=0; pos<nArtifacts; pos++) {
        displayStuff(pos);
      }
      showSlide("warmup");
      $("#warmupMoveon").click(function() {
        $("#warmupMoveon").unbind("click");
        var next = experiment.warmupStages[0];
        experiment.warmup(next.stage, 0);
      });
    } else {
      $('.bar').css('width', ( (100*(qNumber+1)/nQns) + "%"));
      $("#warmupMoveon").hide();
      $("#introObjs").html("<p><br/><br/></p><p><br/></p>");
      $("#warmupContinueText").hide();
      var startTime = (new Date()).getTime();
      if (stage == "compare") {
        $("#compare").show();
        $("#classify").hide();
        $("#warmupText").html("Which of the two artifacts below is more " +
                              adjective + "?");
        var pair = shuffle(experiment.warmupStages[qNumber].params);
        var left = pair[0];
        var right = pair[1];
        drawWhite("left", left);
        drawWhite("right", right);
        $("#leftButton").click(function() {
          $("#leftButton").unbind("click");
          $("#rightButton").unbind("click");
          compareResponse("left", {left: left, right:right}, qNumber, startTime)
        });
        $("#rightButton").click(function() {
          $("#rightButton").unbind("click");
          $("#leftButton").unbind("click");
          compareResponse("right", {left: left, right:right}, qNumber, startTime)
        });
      } else if (stage == "classify") {
        $("#compare").hide();
        $("#classify").show();
        $("#warmupText").html("The object below is an example of which kind of" +
                              " artifact?");
        var morphProp = experiment.warmupStages[qNumber].params;
        drawWhite("classify", morphProp);
        var buttonOrder = shuffle([0, 1, 2]);
        var n0 = nouns[buttonOrder[0]];
        var n1 = nouns[buttonOrder[1]];
        var n2 = nouns[buttonOrder[2]];
        $("#noun0").html(n0);
        $("#noun1").html(n1);
        $("#noun2").html(n2);
        $("#noun0").click( function() {
          $("#noun0").unbind("click");
          $("#noun1").unbind("click");
          $("#noun2").unbind("click");
          classifyResponse(n0, qNumber, startTime, morphProp, buttonOrder)
        });
        $("#noun1").click( function() {
          $("#noun0").unbind("click");
          $("#noun1").unbind("click");
          $("#noun2").unbind("click");
          classifyResponse(n1, qNumber, startTime, morphProp, buttonOrder)
        });
        $("#noun2").click( function() {
          $("#noun0").unbind("click");
          $("#noun1").unbind("click");
          $("#noun2").unbind("click");
          classifyResponse(n2, qNumber, startTime, morphProp, buttonOrder)
        });
      } else {
        console.log("ERROR unrecognized input for " +
                    "variable 'stage' in function 'warmup'");
      }
    }
  },

  target: function() {
    if (experiment.cond == 'speech-act') {
      var prompt = "<p>John is an expert on these alien artifacts.</p>" +
                   "<p>Imagine that John describes an object with each " +
                   "phrase below. What do you think the object looks like? " +
                   "Adjust the slider to give us your guess.</p>";
      var targetBegin = 'John says, "';
      var targetEnd = '"';
    } else if (experiment.cond == 'non-speech-act') {
      var prompt = "Please use the sliders below each of the phrases to indicate...";
      var targetBegin = '... what you think ';
      var targetEnd = ' would look like.';
    } else {
      console.log("ERROR: unrecognized input for experiment.cond: " + experiment.cond);
    }
    $("#targetIntro").html(prompt)
    $('.bar').css('width', ( (100*(nWarmups+1)/nQns) + "%"));
    $("#targetError").hide();
    showSlide("target");
    //randomize target phrase order
    var targetPhrases = [ [], [], [] ];
    var phrasesOrder = shuffle([0,1,2]);
    for (var i=0; i<nouns.length; i++) {
      //if need to switch rows and columns, do that here by switching i and phrasesOrder[#]
      targetPhrases[i][phrasesOrder[0]] = nouns[i];
      targetPhrases[i][phrasesOrder[1]] = adjective + " " + nouns[i];
      targetPhrases[i][phrasesOrder[2]] = "very " + adjective + " " + nouns[i];
    }
    var targetPhrases = shuffle(targetPhrases);
    
    function row(index) {
      return Math.floor(index / 3);
    }
    function col(index) {
      return (index % 3);
    }

    var maxRange = 0.5;
    var minRange = 0.5;
    //stupid for-loop closure bullshit (!!!!!)
    var shapes = [];
    var responses = {};
    var nResponses = 0;
    var firstPath = posify(intermediate(least,
                                       most, 0.5),
                          30, 50);
    for (var i=0; i<9; i++) {
     var paper = Raphael("canvas"+i, 70, 100);
     shapes.push(paper.path(firstPath));
    }
    function animCreator(index) {
     return function(x) {
       var currentPath = posify(intermediate(least, most, x), 30, 50);
       var shape = shapes[index];
       shape.attr({path: currentPath,
                   fill: makeGradient("r",grey)});
     }
    }
    function callCreator(index) {
     return function(x) {
       if (responses[targetPhrases[row(index)][col(index)]] == null) {
         nResponses++;
         responses[targetPhrases[row(index)][col(index)]] = [];
         $('.bar').css('width', ( (100*(nWarmups + 1 + nResponses)/nQns) + "%"));
       }
       responses[targetPhrases[row(index)][col(index)]].push(x);
     }
    }
    //end stupid for-loop closure bullshit (!!!!!)

    for (var i=0; i < 9; i++) {
     $("#targetText"+i).html(targetBegin + "a <b>" + 
                             targetPhrases[row(i)][col(i)] +
                             "</b>" + targetEnd);
     var caseLabel = "sliderCase" + i;
     var sliderLabel = "slider" + i;
     $("#"+caseLabel).html('<div id="'+sliderLabel+
                           '" class="dragdealer"><div class='+
                           '"red-bar handle"></div></div>');
     var slider = new Dragdealer(sliderLabel, {
       x: 0.5,
       speed: 50,
       animationCallback: animCreator(i),
       callback: callCreator(i)
     });
    }
    var startTime = (new Date()).getTime();

    $("#targetMoveon").click(function() {
     /*var nFail = 0;
     for (phrase in responses) {
       if (responses[phrase] == null) { nFail ++; }
     }*/
     if ( nResponses < 9 ) {
       $("#targetError").show();
     } else {
       $("#targetMoveon").unbind("click");
       var endTime = (new Date()).getTime();
       responses["rt"] = endTime - startTime;
       experiment.data["target"] = responses;
       experiment.questionaire();
     }
    });
  },

  questionaire: function() {
    $(document).keypress( function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
    });
    $('.bar').css('width', ( "100%"));
    showSlide("questionaire");
    $("#lgerror").hide();
    $("#formsubmit").click(function(){
    rawResponse = $("#questionaireform").serialize();
    pieces = rawResponse.split("&");
    var age = pieces[0].split("=")[1];
    var lang = pieces[1].split("=")[1];
    var comments = pieces[2].split("=")[1];
    if (lang.length > 0) {
        experiment.data["language"] = lang;
        experiment.data["comments"] = comments;
        experiment.data["age"] = age;
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment.data) }, 1000);
    }
    });
  }
};

//nArtifacts should be = distributions.length
//length of each distribution should be 20 = nExamples

  
  function lighten(origColor, saturation) {
    var saturation = saturation || false;
    var eps = 0.1;
    var c = Raphael.color(origColor);
    if (c.v + eps < 1) {
      var value = c.v + eps;
    } else {
      var value = 1;
    }
    if (saturation) {
      var saturationEps = 0.1;
      if (c.s - saturationEps > 0) {
        var sat = c.s - saturationEps;
      } else {
        var sat = 0;
      }
    } else {sat = c.s;}
    var newColor = Raphael.hsb2rgb(c.h, sat, value);
    return newColor.hex;
  }

  function makeGradient(intro, origColor) {
    var light = lighten(origColor);
    var grad = intro + light + "-" + origColor;
    return grad;
  }
  
function getColors() {
  var shuffledColors = shuffle(colorBank);
  var variedColors = [ {}, {}, {} ]
  for (var i=0; i<nArtifacts; i++) {
    var latentMean = shuffledColors[i].hex;
    var word = shuffledColors[i].word;
    variedColors[i] = {mean: latentMean, tokenColors: [], word: word};
    for (var j=0; j<nExamples; j++) {
      var variedColor = myColor(latentMean, 0.05, 0.1, 0.5);
      variedColors[i].tokenColors.push(makeGradient("r", variedColor));
    }
  }
  return variedColors;
}


function displayStuff(position) {
  var artifact = warmupIndices[position];
  var nrows = Math.ceil( nExamples / 15 );
  var ncols = Math.ceil( nExamples / nrows );
  var space = 70;
  var sep = 80;
  var leftSpace = 10;
  var above = 0;
  $("#n"+position).html(plural[nouns[artifact]]);
  var warmupPaper = Raphael("orderedArts"+position, ncols*space, nrows*space);
  for (var row=0; row<nrows; row++) {
    for (var col=0; col<ncols; col++) {
      var i = (row*ncols)+col;
      var color = colors[artifact].tokenColors[i];
      var morphProp = distributions[artifact][i];
      var xpos = (col+0.5)*space;
      var ypos = (row+0.5)*space;
      var inter = intermediate(least, most, morphProp);
      var tmpPath = posify(inter, xpos, ypos);
      var tmpObj = warmupPaper.path(tmpPath);
      tmpObj.attr({fill: color});
    }
  }
}

function drawWhite(label, morphProp) {
  var space = 70;
  $("#"+label+"Holder").html('<div id="' + label + 'Canvas"></div>');
  var onePaper = Raphael(label+"Canvas", space, space);
  var color = makeGradient("r", grey);
  var xpos = 0.5*space;
  var ypos = 0.5*space;
  var inter = intermediate(least, most, morphProp);
  var tmpPath = posify(inter, xpos, ypos);
  var tmpObj = onePaper.path(tmpPath);
  tmpObj.attr({fill: color});
}

function warmupNext(qNumber) {
  if (qNumber + 1 < nWarmups) {
    var next = experiment.warmupStages[qNumber + 1];
    experiment.warmup(next.stage, qNumber + 1);
  } else {
    experiment.target();
  }
}

function compareResponse(choice, morphProps, n, startTime) {
  //choice should be either left or right
  //experiment.data moreSide choice correctness rt
  var endTime = (new Date()).getTime();
  var rt = endTime - startTime;
  if (morphProps.left > morphProps.right) {
    var moreSide = "left";
    var order = "ML"; //from left to right: more then less
  } else {
    var moreSide = "right";
    var order = "LM"; //from left to right: less then more
  }
  if (choice == moreSide) {
    var correctness = "correct";
  } else {
    var correctness = "incorrect";
  }
  var trialData = 
  experiment.data["warmups"].push({"qNumber":n,
                                    "qType":"compare",
                                    "rt":rt,
                                    "response":choice,
                                    "correctness":correctness,
                                    "morphProp(s)":morphProps,
                                    "order":order});
  warmupNext(n);
}

function classifyResponse(noun, n, startTime, morphProp, order) {
  //experiment.data noun
  var endTime = (new Date()).getTime();
  var rt = endTime - startTime;
  experiment.data["warmups"].push({"qNumber":n,
                                   "qType":"classify",
                                   "rt":rt,
                                   "response":noun,
                                   "correctness":"N/A",
                                   "morphProp(s)":morphProp,
                                   "order":order});
  warmupNext(n);
}

function getWarmupStages() {
  var warmStages = [];
  var shuffledWarmupStages = shuffle(warmupStagesBank); //compare and classify repeated
  var stageSpecificIndices = {"classify": 0, "compare": 0};
  for (var i=0; i<shuffledWarmupStages.length; i++) {
    var stage = shuffledWarmupStages[i];
    var stageSpecificIndex = stageSpecificIndices[stage];
    var params = parameters[stage][stageSpecificIndex];
    warmStages.push({stage: stage, params: params});
    stageSpecificIndices[stage]++;
  }
  return warmStages;
}

/* octave sampling funciton
function a = sampleDown()
  a = unifrnd(0, 0.1, 1, 9);
  a = [a unifrnd(0.1, 0.2, 1, 4)];
  a = [a unifrnd(0.2, 0.3, 1, 2)];
endfunction

function b = sampleMid()
  b = unifrnd(0.2, 0.3, 1, 2);
  b = [b unifrnd(0.3, 0.4, 1, 3)];
  b = [b unifrnd(0.4, 0.5, 1, 5)];
  b = [b unifrnd(0.5, 0.6, 1, 3)];
  b = [b unifrnd(0.6, 0.7, 1, 2)];
endfunction

function c = sampleUp()
  c = unifrnd(0.9, 1, 1, 9);
  c = [c unifrnd(0.8, 0.9, 1, 4)];
  c = [c unifrnd(0.7, 0.8, 1, 2)];
endfunction

a = sampleDown;
b = sampleMid;
c = sampleUp;
hist(a);
plot([0:1/14:1], sort(a), "*", "markersize", 10)
*/
