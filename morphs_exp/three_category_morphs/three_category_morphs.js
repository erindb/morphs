function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }

//distributions
var peakedDown = [ 0.1503, 0.808, 0.008998, 0.1865, 0.6968,
                   0.08414, 0.5298, 0.04401, 0.08997, 0.1155,
                   0.9365, 0.1723, 0.02402, 0.09271, 0.2748,
                   0.04575, 0.3631, 0.06981, 0.7915, 0.1422 ];
var peakedMid = [ 0.4483, 0.5501, 0.5131, 0.4047, 0.5896,
                  0.4675, 0.4634, 0.6999, 0.8629, 0.6108,
                  0.3966, 0.6713, 0.5004, 0.5445, 0.5838,
                  0.333, 0.571, 0.7091, 0.2747, 0.4224 ];
var peakedUp = [ 0.5187, 0.696, 0.9059, 0.5085, 0.06499,
                 0.9219, 0.8298, 0.9483, 0.6705, 0.9913,
                 0.999, 0.7982, 0.8714, 0.406, 0.5344,
                 1, 0.4055, 0.8554, 0.7807, 0.9755 ];

//randomized particulars
var shapePairs = [ { cloud: "M 221.7571575320564,150 Q 235.33250039697197,183.56816372052631 178.66709439959914,176.68337715408177 Q 189.77066884863115,237.34425189457463 152.67669302195748,230.2622947355221 Q 106.18824144458648,263.08315106222085 87.34457613025721,214.28222693427597 Q 37.157650543250696,192.13597105007403 71.60876085378497,143.4415297870395 Q 69.50098674009855,101.76184621474493 130.13572530091528,119.31686876482323 Q 139.68495874592924,60.558577755087825 174.01994490949298,83.1415789427852 Q 238.04234639979444,88.07874811311186 221.7571575320564,150",
                     spikey: "M 227.1753318214803,150 Q 230.34329245027482,184.3396911320814 234.17184931397168,238.03432938679111 Q 176.1471395867638,223.02310266966794 145.67111361016336,207.3901616410368 Q 120.60272053801536,208.7539431935977 76.15756846740022,214.53454863270557 Q 70.15797594245315,176.3162788336788 56.02099517470542,142.32813486378728 Q 83.51403297621943,109.59015621330471 104.56308657027593,77.5248400718606 Q 136.0595742073103,58.977915925262366 181.11244904919704,31.15287588330574 Q 219.58206251754342,96.28873096172566 227.1753318214803,150"} ];
var nouns = ["wug", "tig", "bonk"];
var colors = ["red", "blue", "green"];
var adjectives = ["feppy"];
var distributions = [peakedDown, peakedMid, peakedUp];

var nForceChoicePractice = 3;
var nArtifacts = 3;
var nClassifications = 9;

$(document).ready(function() {
    //$(".canvas").attr({width: canvasWidth, height: canvasHeight});
    showSlide("consent");
    $("#mustaccept").hide();
});

var experiment = { instructions: function() {
                     if (turk.previewMode) {
                         $("#instructions #mustaccept").show();
                     } else {
                         showSlide("instructions");
                     }
                   },
                   artifact: function(artifactIndex, stage, qNumber) {
                     if (stage == 'start') {
                       //draw all the wugs (or tigs or bonks)
                       if (artifactIndex == 0) {
                         var firstWord = "One";
                       } else {
                         var firstWord = "Another";
                       };
                       $("#artifactText").html("pictures of 20 "+nouns[artifactIndex]+"s<br/>"+firstWord+" kind of alien artifact are called "+nouns[artifactIndex]+"s. Some of the "+nouns[artifactIndex]+"s are more "+adjectives[0]+" than others. Please take a moment to study these "+nouns[artifactIndex]+"s. When you're ready, click the 'Continue' button below.");
                       showSlide("artifact");
                       $("#artifactMoveon").click(function() {
                         $("#artifactMoveon").unbind("click");
                         experiment.artifact(artifactIndex, 'least-most');
                       });
                     } else if (stage == 'least-most') {
                       $("#artifactText").html("The "+nouns[artifactIndex]+" on the left is the most feppy "+nouns[artifactIndex]+" we know of and the "+nouns[artifactIndex]+" on the right is the least feppy one. Please take a look at these two objects and then click 'Continue' when you are ready to go on.");
                       //animation to show most and least feppy wugs
                       $("#artifactMoveon").click(function() {
                         $("#artifactMoveon").unbind("click");
                         experiment.artifact(artifactIndex, 'comparison', 0);
                       });
                     } else if (stage == 'comparison') {
                       $("#artifactText").html("Click on the "+nouns[artifactIndex]+" that is the most feppy.");
                       //practice with feppiness scale
                       $("#artifactMoveon").click(function() {
                         $("#artifactMoveon").unbind("click");
                         if (qNumber + 1 < nForceChoicePractice) {
                           experiment.artifact(artifactIndex, 'comparison',
                                               qNumber + 1);
                         } else if (artifactIndex + 1 < nArtifacts) {
                           experiment.artifact(artifactIndex + 1, 'start');
                         } else {
                           experiment.classify('start');
                         }
                       });
                     } else {
                       console.log('ERROR unrecognized input for variable ' +
                                   '"stage" in function artifact');
                     }
                   },
                   classify: function (stage, qNumber) {
                     if (stage == 'start') {
                       showSlide("classify");
                       $("#classifyError").hide();
                       $("#classification").hide();
                       //allArtifacts
                       //show wugs, tigs, and bonks, in seperate categories
                       var classifyText = "<p>Now we need your help to sort " +
                                          "some new artifacts. The new " +
                                          "artifacts have lost their original " +
                                          "colors, but each is either a " +
                                          nouns[0] + ", a " + nouns[1] + 
                                          ", or a " + nouns[2] + ".</p><p>Click" +
                                          " continue when you are ready to " +
                                          "start sorting the new artifacts.</p>"
                       $("#classifyText").html(classifyText);
                       $("#classifyMoveon").click(function() {
                         $("#classifyMoveon").unbind("click");
                         experiment.classify('question', 0);
                       });
                     } else if (stage == 'question') {
                       $("#classifyError").hide();
                       var selector = document.getElementById('choice');
                       selector.value = "";
                       //show a new shape
                       $("#classifyText").hide();
                       $("#classification").show();
                       //what to put in the dropdown menu:
                       $("#noun0").html(nouns[0]);
                       $("#noun1").html(nouns[1]);
                       $("#noun2").html(nouns[2]);
                       //drop menu for which shape
                       $("#classifyMoveon").click(function() {
                         var responseRaw = $("form").serialize();
                         console.log(responseRaw);
  		                   if (responseRaw.length < 8) {
                           $("#classifyError").show();
                         } else {
                           $("#classifyMoveon").unbind("click");
				                   //endTime = (new Date()).getTime(); 
				                   //trialparameters.q1rt = endTime - startTime;
				                   var response = responseRaw[0].split("=");
				                   var choice = nouns[parseInt(response[1])];
                           //Thanks!
                           $("#classification").show();
                           $("#classifyText").html("Thanks!");
                           $("#classifyText").show();
                           if (qNumber < nClassifications) {
                             experiment.classify('question', qNumber + 1);
                           } else {
                             experiment.target();
                           }
                         }
                       });
                     } else {
                       console.log('ERROR unrecognized input for variable '+
                                   '"stage" in function classify');
                     }
                   },
                   target: function() {
                     showSlide("target");
                     for (var i=0; i < 8; i++) {
                       var caseLabel = "sliderCase" + i;
                       var sliderLabel = "slider" + i;
                       $("#"+caseLabel).html('<div id="'+sliderLabel+' class="dragdealer"><div class="red-bar handle">drag me</div></div>');
                       var slider = new Dragdealer(sliderLabel);
                     }
                   }
                 };



//nArtifacts should be = distributions.length
//length of each distribution should be 20







