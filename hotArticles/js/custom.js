(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

app.component('prmBriefResultContainerAfter', {
  bindings: { parentCtrl: '<' },
  template: '<hot-articles parent-ctrl="$ctrl.parentCtrl" ng-if="$ctrl.parentCtrl.index === 3"></hot-articles>'
});
app.controller('hotArticlesController', ['HotArticlesService', 'angularLoad', function (HotArticlesService, angularLoad) {
  var vm = this;
  vm.ha = undefined;
  vm.frHa = undefined;

  vm.getHaFromServer = function () {
    HotArticlesService.getHA().then(function (response) {
      var frObject = {};
      frObject.featuedResultsItems = response.map(function (result) {
        return vm.createFeaturesResultsStructure(result);
      });
      frObject.moreTab = "remote";
      frObject.format = "thumbnails";
      frObject.searchLocations = "primo_central_multiple_fe";
      frObject.searchScopeSet = "like currently most used by bX";
      frObject.resourceType = "articles";
      console.log(frObject);
      vm.frHa = frObject;
      vm.ha = response;
    });
  };

  this.$onInit = function () {
    //vm.getHaFromServer();
    HotArticlesService.getHAFromFile("./inputBx.js");
  };

  vm.getHA = function () {
    return vm.ha;
  };
  vm.getFrHa = function () {
    return vm.frHa;
  };

  vm.createFeaturesResultsStructure = function (bxResponse) {
    var frObject = {
      isExpanded: false,
      recordId: bxResponse.bx_resourceID,
      originalBX: bxResponse,
      thumbnailLinks: [],
      generalData: bxResponse.bx_authorFullName,
      title: bxResponse.bx_jtitle + '/' + bxResponse.bx_atitle,
      type: "Article",
      nuiTitle: bxResponse.bx_jtitle + '/' + bxResponse.bx_atitl
    };
    return frObject;
  };
}]);

app.component('hotArticles', {
  bindings: { parentCtrl: '<' },
  controller: 'hotArticlesController',
  template: '\n <prm-featured-results ng-repeat-end class="bx-hot-articles-custom-featured-results"\n                                  [featured-results]="$ctrl.getFrHa()"\n                                  ng-if="$ctrl.getFrHa()"></prm-featured-results>'
});

app.service('HotArticlesService', ['restBaseURLs', '$http', '$location', 'angularLoad', '$sce', '$q', '$stateParams', function (restBaseURLs, $http, $location, angularLoad, $sce, $q, $stateParams) {
  var vm = this;

  vm.getHAFromFile = function (file) {
    $http.get(file).then(function (json) {
      json.map(function (record) {
        console.log(record.atitle + '&&&&&');
      });
    });
  };
  vm.getHAFromServer = function () {

    return $q(function (resolve, reject) {
      var params = {
        'format': 'json',
        'token': 'primo-generic'
      };

      var url = 'http://rendertron01.poc.pmt.dc05.hosted.exlibrisgroup.com:3001';

      var conf = {
        url: url,
        method: 'GET',
        skipAuthorization: true,
        params: params,
        headers: {
          'Authorization': 'a',
          'Target-URL': 'http://bx.ha.service.exlibrisgroup.com/service/hotarticles'
        }
      };
      var haPromise = $http(conf).then(function (response) {
        console.log(response.data);
        resolve(response.data);
      });
    });
  };
}]);
[{
  "Atitle": "Preventing a covid-19 pandemic",
  "DOI": "10.1136/bmj.m810",
  "Count": 356
}, {
  "Atitle": "Timely research papers about COVID-19 in China",
  "DOI": "10.1016/S0140-6736(20)30375-5",
  "Count": 344
}, {
  "Atitle": "COVID-19: fighting panic with information",
  "DOI": "10.1016/S0140-6736(20)30379-2",
  "Count": 301
}, {
  "Atitle": "Presumed Asymptomatic Carrier Transmission of COVID-19",
  "DOI": "10.1001/jama.2020.2565",
  "Count": 300
}, {
  "Atitle": "Clinical features of patients infected with 2019 novel coronavirus in Wuhan, China",
  "DOI": "10.1016/S0140-6736(20)30183-5",
  "Count": 255
}, {
  "Atitle": "COVID-19: too little, too late?",
  "DOI": "10.1016/S0140-6736(20)30522-5",
  "Count": 245
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus as an agent of emerging and reemerging infection",
  "DOI": "10.1128/CMR.00023-07",
  "Count": 232
}, {
  "Atitle": "Going viral � Covid-19 impact assessment: A perspective beyond clinical practice",
  "DOI": "10.4103/jmms.jmms_12_20",
  "Count": 209
}, {
  "Atitle": "Challenges presented by MERS corona virus, and SARS corona virus to global health",
  "DOI": "10.1016/j.sjbs.2016.02.019",
  "Count": 208
}, {
  "Atitle": "COVID-19: time for WHO to reconsider its stance towards Taiwan",
  "DOI": "10.1038/d41586-020-00693-2",
  "Count": 201
}, {
  "Atitle": "Dysregulation of immune response in patients with COVID-19 in Wuhan, China",
  "DOI": "10.1093/cid/ciaa248",
  "Count": 182
}, {
  "Atitle": "First Pediatric Case of Coronavirus Disease 2019 in Korea",
  "DOI": "10.3346/jkms.2020.35.e124",
  "Count": 161
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID?19: What we know?",
  "DOI": "10.1002/jmv.25766",
  "Count": 156
}, {
  "Atitle": "COVID-19: what is next for public health?",
  "DOI": "10.1016/S0140-6736(20)30374-3",
  "Count": 148
}, {
  "Atitle": "Clinical Characteristics of 138 Hospitalized Patients With 2019 Novel Coronavirus-Infected Pneumonia in Wuhan, China",
  "DOI": "10.1001/jama.2020.1585",
  "Count": 141
}, {
  "Atitle": "From Containment to Mitigation of COVID-19 in the US",
  "DOI": "10.1001/jama.2020.3882",
  "Count": 138
}, {
  "Atitle": "Supporting the Health Care Workforce During the COVID-19 Global Epidemic",
  "DOI": "10.1001/jama.2020.3972",
  "Count": 137
}, {
  "Atitle": "Rational use of face masks in the COVID-19 pandemic",
  "DOI": "10.1016/S2213-2600(20)30134-X",
  "Count": 137
}, {
  "Atitle": "Protecting Health Care Workers during the COVID-19 Coronavirus Outbreak -Lessons from Taiwan's SARS response",
  "DOI": "10.1093/cid/ciaa255",
  "Count": 136
}, {
  "Atitle": "Intubation and Ventilation amid the COVID-19 Outbreak: Wuhan's Experience",
  "DOI": "10.1097/ALN.0000000000003296",
  "Count": 133
}, {
  "Atitle": "Of chloroquine and COVID-19",
  "DOI": "10.1016/j.antiviral.2020.104762",
  "Count": 118
}, {
  "Atitle": "Care for Critically Ill Patients With COVID-19",
  "DOI": "10.1001/jama.2020.3633",
  "Count": 114
}, {
  "Atitle": "Hydroxychloroquine and azithromycin as a treatment of COVID-19: results of an open-label non-randomized clinical trial",
  "DOI": "10.1016/j.ijantimicag.2020.105949",
  "Count": 113
}, {
  "Atitle": "Diagnostic Value of Chest CT in Coronavirus Disease 2019 (COVID-19",
  "DOI": "10.2174/1573405616999200320163751",
  "Count": 113
}, {
  "Atitle": "COVID-19 Infection: Implications for Perioperative and Critical Care Physicians",
  "DOI": "10.1097/ALN.0000000000003303",
  "Count": 112
}, {
  "Atitle": "Case-Fatality Rate and Characteristics of Patients Dying in Relation to COVID-19 in Italy",
  "DOI": "10.1001/jama.2020.4683",
  "Count": 110
}, {
  "Atitle": "Anti-HCV, nucleotide inhibitors, repurposing against COVID-19",
  "DOI": "10.1016/j.lfs.2020.117477",
  "Count": 106
}, {
  "Atitle": "Indirect Virus Transmission in Cluster of COVID-19 Cases, Wenzhou, China, 2020",
  "DOI": "10.3201/eid2606.200412",
  "Count": 102
}, {
  "Atitle": "Identification of Coronavirus Isolated from a Patient in Korea with COVID-19",
  "DOI": "10.24171/j.phrp.2020.11.1.02",
  "Count": 93
}, {
  "Atitle": "Breakthrough: Chloroquine phosphate has shown apparent efficacy in treatment of COVID-19 associated pneumonia in clinical studies",
  "DOI": "10.5582/bst.2020.01047",
  "Count": 93
}, {
  "Atitle": "Could chloroquine /hydroxychloroquine be harmful in Coronavirus Disease 2019 (COVID-19 treatment?",
  "DOI": "10.1093/cid/ciaa321",
  "Count": 90
}, {
  "Atitle": "What are the risks of COVID-19 infection in pregnant women?",
  "DOI": "10.1016/S0140-6736(20)30365-2",
  "Count": 89
}, {
  "Atitle": "Case-Fatality Risk Estimates for COVID-19 Calculated by Using a Lag Time for Fatality",
  "DOI": "10.3201/eid2606.200320",
  "Count": 87
}, {
  "Atitle": "Treating COVID-19-Off-Label Drug Use, Compassionate Use, and Randomized Clinical Trials During Pandemics",
  "DOI": "10.1001/jama.2020.4742",
  "Count": 86
}, {
  "Atitle": "In Vitro Antiviral Activity and Projection of Optimized Dosing Design of Hydroxychloroquine for the Treatment of Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2",
  "DOI": "10.1093/cid/ciaa237",
  "Count": 81
}, {
  "Atitle": "Proposed protocol to keep COVID-19 out of hospitals",
  "DOI": "10.1503/cmaj.1095852",
  "Count": 80
}, {
  "Atitle": "Prevention Is Better Than the Cure: Risk Management of COVID-19",
  "DOI": "10.3390/jrfm13030046",
  "Count": 79
}, {
  "Atitle": "Epidemiology of 2019 Novel Coronavirus Disease-19 in Gansu Province, China, 2020",
  "DOI": "10.3201/eid2606.200251",
  "Count": 76
}, {
  "Atitle": "COVID-19 and Angiotensin-Converting Enzyme Inhibitors and Angiotensin Receptor Blockers: What Is the Evidence?",
  "DOI": "10.1001/jama.2020.4812",
  "Count": 71
}, {
  "Atitle": "The origin, transmission and clinical therapies on coronavirus disease 2019 (COVID-19 outbreak - an update on the status",
  "DOI": "10.1186/s40779-020-00240-0",
  "Count": 71
}, {
  "Atitle": "Clinical characteristics and intrauterine vertical transmission potential of COVID-19 infection in nine pregnant women: a retrospective review of medical records",
  "DOI": "10.1016/S0140-6736(20)30360-3",
  "Count": 69
}, {
  "Atitle": "Covid-19: a digital epidemic",
  "DOI": "10.1136/bmj.m764",
  "Count": 69
}, {
  "Atitle": "Induction of pro-inflammatory cytokines (IL-1 and IL-6 and lung inflammation by Coronavirus-19 (COVI-19 or SARS-CoV-2: anti-inflammatory strategies",
  "DOI": "10.23812/CONTI-E",
  "Count": 69
}, {
  "Atitle": "Chloroquine and hydroxychloroquine as available weapons to fight COVID-19",
  "DOI": "10.1016/j.ijantimicag.2020.105932",
  "Count": 68
}, {
  "Atitle": "Immediate Psychological Responses and Associated Factors during the Initial Stage of the 2019 Coronavirus Disease (COVID-19 Epidemic among the General Population in China",
  "DOI": "10.3390/ijerph17051729",
  "Count": 68
}, {
  "Atitle": "Phase-adjusted estimation of the number of Coronavirus Disease 2019 cases in Wuhan, China",
  "DOI": "10.1038/s41421-020-0148-0",
  "Count": 67
}, {
  "Atitle": "Virtually Perfect? Telemedicine for Covid-19",
  "DOI": "10.1056/NEJMp2003539",
  "Count": 66
}, {
  "Atitle": "Characteristics of and Important Lessons From the Coronavirus Disease 2019 (COVID-19 Outbreak in China: Summary of a Report of 72 314 Cases From the Chinese Center for Disease Control and Prevention",
  "DOI": "10.1001/jama.2020.2648",
  "Count": 65
}, {
  "Atitle": "A Review of Coronavirus Disease-2019 (COVID-19",
  "DOI": "10.1007/s12098-020-03263-6",
  "Count": 65
}, {
  "Atitle": "The Battle Against COVID-19: Where Do We Stand Now?",
  "DOI": "10.30476/ijms.2020.46357",
  "Count": 64
}, {
  "Atitle": "Diarrhoea may be underestimated: a missing link in 2019 novel coronavirus",
  "DOI": "10.1136/gutjnl-2020-320832",
  "Count": 63
}, {
  "Atitle": "In vitro inhibition of severe acute respiratory syndrome coronavirus by chloroquine",
  "DOI": "10.1016/j.bbrc.2004.08.085",
  "Count": 62
}, {
  "Atitle": "Epidemiological and clinical characteristics of 99 cases of 2019 novel coronavirus pneumonia in Wuhan, China: a descriptive study",
  "DOI": "10.1016/S0140-6736(20)30211-7",
  "Count": 61
}, {
  "Atitle": "Remdesivir and chloroquine effectively inhibit the recently emerged novel coronavirus (2019-nCoV in vitro",
  "DOI": "10.1038/s41422-020-0282-0",
  "Count": 61
}, {
  "Atitle": "The COVID-19 epidemic",
  "DOI": "10.1111/tmi.13383",
  "Count": 60
}, {
  "Atitle": "Covid-19: European drugs agency to review safety of ibuprofen",
  "DOI": "10.1136/bmj.m1168",
  "Count": 60
}, {
  "Atitle": "The history and epidemiology of Middle East respiratory syndrome corona virus",
  "DOI": "10.1186/s40248-017-0101-8",
  "Count": 59
}, {
  "Atitle": "Antiviral activity of Sambucus FormosanaNakai ethanol extract and related phenolic acid constituents against human coronavirus NL63",
  "DOI": "10.1016/j.virusres.2019.197767",
  "Count": 58
}, {
  "Atitle": "Clinical observation and management of COVID-19 patients",
  "DOI": "10.1080/22221751.2020.1741327",
  "Count": 58
}, {
  "Atitle": "A systematic review of lopinavir therapy for SARS coronavirus and MERS coronavirusA possible reference for coronavirus disease?19 treatment option",
  "DOI": "10.1002/jmv.25729",
  "Count": 57
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2 and corona virus disease-2019 (COVID-19: the epidemic and the challenges",
  "DOI": "10.1016/j.ijantimicag.2020.105924",
  "Count": 57
}, {
  "Atitle": "A systematic review on the efficacy and safety of chloroquine for the treatment of COVID-19",
  "DOI": "10.1016/j.jcrc.2020.03.005",
  "Count": 57
}, {
  "Atitle": "Novel coronavirus: From discovery to clinical diagnostics",
  "DOI": "10.1016/j.meegid.2020.104211",
  "Count": 57
}, {
  "Atitle": "The Incubation Period of Coronavirus Disease 2019 (COVID-19 From Publicly Reported Confirmed Cases: Estimation and Application",
  "DOI": "10.7326/M20-0504",
  "Count": 57
}, {
  "Atitle": "COVID-19: Lessons from SARS and MERS",
  "DOI": "10.1002/eji.202070035",
  "Count": 56
}, {
  "Atitle": "Chloroquine for the 2019 novel coronavirus SARS-CoV-2",
  "DOI": "10.1016/j.ijantimicag.2020.105923",
  "Count": 56
}, {
  "Atitle": "Covid-19: hoarding and misuse of protective gear is jeopardising the response, WHO warns",
  "DOI": "10.1136/bmj.m869",
  "Count": 56
}, {
  "Atitle": "Q&A: The�novel coronavirus outbreak�causing COVID-19",
  "DOI": "10.1186/s12916-020-01533-w",
  "Count": 54
}, {
  "Atitle": "Full-genome evolutionary analysis of the novel corona virus (2019-nCoV rejects the hypothesis of emergence as a result of a recent recombination event",
  "DOI": "10.1016/j.meegid.2020.104212",
  "Count": 52
}, {
  "Atitle": "Estimating Risk for Death from 2019 Novel Coronavirus Disease, China, January-February 2020",
  "DOI": "10.3201/eid2606.200233",
  "Count": 51
}, {
  "Atitle": "The Novel Coronavirus Outbreak: What We Know and What We Don�t",
  "DOI": "10.1016/j.cell.2020.02.027",
  "Count": 50
}, {
  "Atitle": "The epidemiology and pathogenesis of coronavirus disease (COVID-19 outbreak",
  "DOI": "10.1016/j.jaut.2020.102433",
  "Count": 49
}, {
  "Atitle": "Should COVID-19 Concern Nephrologists? Why and to What Extent? The Emerging Impasse of Angiotensin Blockade",
  "DOI": "10.1159/000507305",
  "Count": 49
}, {
  "Atitle": "Trainees and covid-19: your questions answered",
  "DOI": "10.1136/bmj.m1059",
  "Count": 47
}, {
  "Atitle": "Risk Factors Associated With Acute Respiratory Distress Syndrome and Death in Patients With Coronavirus Disease 2019 Pneumonia in Wuhan, China",
  "DOI": "10.1001/jamainternmed.2020.0994",
  "Count": 46
}, {
  "Atitle": "A familial cluster of pneumonia associated with the 2019 novel coronavirus indicating person-to-person transmission: a study of a family cluster",
  "DOI": "10.1016/S0140-6736(20)30154-9",
  "Count": 45
}, {
  "Atitle": "COVID-19: the gendered impacts of the outbreak",
  "DOI": "10.1016/S0140-6736(20)30526-2",
  "Count": 45
}, {
  "Atitle": "Epidemiology, causes, clinical manifestation and diagnosis, prevention and control of coronavirus disease (COVID-19 during the early outbreak period: a scoping review",
  "DOI": "10.1186/s40249-020-00646-x",
  "Count": 45
}, {
  "Atitle": "Case of the Index Patient Who Caused Tertiary Transmission of Coronavirus Disease 2019 in Korea: the Application of Lopinavir/Ritonavir for the Treatment of COVID-19 Pneumonia Monitored by Quantitative RT-PCR",
  "DOI": "10.3346/jkms.2020.35.e79",
  "Count": 45
}, {
  "Atitle": "Isolation, quarantine, social distancing and community containment: pivotal role for old-style public health measures in the novel coronavirus (2019-nCoV outbreak",
  "DOI": "10.1093/jtm/taaa020",
  "Count": 44
}, {
  "Atitle": "Understanding of COVID-19 based on current evidence",
  "DOI": "10.1002/jmv.25722",
  "Count": 43
}, {
  "Atitle": "Aminoquinolines Against Coronavirus Disease 2019 (COVID-19: Chloroquine or Hydroxychloroquine",
  "DOI": "10.1016/j.ijantimicag.2020.105945",
  "Count": 43
}, {
  "Atitle": "'No one is allowed out': your stories from the coronavirus outbreak",
  "DOI": "10.1038/d41586-020-00478-7",
  "Count": 43
}, {
  "Atitle": "Novel corona virus disease (COVID-19 in pregnancy: What clinical recommendations to follow?",
  "DOI": "10.1111/aogs.13836",
  "Count": 43
}, {
  "Atitle": "Novel Coronavirus (COVID?19 Epidemic: What Are the Risks for Older Patients?",
  "DOI": "10.1111/jgs.16407",
  "Count": 43
}, {
  "Atitle": "Severe Acute Respiratory Syndrome Coronavirus 2 from Patient with 2019 Novel Coronavirus Disease, United States",
  "DOI": "10.3201/eid2606.200516",
  "Count": 43
}, {
  "Atitle": "COVID-19 pandemic: triage for intensive-care treatment under resource scarcity",
  "DOI": "10.4414/smw.2020.20229",
  "Count": 43
}, {
  "Atitle": "The Coronavirus Disease 2019 (COVID-19",
  "DOI": "10.3928/19382359-20200219-01",
  "Count": 42
}, {
  "Atitle": "The psychological impact of the COVID-19 epidemic on college students in China",
  "DOI": "10.1016/j.psychres.2020.112934",
  "Count": 41
}, {
  "Atitle": "Indian pharma threatened by COVID-19 shutdowns in China",
  "DOI": "10.1016/S0140-6736(20)30459-1",
  "Count": 41
}, {
  "Atitle": "Planning and provision of ECMO services for severe ARDS during the COVID-19 pandemic and other outbreaks of emerging infectious diseases",
  "DOI": "10.1016/S2213-2600(20)30121-1",
  "Count": 41
}, {
  "Atitle": "History in a Crisis - Lessons for Covid-19",
  "DOI": "10.1056/NEJMp2004361",
  "Count": 41
}, {
  "Atitle": "COVID-19: a recommendation to examine the effect of hydroxychloroquine in preventing infection and progression",
  "DOI": "10.1093/jac/dkaa114",
  "Count": 41
}, {
  "Atitle": "Covid-19: roundup of latest news",
  "DOI": "10.1136/bmj.m969",
  "Count": 41
}, {
  "Atitle": "Expert consensus on chloroquine phosphate for the treatment of novel coronavirus pneumonia",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.03.009",
  "Count": 41
}, {
  "Atitle": "The 2019?new coronavirus epidemic: Evidence for virus evolution",
  "DOI": "10.1002/jmv.25688",
  "Count": 40
}, {
  "Atitle": "COVID-19 - the role of mass gatherings",
  "DOI": "10.1016/j.tmaid.2020.101617",
  "Count": 40
}, {
  "Atitle": "Persistence of coronaviruses on inanimate surfaces and their inactivation with biocidal agents",
  "DOI": "10.1016/j.jhin.2020.01.022",
  "Count": 39
}, {
  "Atitle": "Discovering drugs to treat coronavirus disease 2019 (COVID-19",
  "DOI": "10.5582/ddt.2020.01012",
  "Count": 39
}, {
  "Atitle": "Can Chinese Medicine Be Used for Prevention of Corona Virus Disease 2019 (COVID-19? A Review of Historical Classics, Research Evidence and Current Prevention Programs",
  "DOI": "10.1007/s11655-020-3192-6",
  "Count": 38
}, {
  "Atitle": "New insights on the antiviral effects of chloroquine against coronavirus: what to expect for COVID-19?",
  "DOI": "10.1016/j.ijantimicag.2020.105938",
  "Count": 38
}, {
  "Atitle": "Characteristics of COVID-19 infection in Beijing",
  "DOI": "10.1016/j.jinf.2020.02.018",
  "Count": 38
}, {
  "Atitle": "Characterization of a novel coronavirus associated with severe acute respiratory syndrome",
  "DOI": "10.1126/science.1085952",
  "Count": 38
}, {
  "Atitle": "Detection of Covid-19 in Children in Early January 2020 in Wuhan, China",
  "DOI": "10.1056/NEJMc2003717",
  "Count": 37
}, {
  "Atitle": "Vitamin C and SARS coronavirus",
  "DOI": "10.1093/jac/dkh002",
  "Count": 37
}, {
  "Atitle": "Expert Recommendations for Tracheal Intubation in Critically ill Patients with Noval Coronavirus Disease 2019",
  "DOI": "10.24920/003724",
  "Count": 37
}, {
  "Atitle": "Updates on Wuhan 2019 novel coronavirus epidemic",
  "DOI": "10.1002/jmv.25695",
  "Count": 36
}, {
  "Atitle": "Potential interventions for novel coronavirus in China: A systematic review",
  "DOI": "10.1002/jmv.25707",
  "Count": 36
}, {
  "Atitle": "Prevalence and impact of cardiovascular metabolic diseases on COVID-19 in China",
  "DOI": "10.1007/s00392-020-01626-9",
  "Count": 36
}, {
  "Atitle": "The novel Chinese coronavirus (2019?nCoV infections: Challenges for fighting the storm",
  "DOI": "10.1111/eci.13209",
  "Count": 36
}, {
  "Atitle": "Estimated effectiveness of symptom and risk screening to prevent the spread of COVID-19",
  "DOI": "10.7554/eLife.55570",
  "Count": 36
}, {
  "Atitle": "A review of the 2019 Novel Coronavirus (COVID-19 based on current evidence",
  "DOI": "10.1016/j.ijantimicag.2020.105948",
  "Count": 35
}, {
  "Atitle": "COVID-19: Not a Simple Public Health Emergency",
  "DOI": "10.1017/S1049023X2000031X",
  "Count": 35
}, {
  "Atitle": "Novel Coronavirus disease 2019 (COVID-19: The importance of recognising possible early ocular manifestation and using protective eyewear",
  "DOI": "10.1136/bjophthalmol-2020-315994",
  "Count": 35
}, {
  "Atitle": "Video consultations for covid-19",
  "DOI": "10.1136/bmj.m998",
  "Count": 35
}, {
  "Atitle": "Estimating the asymptomatic proportion of coronavirus disease 2019 (COVID-19 cases on board the Diamond Princess cruise ship, Yokohama, Japan, 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.10.2000180",
  "Count": 35
}, {
  "Atitle": "COVID-19 and Angiotensin-Converting Enzyme Inhibitors and Angiotensin Receptor Blockers",
  "DOI": "10.1001/jama.2020.4812",
  "Count": 34
}, {
  "Atitle": "Are high-performing health systems resilient against the COVID-19 epidemic?",
  "DOI": "10.1016/S0140-6736(20)30551-1",
  "Count": 34
}, {
  "Atitle": "Clinical Characteristics of Coronavirus Disease 2019 in China",
  "DOI": "10.1056/NEJMoa2002032",
  "Count": 34
}, {
  "Atitle": "Covid-19: GPs call for same personal protective equipment as hospital doctors",
  "DOI": "10.1136/bmj.m1055",
  "Count": 34
}, {
  "Atitle": "Management of Critically Ill Adults With COVID-19",
  "DOI": "10.1001/jama.2020.4914",
  "Count": 33
}, {
  "Atitle": "Evaluation of coronavirus in tears and conjunctival secretions of patients with SARS-CoV-2 infection",
  "DOI": "10.1002/jmv.25725",
  "Count": 33
}, {
  "Atitle": "SARS-CoV-2 induced diarrhoea as onset symptom in patient with COVID-19",
  "DOI": "10.1136/gutjnl-2020-320891",
  "Count": 33
}, {
  "Atitle": "COVID-19 and smoking: A systematic review of the evidence",
  "DOI": "10.18332/tid/119324",
  "Count": 33
}, {
  "Atitle": "Preliminary Identification of Potential Vaccine Targets for the COVID-19 Coronavirus (SARS-CoV-2 Based on SARS-CoV Immunological Studies",
  "DOI": "10.3390/v12030254",
  "Count": 33
}, {
  "Atitle": "Coronavirus infections and immune responses",
  "DOI": "10.1002/jmv.25685",
  "Count": 32
}, {
  "Atitle": "Diagnosis, treatment, and prevention of 2019 novel coronavirus infection in children: experts' consensus statement",
  "DOI": "10.1007/s12519-020-00343-7",
  "Count": 32
}, {
  "Atitle": "A SARS-like cluster of circulating bat coronaviruses shows potential for human emergence",
  "DOI": "10.1038/nm.3985",
  "Count": 32
}, {
  "Atitle": "COVID-19 Incubation Period: An Update",
  "DOI": "10.1056/nejm-jw.NA51083",
  "Count": 32
}, {
  "Atitle": "A COVID-19 Transmission within a family cluster by presymptomatic infectors in China",
  "DOI": "10.1093/cid/ciaa316",
  "Count": 32
}, {
  "Atitle": "Interrupting transmission of COVID-19: lessons from containment efforts in Singapore",
  "DOI": "10.1093/jtm/taaa039",
  "Count": 32
}, {
  "Atitle": "On a knife�s edge of a COVID-19 pandemic: is containment still possible?",
  "DOI": "10.17061/phrp3012000",
  "Count": 32
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19 and Pregnancy: What obstetricians need to know",
  "DOI": "10.1016/j.ajog.2020.02.017",
  "Count": 31
}, {
  "Atitle": "Policies on the use of respiratory protection for hospital health workers to protect from coronavirus disease (COVID-19",
  "DOI": "10.1016/j.ijnurstu.2020.103567",
  "Count": 31
}, {
  "Atitle": "The Trial of Chloroquine in the Treatment of Corona Virus Disease 2019 (COVID-19 and Its Research Progress in Forensic Toxicology",
  "DOI": "10.12116/j.issn.1004-5619.2020.02.001",
  "Count": 31
}, {
  "Atitle": "An Analysis of 38 Pregnant Women with COVID-19, Their Newborn Infants, and Maternal-Fetal Transmission of SARS-CoV-2: Maternal Coronavirus Infections and Pregnancy Outcomes",
  "DOI": "10.5858/arpa.2020-0901-SA",
  "Count": 31
}, {
  "Atitle": "The transmission and diagnosis of 2019 novel coronavirus infection disease (COVID?19: A Chinese perspective",
  "DOI": "10.1002/jmv.25749",
  "Count": 30
}, {
  "Atitle": "World Health Organization declares global emergency: A review of the 2019 novel coronavirus (COVID-19",
  "DOI": "10.1016/j.ijsu.2020.02.034",
  "Count": 30
}, {
  "Atitle": "From SARS to COVID-19: A previously unknown SARS- related coronavirus (SARS-CoV-2 of pandemic potential infecting humans - Call for a One Health approach",
  "DOI": "10.1016/j.onehlt.2020.100124",
  "Count": 30
}, {
  "Atitle": "Insights from nanomedicine into chloroquine efficacy against COVID-19",
  "DOI": "10.1038/s41565-020-0674-9",
  "Count": 30
}, {
  "Atitle": "Treatment for severe acute respiratory distress syndrome from COVID-19",
  "DOI": "10.1016/S2213-2600(20)30127-2",
  "Count": 29
}, {
  "Atitle": "A tug-of-war between severe acute respiratory syndrome coronavirus 2 and host antiviral defence: lessons from other pathogenic viruses",
  "DOI": "10.1080/22221751.2020.1736644",
  "Count": 29
}, {
  "Atitle": "Eleven Faces of Coronavirus Disease 2019",
  "DOI": "10.1111/all.14289",
  "Count": 29
}, {
  "Atitle": "Updated understanding of the outbreak of 2019 novel coronavirus (2019?nCoV in Wuhan, China",
  "DOI": "10.1002/jmv.25689",
  "Count": 28
}, {
  "Atitle": "Coronaviruses and immunosuppressed patients. The facts during the third epidemic",
  "DOI": "10.1002/lt.25756",
  "Count": 28
}, {
  "Atitle": "Diagnosis and treatment recommendations for pediatric respiratory infection caused by the 2019 novel coronavirus",
  "DOI": "10.1007/s12519-020-00345-5",
  "Count": 28
}, {
  "Atitle": "A conceptual model for the coronavirus disease 2019 (COVID-19 outbreak in Wuhan, China with individual reaction and governmental action",
  "DOI": "10.1016/j.ijid.2020.02.058",
  "Count": 28
}, {
  "Atitle": "Evidence of the COVID-19 Virus Targeting the CNS: Tissue Distribution, Host-Virus Interaction, and Proposed Neurotropic Mechanisms",
  "DOI": "10.1021/acschemneuro.0c00122",
  "Count": 28
}, {
  "Atitle": "Recommendations for the admission of patients with COVID-19 to intensive care and intermediate care units (ICUs and IMCUs",
  "DOI": "10.4414/smw.2020.20227",
  "Count": 28
}, {
  "Atitle": "Air, Surface Environmental, and Personal Protective Equipment Contamination by Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2 From a Symptomatic Patient",
  "DOI": "10.1001/jama.2020.3227",
  "Count": 27
}, {
  "Atitle": "Clinical, laboratory and imaging features of COVID-19: A systematic review and meta-analysis",
  "DOI": "10.1016/j.tmaid.2020.101623",
  "Count": 27
}, {
  "Atitle": "What next for the coronavirus response?",
  "DOI": "10.1016/S0140-6736(20)30292-0",
  "Count": 27
}, {
  "Atitle": "SARS veterans tackle coronavirus",
  "DOI": "10.1038/490020a",
  "Count": 27
}, {
  "Atitle": "A pneumonia outbreak associated with a new coronavirus of probable bat origin",
  "DOI": "10.1038/s41586-020-2012-7",
  "Count": 27
}, {
  "Atitle": "Systematic review of COVID-19 in children show milder cases and a better prognosis than adults",
  "DOI": "10.1111/apa.15270",
  "Count": 27
}, {
  "Atitle": "Covid-19: preparedness, decentralisation, and the hunt for patient zero",
  "DOI": "10.1136/bmj.m799",
  "Count": 27
}, {
  "Atitle": "Coronavirus disease 2019 (covid-19: a guide for UK GPs",
  "DOI": "10.1136/bmj.m800",
  "Count": 27
}, {
  "Atitle": "Public Mental Health Crisis during COVID-19 Pandemic, China",
  "DOI": "10.3201/eid2607.200407",
  "Count": 27
}, {
  "Atitle": "Potential Maternal and Infant Outcomes from Coronavirus 2019-nCoV (SARS-CoV-2 Infecting Pregnant Women: Lessons from SARS, MERS, and Other Human Coronavirus Infections",
  "DOI": "10.3390/v12020194",
  "Count": 27
}, {
  "Atitle": "When COVID-19 encounters interstitial lung disease: challenges and management]",
  "DOI": "10.3760/cma.j.cn112147-20200315-00339",
  "Count": 27
}, {
  "Atitle": "The epidemiological characteristics of an outbreak of 2019 novel coronavirus diseases (COVID-19 in China]",
  "DOI": "10.3760/cma.j.issn.0254-6450.2020.02.003",
  "Count": 27
}, {
  "Atitle": "COVID-19 control in China during mass population movements at New Year",
  "DOI": "10.1016/S0140-6736(20)30421-9",
  "Count": 26
}, {
  "Atitle": "Keep up with the latest coronavirus research",
  "DOI": "10.1038/d41586-020-00694-1",
  "Count": 26
}, {
  "Atitle": "COVID-19 and Rationally Layered Social Distancing",
  "DOI": "10.1111/ijcp.13501",
  "Count": 26
}, {
  "Atitle": "The emergence of a novel coronavirus (SARS-CoV-2, their biology and therapeutic options",
  "DOI": "10.1128/JCM.00187-20",
  "Count": 26
}, {
  "Atitle": "Clinical findings in a group of patients infected with the 2019 novel coronavirus (SARS-Cov-2 outside of Wuhan, China: retrospective case series",
  "DOI": "10.1136/bmj.m606",
  "Count": 26
}, {
  "Atitle": "Review and Prospect of Pathological Features of Corona Virus Disease",
  "DOI": "10.12116/j.issn.1004-5619.2020.01.004",
  "Count": 26
}, {
  "Atitle": "Expert consensus on preventing nosocomial transmission during respiratory care for critically ill patients infected by 2019 novel coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.0020",
  "Count": 26
}, {
  "Atitle": "COVID-19 R0: Magic number or conundrum?",
  "DOI": "10.4081/idr.2020.8516",
  "Count": 26
}, {
  "Atitle": "COVID-19 infection and rheumatoid arthritis: Faraway, so close!",
  "DOI": "10.1016/j.autrev.2020.102523",
  "Count": 25
}, {
  "Atitle": "Do not violate the International Health Regulations during the COVID-19 outbreak",
  "DOI": "10.1016/S0140-6736(20)30373-1",
  "Count": 25
}, {
  "Atitle": "Viral dynamics in mild and severe cases of COVID-19",
  "DOI": "10.1016/S1473-3099(20)30232-2",
  "Count": 25
}, {
  "Atitle": "Timely mental health care for the 2019 novel coronavirus outbreak is urgently needed",
  "DOI": "10.1016/S2215-0366(20)30046-8",
  "Count": 25
}, {
  "Atitle": "Early Transmission Dynamics in Wuhan, China, of Novel Coronavirus-Infected Pneumonia",
  "DOI": "10.1056/NEJMoa2001316",
  "Count": 25
}, {
  "Atitle": "Profiling Early Humoral Response to Diagnose Novel Coronavirus Disease (COVID-19",
  "DOI": "10.1093/cid/ciaa310",
  "Count": 25
}, {
  "Atitle": "The SARS, MERS and novel coronavirus (COVID-19 epidemics, the newest and biggest global health threats: what lessons have we learned?",
  "DOI": "10.1093/ije/dyaa033",
  "Count": 25
}, {
  "Atitle": "Management strategy of oral mucosal diseases during the epidemic of Corona Virus Disease 2019",
  "DOI": "10.12016/j.issn.2096?1456.2020.03.008",
  "Count": 25
}, {
  "Atitle": "Natural small molecules as inhibitors of coronavirus lipid-dependent attachment to host cells: a possible strategy for reducing SARS-COV-2 infectivity?",
  "DOI": "10.23750/abm.v91i1.9402",
  "Count": 25
}, {
  "Atitle": "Rigidity of the outer shell predicted by a protein intrinsic disorder model sheds light on the COVID-19 (Wuhan-2019-nCoV infectivity",
  "DOI": "10.3390/biom10020331",
  "Count": 25
}, {
  "Atitle": "Drug treatment options for the 2019-new coronavirus (2019- nCoV",
  "DOI": "10.5582/bst.2020.01020",
  "Count": 25
}, {
  "Atitle": "COVID-19: consider cytokine storm syndromes and immunosuppression",
  "DOI": "10.1016/S0140-6736(20)30628-0",
  "Count": 24
}, {
  "Atitle": "COVID-19: protecting health-care workers",
  "DOI": "10.1016/S0140-6736(20)30644-9",
  "Count": 24
}, {
  "Atitle": "Are patients with hypertension and diabetes mellitus at increased risk for COVID-19 infection?",
  "DOI": "10.1016/S2213-2600(20)30116-8",
  "Count": 24
}, {
  "Atitle": "Public health: Broad reception for coronavirus",
  "DOI": "10.1038/495176a",
  "Count": 24
}, {
  "Atitle": "COVID-19: An Update on the Epidemiological, Clinical, Preventive and Therapeutic Evidence and Guidelines of Integrative Chinese-Western Medicine for the Management of 2019 Novel Coronavirus Disease",
  "DOI": "10.1142/S0192415X20500378",
  "Count": 24
}, {
  "Atitle": "New coronavirus pneumonia COVID-19 and ocular surface transmission",
  "DOI": "10.3980/j.issn.1672-5123.2020.3.01",
  "Count": 24
}, {
  "Atitle": "Estimating the reproductive number and the outbreak size of Novel Coronavirus disease (COVID-19 using mathematical model in Republic of Korea",
  "DOI": "10.4178/epih.e2020011",
  "Count": 24
}, {
  "Atitle": "Clinical Characteristics of Children with Coronavirus Disease 2019 in Hubei, China",
  "DOI": "10.1007/s11596-020-2172-6",
  "Count": 23
}, {
  "Atitle": "The spike glycoprotein of the new coronavirus 2019-nCoV contains a furin-like cleavage site absent in CoV of the same clade",
  "DOI": "10.1016/j.antiviral.2020.104742",
  "Count": 23
}, {
  "Atitle": "Estimation of the asymptomatic ratio of novel coronavirus infections (COVID-19",
  "DOI": "10.1016/j.ijid.2020.03.020",
  "Count": 23
}, {
  "Atitle": "Therapeutic options for the 2019 novel coronavirus (2019-nCoV",
  "DOI": "10.1038/d41573-020-00016-0",
  "Count": 23
}, {
  "Atitle": "Fair Allocation of Scarce Medical Resources in the Time of Covid-19",
  "DOI": "10.1056/NEJMsb2005114",
  "Count": 23
}, {
  "Atitle": "Covid-19: ibuprofen should not be used for managing symptoms, say doctors and scientists",
  "DOI": "10.1136/bmj.m1086",
  "Count": 23
}, {
  "Atitle": "CT Imaging and Differential Diagnosis of COVID-19",
  "DOI": "10.1177/0846537120913033",
  "Count": 23
}, {
  "Atitle": "Detection of Novel Coronavirus by RT-PCR in Stool Specimen from Asymptomatic Child, China",
  "DOI": "10.3201/eid2606.200301",
  "Count": 23
}, {
  "Atitle": "The clinical characteristics of pneumonia patients co-infected with 2019 novel coronavirus and influenza virus in Wuhan, China",
  "DOI": "10.1002/jmv.25781",
  "Count": 22
}, {
  "Atitle": "Nurses' experiences of care for patients with Middle East respiratory syndrome-coronavirus in South Korea",
  "DOI": "10.1016/j.ajic.2018.01.012",
  "Count": 22
}, {
  "Atitle": "Investigation of three clusters of COVID-19 in Singapore: implications for surveillance and response measures",
  "DOI": "10.1016/S0140-6736(20)30528-6",
  "Count": 22
}, {
  "Atitle": "Clinical course and risk factors for mortality of adult inpatients with COVID-19 in Wuhan, China: a retrospective cohort study",
  "DOI": "10.1016/S0140-6736(20)30566-3",
  "Count": 22
}, {
  "Atitle": "Fast, portable tests come online to curb coronavirus pandemic",
  "DOI": "10.1038/d41587-020-00010-2",
  "Count": 22
}, {
  "Atitle": "A new coronavirus associated with human respiratory disease in China",
  "DOI": "10.1038/s41586-020-2008-3",
  "Count": 22
}, {
  "Atitle": "SARS-Associated Coronavirus",
  "DOI": "10.1056/NEJMp030078",
  "Count": 22
}, {
  "Atitle": "Interplay between coronavirus, a cytoplasmic RNA virus, and nonsense-mediated mRNA decay pathway",
  "DOI": "10.1073/pnas.1811675115",
  "Count": 22
}, {
  "Atitle": "Covid-19 fatality is likely overestimated",
  "DOI": "10.1136/bmj.m1113",
  "Count": 22
}, {
  "Atitle": "Fear can be more harmful than the severe acute respiratory syndrome coronavirus 2 in controlling the corona virus disease 2019 epidemic",
  "DOI": "10.12998/wjcc.v8.i4.652",
  "Count": 22
}, {
  "Atitle": "Incubation Period and Other Epidemiological Characteristics of 2019 Novel Coronavirus Infections with Right Truncation: A Statistical Analysis of Publicly Available Case Data",
  "DOI": "10.3390/jcm9020538",
  "Count": 22
}, {
  "Atitle": "US emergency legal responses to novel coronavirus: balancing public health and civil liberties",
  "DOI": "10.1001/jama.2020.2025",
  "Count": 21
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19 in Italy",
  "DOI": "10.1001/jama.2020.4344",
  "Count": 21
}, {
  "Atitle": "The emotional impact of Coronavirus 2019-nCoV (new Coronavirus disease",
  "DOI": "10.1016/j.psychres.2020.112915",
  "Count": 21
}, {
  "Atitle": "Genomic characterisation and epidemiology of 2019 novel coronavirus: implications for virus origins and receptor binding",
  "DOI": "10.1016/S0140-6736(20)30251-8",
  "Count": 21
}, {
  "Atitle": "COVID-19, an emerging coronavirus infection: advances and prospects in designing and developing vaccines, immunotherapeutics, and therapeutics",
  "DOI": "10.1080/21645515.2020.1735227",
  "Count": 21
}, {
  "Atitle": "The pandemic of social media panic travels faster than the COVID-19 outbreak",
  "DOI": "10.1093/jtm/taaa031",
  "Count": 21
}, {
  "Atitle": "Coronavirus disease 2019: the harms of exaggerated information and non-evidence-based measures",
  "DOI": "10.1111/eci.13223",
  "Count": 21
}, {
  "Atitle": "The effect of travel restrictions on the spread of the 2019 novel coronavirus (COVID-19 outbreak",
  "DOI": "10.1126/science.aba9757",
  "Count": 21
}, {
  "Atitle": "Risk Assessment of Novel Coronavirus COVID-19 Outbreaks Outside China",
  "DOI": "10.3390/jcm9020571",
  "Count": 21
}, {
  "Atitle": "Characteristics and Outcomes of 21 Critically Ill Patients With COVID-19 in Washington State",
  "DOI": "10.1001/jama.2020.4326",
  "Count": 20
}, {
  "Atitle": "Expert consensus for managing pregnant women and neonates born to mothers with suspected or confirmed novel coronavirus (COVID-19 infection",
  "DOI": "10.1002/ijgo.13146",
  "Count": 20
}, {
  "Atitle": "The neuroinvasive potential of SARS-CoV2 may be at least partially responsible for the respiratory failure of COVID-19 patients",
  "DOI": "10.1002/jmv.25728",
  "Count": 20
}, {
  "Atitle": "Real estimates of mortality following COVID-19 infection",
  "DOI": "10.1016/S1473-3099(20)30195-X",
  "Count": 20
}, {
  "Atitle": "Coronavirus vaccines: five key questions as trials begin",
  "DOI": "10.1038/d41586-020-00798-8",
  "Count": 20
}, {
  "Atitle": "Isolation and characterization of a bat SARS-like coronavirus that uses the ACE2 receptor",
  "DOI": "10.1038/nature12711",
  "Count": 20
}, {
  "Atitle": "A Novel Coronavirus from Patients with Pneumonia in China, 2019",
  "DOI": "10.1056/NEJMoa2001017",
  "Count": 20
}, {
  "Atitle": "A case report of neonatal COVID-19 infection in China",
  "DOI": "10.1093/cid/ciaa225",
  "Count": 20
}, {
  "Atitle": "Misguided drug advice for COVID-19",
  "DOI": "10.1126/science.abb8034",
  "Count": 20
}, {
  "Atitle": "Coronavirus covid-19 has killed more people than SARS and MERS combined, despite lower case fatality rate",
  "DOI": "10.1136/bmj.m641",
  "Count": 20
}, {
  "Atitle": "Using public health law to contain the spread of COVID-19",
  "DOI": "10.12968/bjon.2020.29.5.326",
  "Count": 20
}, {
  "Atitle": "Point-of-Care Lung Ultrasound findings in novel coronavirus disease-19 pnemoniae: a case report and potential applications during COVID-19 outbreak",
  "DOI": "10.26355/eurrev_202003_20549",
  "Count": 20
}, {
  "Atitle": "COVID-19 in 2 Persons with Mild Upper Respiratory Symptoms on a Cruise Ship, Japan",
  "DOI": "10.3201/eid2606.200452",
  "Count": 20
}, {
  "Atitle": "Hospitals as health factories and the coronavirus epidemic",
  "DOI": "10.1007/s40620-020-00719-y",
  "Count": 19
}, {
  "Atitle": "Clinical characteristics and imaging manifestations of the 2019 novel coronavirus disease (COVID-19:A multi-center study in Wenzhou city, Zhejiang, China",
  "DOI": "10.1016/j.jinf.2020.02.016",
  "Count": 19
}, {
  "Atitle": "Clinical progression of patients with COVID-19 in Shanghai, China",
  "DOI": "10.1016/j.jinf.2020.03.004",
  "Count": 19
}, {
  "Atitle": "Statement in support of the scientists, public health professionals, and medical professionals of China combatting COVID-19",
  "DOI": "10.1016/S0140-6736(20)30418-9",
  "Count": 19
}, {
  "Atitle": "Mass gathering events and reducing further global spread of COVID-19: a political and public health dilemma",
  "DOI": "10.1016/S0140-6736(20)30681-4",
  "Count": 19
}, {
  "Atitle": "The novel coronavirus (COVID-2019 outbreak: Amplification of public health consequences by media exposure",
  "DOI": "10.1037/hea0000875",
  "Count": 19
}, {
  "Atitle": "Covid-19: What�s the current advice for UK doctors?",
  "DOI": "10.1136/bmj.m978",
  "Count": 19
}, {
  "Atitle": "Potential scenarios for the progression of a COVID-19 epidemic in the European Union and the European Economic Area, March 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.9.2000202",
  "Count": 19
}, {
  "Atitle": "Risk Management of COVID-19 by Universities in China",
  "DOI": "10.3390/jrfm13020036",
  "Count": 19
}, {
  "Atitle": "Early detection and disease assessment of patients with novel coronavirus pneumonia",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.03.003",
  "Count": 19
}, {
  "Atitle": "How Should U.S. Hospitals Prepare for Coronavirus Disease 2019 (COVID-19?",
  "DOI": "10.7326/M20-0907",
  "Count": 19
}, {
  "Atitle": "Association of Cardiac Injury With Mortality in Hospitalized Patients With COVID-19 in Wuhan, China",
  "DOI": "10.1001/jamacardio.2020.0950",
  "Count": 18
}, {
  "Atitle": "Analyzing the epidemiological outbreak of COVID-19: A visual exploratory data analysis approach",
  "DOI": "10.1002/jmv.25743",
  "Count": 18
}, {
  "Atitle": "Unique epidemiological and clinical features of the emerging 2019 novel coronavirus pneumonia (COVID?19 implicate special control measures",
  "DOI": "10.1002/jmv.25748",
  "Count": 18
}, {
  "Atitle": "Iranian mental health during the COVID-19 epidemic",
  "DOI": "10.1016/j.ajp.2020.101990",
  "Count": 18
}, {
  "Atitle": "First case of Coronavirus Disease 2019 (COVID-19 pneumonia in Taiwan",
  "DOI": "10.1016/j.jfma.2020.02.007",
  "Count": 18
}, {
  "Atitle": "Cardiac troponin I in patients with coronavirus disease 2019 (COVID-19: Evidence from a meta-analysis",
  "DOI": "10.1016/j.pcad.2020.03.001",
  "Count": 18
}, {
  "Atitle": "Audio Interview: Preparing for the Spread of Covid-19",
  "DOI": "10.1056/NEJMe2003319",
  "Count": 18
}, {
  "Atitle": "A comparative study on the clinical features of COVID-19 pneumonia to other pneumonias",
  "DOI": "10.1093/cid/ciaa247",
  "Count": 18
}, {
  "Atitle": "The reproductive number of COVID-19 is higher compared to SARS coronavirus",
  "DOI": "10.1093/jtm/taaa021",
  "Count": 18
}, {
  "Atitle": "X-ray Structure of Main Protease of the Novel Coronavirus SARS-CoV-2 Enables Design of ?-Ketoamide Inhibitors",
  "DOI": "10.1101/2020.02.17.952879",
  "Count": 18
}, {
  "Atitle": "Public responses to the novel 2019 coronavirus (2019?nCoV in Japan: mental health consequences and target populations",
  "DOI": "10.1111/pcn.12988",
  "Count": 18
}, {
  "Atitle": "Bats are natural reservoirs of SARS-like coronaviruses",
  "DOI": "10.1126/science.1118391",
  "Count": 18
}, {
  "Atitle": "Substantial undocumented infection facilitates the rapid dissemination of novel coronavirus (SARS-CoV2",
  "DOI": "10.1126/science.abb3221",
  "Count": 18
}, {
  "Atitle": "Covid-19: a puzzle with many missing pieces",
  "DOI": "10.1136/bmj.m627",
  "Count": 18
}, {
  "Atitle": "Emerging Coronavirus 2019-nCoV Pneumonia",
  "DOI": "10.1148/radiol.2020200274",
  "Count": 18
}, {
  "Atitle": "Evaluation of a quantitative RT-PCR assay for the detection of the emerging coronavirus SARS-CoV-2 using a high throughput system",
  "DOI": "10.2807/1560-7917.ES.2020.25.9.2000152",
  "Count": 18
}, {
  "Atitle": "Identifying Locations with Possible Undetected Imported Severe Acute Respiratory Syndrome Coronavirus 2 Cases by Using Importation Predictions",
  "DOI": "10.3201/eid2607.200250",
  "Count": 18
}, {
  "Atitle": "Infants Born to Mothers With a New Coronavirus (COVID-19",
  "DOI": "10.3389/fped.2020.00104",
  "Count": 18
}, {
  "Atitle": "COVID-19 pandemic: palliative care for elderly and frail patients at home and in residential and nursing homes",
  "DOI": "10.4414/smw.2020.20235",
  "Count": 18
}, {
  "Atitle": "What we know so far: COVID-19 current clinical knowledge and research",
  "DOI": "10.7861/clinmed.2019-coron",
  "Count": 18
}, {
  "Atitle": "Critical Care Utilization for the COVID-19 Outbreak in Lombardy, Italy: Early Experience and Forecast During an Emergency Response",
  "DOI": "10.1001/jama.2020.4031",
  "Count": 17
}, {
  "Atitle": "The outbreak of Coronavirus Disease 2019 (COVID-19-An emerging global health threat",
  "DOI": "10.1016/j.jiph.2020.02.033",
  "Count": 17
}, {
  "Atitle": "Asymptomatic Middle East Respiratory Syndrome Coronavirus (MERS-CoV infection: Extent and implications for infection control: A systematic review",
  "DOI": "10.1016/j.tmaid.2018.12.003",
  "Count": 17
}, {
  "Atitle": "The race to unravel the biggest coronavirus outbreak in the United States",
  "DOI": "10.1038/d41586-020-00676-3",
  "Count": 17
}, {
  "Atitle": "A Trial of Lopinavir-Ritonavir in Adults Hospitalized with Severe Covid-19",
  "DOI": "10.1056/NEJMoa2001282",
  "Count": 17
}, {
  "Atitle": "Structure of SARS coronavirus spike receptor-binding domain complexed with receptor",
  "DOI": "10.1126/science.1116480",
  "Count": 17
}, {
  "Atitle": "COVID-19: Knowns, Unknowns, and Questions",
  "DOI": "10.1128/mSphere.00203-20",
  "Count": 17
}, {
  "Atitle": "Covid-19: experts question analysis suggesting half UK population has been infected",
  "DOI": "10.1136/bmj.m1216",
  "Count": 17
}, {
  "Atitle": "The convalescent sera option for containing COVID-19",
  "DOI": "10.1172/JCI138003",
  "Count": 17
}, {
  "Atitle": "First two�months of the 2019 Coronavirus Disease (COVID-19 epidemic in China: real-time surveillance and evaluation with a second derivative model",
  "DOI": "10.1186/s41256-020-00137-4",
  "Count": 17
}, {
  "Atitle": "Suspending Classes Without Stopping Learning: China�s Education Emergency Management Policy in the COVID-19 Outbreak",
  "DOI": "10.3390/jrfm13030055",
  "Count": 17
}, {
  "Atitle": "National Institute for the Infectious Diseases �L. Spallanzani�, IRCCS. Recommendations for COVID-19 Clinical Management",
  "DOI": "10.4081/idr.2020.8543",
  "Count": 17
}, {
  "Atitle": "Global epidemiology of coronavirus disease 2019: disease incidence, daily cumulative index, mortality, and their association with country healthcare resources and economic status",
  "DOI": "10.1016/j.ijantimicag.2020.105946",
  "Count": 16
}, {
  "Atitle": "Are children less susceptible to COVID-19?",
  "DOI": "10.1016/j.jmii.2020.02.011",
  "Count": 16
}, {
  "Atitle": "Clinical characteristics of novel coronavirus disease 2019 (COVID-19 in newborns, infants and children",
  "DOI": "10.1016/j.pedneo.2020.03.001",
  "Count": 16
}, {
  "Atitle": "Escalating infection control response to the rapidly evolving epidemiology of the Coronavirus disease 2019 (COVID-19 due to SARS-CoV-2 in Hong Kong",
  "DOI": "10.1017/ice.2020.58",
  "Count": 16
}, {
  "Atitle": "Human coronavirus NL63 employs the severe acute respiratory syndrome coronavirus receptor for cellular entry.(MICROBIOLOGY(Author Abstract",
  "DOI": "10.1073/pnas.0409465102",
  "Count": 16
}, {
  "Atitle": "Epidemiological and Clinical Predictors of COVID-19",
  "DOI": "10.1093/cid/ciaa322",
  "Count": 16
}, {
  "Atitle": "Emerging diseases. New coronavirus reveals some of its secrets",
  "DOI": "10.1126/science.340.6128.17",
  "Count": 16
}, {
  "Atitle": "Budgeting for covid-19: changing the narrative and narrating the change",
  "DOI": "10.1136/bmj.m1053",
  "Count": 16
}, {
  "Atitle": "Covid-19: are we getting the communications right?",
  "DOI": "10.1136/bmj.m919",
  "Count": 16
}, {
  "Atitle": "Covid-19: emergency departments lack proper isolation facilities, senior medic warns",
  "DOI": "10.1136/bmj.m953",
  "Count": 16
}, {
  "Atitle": "Immune responses in COVID-19 and potential vaccines: Lessons learned from SARS and MERS epidemic",
  "DOI": "10.12932/AP-200220-0772",
  "Count": 16
}, {
  "Atitle": "Epidemiological Characteristics of 2143 Pediatric Patients With 2019 Coronavirus Disease in China",
  "DOI": "10.1542/peds.2020-0702",
  "Count": 16
}, {
  "Atitle": "Rapid establishment of laboratory diagnostics for the novel coronavirus SARS-CoV-2 in Bavaria, Germany, February 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.9.2000173",
  "Count": 16
}, {
  "Atitle": "Inhibitors of RAS Might Be a Good Choice for the Therapy of COVID-19 Pneumonia",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.03.016",
  "Count": 16
}, {
  "Atitle": "An interim review of the epidemiological characteristics of 2019 novel coronavirus",
  "DOI": "10.4178/epih.e2020006",
  "Count": 16
}, {
  "Atitle": "How Is the World Responding to the 2019 Coronavirus Disease Compared with the 2014 West African Ebola Epidemic? The Importance of China as a Player in the Global Economy",
  "DOI": "10.4269/ajtmh.20-0135",
  "Count": 16
}, {
  "Atitle": "Characteristics of and Important Lessons From the Coronavirus Disease 2019 (COVID-19 Outbreak in China",
  "DOI": "10.1001/jama.2020.2648",
  "Count": 15
}, {
  "Atitle": "Ethics Committee Reviews of Applications for Research Studies at 1 Hospital in China During the 2019 Novel Coronavirus Epidemic",
  "DOI": "10.1001/jama.2020.4362",
  "Count": 15
}, {
  "Atitle": "Social Media and Emergency Preparedness in Response to Novel Coronavirus",
  "DOI": "10.1001/jama.2020.4469",
  "Count": 15
}, {
  "Atitle": "Factors Associated With Mental Health Outcomes Among Health Care Workers Exposed to Coronavirus Disease 2019",
  "DOI": "10.1001/jamanetworkopen.2020.3976",
  "Count": 15
}, {
  "Atitle": "Emerging coronaviruses: Genome structure, replication, and pathogenesis",
  "DOI": "10.1002/jmv.25681",
  "Count": 15
}, {
  "Atitle": "Cross?species transmission of the newly identified coronavirus 2019?nCoV",
  "DOI": "10.1002/jmv.25682",
  "Count": 15
}, {
  "Atitle": "Coronavirus disease (COVID?19 and neonate: What neonatologist need to know",
  "DOI": "10.1002/jmv.25740",
  "Count": 15
}, {
  "Atitle": "Transmission dynamics of the COVID-19 outbreak and effectiveness of government interventions: A data-driven analysis",
  "DOI": "10.1002/jmv.25750",
  "Count": 15
}, {
  "Atitle": "Clinical Features and Treatment of COVID-19 Patients in Northeast Chongqing",
  "DOI": "10.1002/jmv.25783",
  "Count": 15
}, {
  "Atitle": "Coronavirus in pregnancy and delivery: rapid review",
  "DOI": "10.1002/uog.22014",
  "Count": 15
}, {
  "Atitle": "Isolation and identification of human coronavirus 229E from frequently touched environmental surfaces of a university classroom that is cleaned daily",
  "DOI": "10.1016/j.ajic.2017.07.014",
  "Count": 15
}, {
  "Atitle": "Comprehensive analysis for diagnosis of novel coronavirus disease (COVID-19 infection",
  "DOI": "10.1016/j.jinf.2020.03.016",
  "Count": 15
}, {
  "Atitle": "Genetic evolution analysis of 2019 novel coronavirus and coronavirus from other species",
  "DOI": "10.1016/j.meegid.2020.104285",
  "Count": 15
}, {
  "Atitle": "Preparedness and vulnerability of African countries against importations of COVID-19: a modelling study",
  "DOI": "10.1016/S0140-6736(20)30411-6",
  "Count": 15
}, {
  "Atitle": "How will country-based mitigation measures influence the course of the COVID-19 epidemic'",
  "DOI": "10.1016/S0140-6736(20)30567-5",
  "Count": 15
}, {
  "Atitle": "Coronavirus disease 2019 (COVID-19 outbreak in Iran; actions and problems",
  "DOI": "10.1017/ice.2020.86",
  "Count": 15
}, {
  "Atitle": "Stop the Wuhan coronavirus",
  "DOI": "10.1038/d41586-020-00153-x",
  "Count": 15
}, {
  "Atitle": "Calling all coronavirus researchers: keep sharing, stay open",
  "DOI": "10.1038/d41586-020-00307-x",
  "Count": 15
}, {
  "Atitle": "First Case of 2019 Novel Coronavirus in the United States",
  "DOI": "10.1056/NEJMoa2001191",
  "Count": 15
}, {
  "Atitle": "The Novel Coronavirus � A Snapshot of Current Knowledge",
  "DOI": "10.1111/1751-7915.13557",
  "Count": 15
}, {
  "Atitle": "A nationwide survey of psychological distress among Chinese people in the COVID-19 epidemic: implications and policy recommendations",
  "DOI": "10.1136/gpsych-2020-100213",
  "Count": 15
}, {
  "Atitle": "Autopsy in suspected COVID-19 cases",
  "DOI": "10.1136/jclinpath-2020-206522",
  "Count": 15
}, {
  "Atitle": "Potential preanalytical and analytical vulnerabilities in the laboratory diagnosis of coronavirus disease 2019 (COVID-19",
  "DOI": "10.1515/cclm-2020-0285",
  "Count": 15
}, {
  "Atitle": "Novel coronavirus 2019-nCoV: prevalence, biological and clinical characteristics comparison with SARS-CoV and MERS-CoV",
  "DOI": "10.26355/eurrev_202002_20379",
  "Count": 15
}, {
  "Atitle": "First cases of coronavirus disease 2019 (COVID-19 in France: surveillance, investigations and control measures, January 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.6.2000094",
  "Count": 15
}, {
  "Atitle": "Understanding Unreported Cases in the COVID-19 Epidemic Outbreak in Wuhan, China, and the Importance of Major Public Health Interventions",
  "DOI": "10.3390/biology9030050",
  "Count": 15
}, {
  "Atitle": "On the Coronavirus (COVID-19 Outbreak and the Smart City Network: Universal Data Sharing Standards Coupled with Artificial Intelligence (AI to Benefit Urban Health Monitoring and Management",
  "DOI": "10.3390/healthcare8010046",
  "Count": 15
}, {
  "Atitle": "Reverse logistics network design for effective management of medical waste in epidemic outbreaks: Insights from the coronavirus disease 2019 (COVID-19 outbreak in Wuhan (China",
  "DOI": "10.3390/ijerph17051770",
  "Count": 15
}, {
  "Atitle": "Characteristics of and Public Health Responses to the Coronavirus Disease 2019 Outbreak in China",
  "DOI": "10.3390/jcm9020575",
  "Count": 15
}, {
  "Atitle": "COVID-19 - what should anaethesiologists and intensivists know about it?",
  "DOI": "10.5114/ait.2020.93756",
  "Count": 15
}, {
  "Atitle": "Annals On Call - Understanding the Spread of COVID-19",
  "DOI": "10.7326/A20-0001",
  "Count": 15
}, {
  "Atitle": "Recommendations for critically ill patients with COVID-19",
  "DOI": "10.1007/s00063-020-00674-3",
  "Count": 14
}, {
  "Atitle": "Chest computed tomography in children with COVID-19 respiratory infection",
  "DOI": "10.1007/s00247-020-04656-7",
  "Count": 14
}, {
  "Atitle": "Clinical characteristics and outcome of ICU admitted MERS corona virus infected patients",
  "DOI": "10.1016/j.ejcdt.2015.11.011",
  "Count": 14
}, {
  "Atitle": "Is Africa prepared for tackling the COVID-19 (SARS-CoV-2 epidemic. Lessons from past outbreaks, ongoing pan-African public health efforts, and implications for the future",
  "DOI": "10.1016/j.ijid.2020.02.049",
  "Count": 14
}, {
  "Atitle": "Efficacy of various disinfectants against SARS coronavirus",
  "DOI": "10.1016/j.jhin.2004.12.023",
  "Count": 14
}, {
  "Atitle": "Hand hygiene and the novel coronavirus pandemic: The role of healthcare workers",
  "DOI": "10.1016/j.jhin.2020.03.017",
  "Count": 14
}, {
  "Atitle": "Asymptomatic carrier state, acute respiratory disease, and pneumonia due to severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2: Facts and myths",
  "DOI": "10.1016/j.jmii.2020.02.012",
  "Count": 14
}, {
  "Atitle": "The epidemic of 2019-novel-coronavirus (2019-nCoV pneumonia and insights for emerging infectious diseases in the future",
  "DOI": "10.1016/j.micinf.2020.02.002",
  "Count": 14
}, {
  "Atitle": "Psychological crisis intervention during the outbreak period of new coronavirus pneumonia from experience in Shanghai",
  "DOI": "10.1016/j.psychres.2020.112903",
  "Count": 14
}, {
  "Atitle": "SARS-CoV-2 is an appropriate name for the new coronavirus",
  "DOI": "10.1016/S0140-6736(20)30557-2",
  "Count": 14
}, {
  "Atitle": "Deciphering the power of isolation in controlling COVID-19 outbreaks",
  "DOI": "10.1016/S2214-109X(20)30085-1",
  "Count": 14
}, {
  "Atitle": "Characterization of the receptor-binding domain (RBD of 2019 novel coronavirus: implication for development of RBD protein as a viral attachment inhibitor and vaccine",
  "DOI": "10.1038/s41423-020-0400-4",
  "Count": 14
}, {
  "Atitle": "Facing Covid-19 in Italy  Ethics, Logistics, and Therapeutics on the Epidemic�s Front Line",
  "DOI": "10.1056/NEJMp2005492",
  "Count": 14
}, {
  "Atitle": "Rapid Response to COVID-19: Health Informatics Support for Outbreak Management in an Academic Health System",
  "DOI": "10.1093/jamia/ocaa037",
  "Count": 14
}, {
  "Atitle": "Analysis of factors associated with disease outcomes in hospitalized patients with 2019 novel coronavirus disease",
  "DOI": "10.1097/CM9.0000000000000775",
  "Count": 14
}, {
  "Atitle": "Clinical characteristics of fatal and recovered cases of coronavirus disease 2019 (COVID-19 in Wuhan, China: a retrospective study",
  "DOI": "10.1097/CM9.0000000000000824",
  "Count": 14
}, {
  "Atitle": "The Essential Facts of Wuhan Novel Coronavirus Outbreak in China and Epitope-based Vaccine Designing against COVID-19",
  "DOI": "10.1101/2020.02.05.935072",
  "Count": 14
}, {
  "Atitle": "Consensus of Chinese experts on protection of skin and mucous membrane barrier for healthcare workers fighting against coronavirus disease 2019",
  "DOI": "10.1111/dth.13310",
  "Count": 14
}, {
  "Atitle": "Bearing the brunt of covid-19: older people in low and middle income countries",
  "DOI": "10.1136/bmj.m1052",
  "Count": 14
}, {
  "Atitle": "Trump claims public health warnings on covid-19 are a conspiracy against him",
  "DOI": "10.1136/bmj.m941",
  "Count": 14
}, {
  "Atitle": "A rapid advice guideline for the diagnosis and treatment of 2019 novel coronavirus (2019-nCoV infected pneumonia (standard version",
  "DOI": "10.1186/s40779-020-0233-6",
  "Count": 14
}, {
  "Atitle": "The critical role of laboratory medicine during coronavirus disease 2019 (COVID-19 and other viral outbreaks",
  "DOI": "10.1515/cclm-2020-0240",
  "Count": 14
}, {
  "Atitle": "Laboratory abnormalities in children with novel coronavirus disease 2019",
  "DOI": "10.1515/cclm-2020-0272",
  "Count": 14
}, {
  "Atitle": "Analysis of clinical features of 29 patients with 2019 novel coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.03.013",
  "Count": 14
}, {
  "Atitle": "Similarity in Case Fatality Rates (CFR of COVID-19/SARS-COV-2 in Italy and China",
  "DOI": "10.3855/jidc.12600",
  "Count": 14
}, {
  "Atitle": "2019-nCoV: The Identify-Isolate-Inform (3I Tool Applied to a Novel Emerging Coronavirus",
  "DOI": "10.5811/westjem.2020.1.46760",
  "Count": 14
}, {
  "Atitle": "2019 novel coronavirus patients' clinical characteristics, discharge rate and fatality rate of meta-analysis",
  "DOI": "10.1002/jmv.25757",
  "Count": 13
}, {
  "Atitle": "Tissue distribution of ACE2 protein, the functional receptor for SARS coronavirus. A first step in understanding SARS pathogenesis",
  "DOI": "10.1002/path.1570",
  "Count": 13
}, {
  "Atitle": "Clinical and CT features in pediatric patients with COVID-19 infection: Different points from adults",
  "DOI": "10.1002/ppul.24718",
  "Count": 13
}, {
  "Atitle": "Diagnosis and treatment of 2019 novel coronavirus infection in children: a pressing issue",
  "DOI": "10.1007/s12519-020-00344-6",
  "Count": 13
}, {
  "Atitle": "Severe neurologic syndrome associated with Middle East respiratory syndrome corona virus (MERS-CoV",
  "DOI": "10.1007/s15010-015-0720-y",
  "Count": 13
}, {
  "Atitle": "The coronavirus (COVID-19 epidemic and patient safety",
  "DOI": "10.1016/j.jaad.2020.02.031",
  "Count": 13
}, {
  "Atitle": "Trend and forecasting of the COVID-19 outbreak in China",
  "DOI": "10.1016/j.jinf.2020.02.014",
  "Count": 13
}, {
  "Atitle": "Remdesivir as a possible therapeutic option for the COVID-19",
  "DOI": "10.1016/j.tmaid.2020.101615",
  "Count": 13
}, {
  "Atitle": "Passengers' destinations from China: low risk of Novel Coronavirus (2019-nCoV transmission into Africa and South America",
  "DOI": "10.1017/S0950268820000424",
  "Count": 13
}, {
  "Atitle": "Why does the coronavirus spread so easily between people?",
  "DOI": "10.1038/d41586-020-00660-x",
  "Count": 13
}, {
  "Atitle": "COVID-19 and the cardiovascular system",
  "DOI": "10.1038/s41569-020-0360-5",
  "Count": 13
}, {
  "Atitle": "Audio Interview: New Research on Possible Treatments for Covid-19",
  "DOI": "10.1056/NEJMe2005759",
  "Count": 13
}, {
  "Atitle": "A Novel Coronavirus Emerging in China  Key Questions for Impact Assessment",
  "DOI": "10.1056/NEJMp2000929",
  "Count": 13
}, {
  "Atitle": "Covid-19 and the Stiff Upper Lip - The Pandemic Response in the United Kingdom",
  "DOI": "10.1056/NEJMp2005755",
  "Count": 13
}, {
  "Atitle": "Emerging novel coronavirus (2019-nCoVcurrent scenario, evolutionary perspective based on genome analysis and recent developments",
  "DOI": "10.1080/01652176.2020.1727993",
  "Count": 13
}, {
  "Atitle": "Covid-19: WHO declares pandemic because of �alarming levels� of spread, severity, and inaction",
  "DOI": "10.1136/bmj.m1036",
  "Count": 13
}, {
  "Atitle": "SARS-CoV-2 and COVID-19: The most important research questions",
  "DOI": "10.1186/s13578-020-00404-4",
  "Count": 13
}, {
  "Atitle": "Social Capital and Sleep Quality in Individuals Who Self-Isolated for 14 Days During the Coronavirus Disease 2019 (COVID-19 Outbreak in January 2020 in China",
  "DOI": "10.12659/MSM.923921",
  "Count": 13
}, {
  "Atitle": "COVID-19 tijdens de zwangerschap en de borstvoedingsperiode: wat weten we tot dusver?",
  "DOI": "10.2143/TVG.76.00.2000000",
  "Count": 13
}, {
  "Atitle": "Contact Transmission of COVID-19 in South Korea: Novel Investigation Techniques for Tracing Contacts",
  "DOI": "10.24171/j.phrp.2020.11.1.09",
  "Count": 13
}, {
  "Atitle": "COVID-19 (Novel Coronavirus 2019 - recent trends",
  "DOI": "10.26355/eurrev_202002_20378",
  "Count": 13
}, {
  "Atitle": "Rapidly increasing cumulative incidence of coronavirus disease (COVID-19 in the European Union/European Economic Area and the United Kingdom, 1 January to 15 March 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.11.2000285",
  "Count": 13
}, {
  "Atitle": "Detection of 2019 novel coronavirus (2019-nCoV by real-time RT-PCR",
  "DOI": "10.2807/1560-7917.ES.2020.25.3.2000045",
  "Count": 13
}, {
  "Atitle": "Community Transmission of Severe Acute Respiratory Syndrome Coronavirus 2, Shenzhen, China, 2020",
  "DOI": "10.3201/eid2606.200239",
  "Count": 13
}, {
  "Atitle": "Potential false-positive rate among the 'asymptomatic infected individuals' in close contacts of COVID-19 patients]",
  "DOI": "10.3760/cma.j.cn112338-20200221-00144",
  "Count": 13
}, {
  "Atitle": "Mental health survey of 230 medical staff in a tertiary infectious disease hospital for COVID-19]",
  "DOI": "10.3760/cma.j.cn121094-20200219-00063",
  "Count": 13
}, {
  "Atitle": "Role of dermatologists in the uprising of the novel corona virus (COVID-19: Perspectives and opportunities",
  "DOI": "10.4103/ds.ds_5_20",
  "Count": 13
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19: Protecting Hospitals From the Invisible",
  "DOI": "10.7326/M20-0751",
  "Count": 13
}, {
  "Atitle": "Coronavirus InfectionsMore Than Just the Common Cold",
  "DOI": "10.1001/jama.2020.0757",
  "Count": 12
}, {
  "Atitle": "Review of the Clinical Characteristics of Coronavirus Disease 2019 (COVID-19",
  "DOI": "10.1007/s11606-020-05762-w",
  "Count": 12
}, {
  "Atitle": "Structural, glycosylation and antigenic variation between 2019 novel coronavirus (2019-nCoV and SARS coronavirus (SARS-CoV",
  "DOI": "10.1007/s13337-020-00571-5",
  "Count": 12
}, {
  "Atitle": "Unexpected Receptor Functional Mimicry Elucidates Activation of Coronavirus Fusion",
  "DOI": "10.1016/j.cell.2018.12.028",
  "Count": 12
}, {
  "Atitle": "Active smoking is not associated with severity of coronavirus disease 2019 (COVID-19",
  "DOI": "10.1016/j.ejim.2020.03.014",
  "Count": 12
}, {
  "Atitle": "2019-novel Coronavirus severe adult respiratory distress syndrome in two cases in Italy: An uncommon radiological presentation",
  "DOI": "10.1016/j.ijid.2020.02.043",
  "Count": 12
}, {
  "Atitle": "A conceptual model for the outbreak of Coronavirus disease 2019 (COVID-19 in Wuhan, China with individual reaction and governmental action",
  "DOI": "10.1016/j.ijid.2020.02.058",
  "Count": 12
}, {
  "Atitle": "Potential role of inanimate surfaces for the spread of coronaviruses and their inactivation with disinfectant agents",
  "DOI": "10.1016/j.infpip.2020.100044",
  "Count": 12
}, {
  "Atitle": "Rapid random access detection of the novel SARS-coronavirus-2 (SARS-CoV-2, previously 2019-nCoV using an open access protocol for the Panther Fusion",
  "DOI": "10.1016/j.jcv.2020.104305",
  "Count": 12
}, {
  "Atitle": "Convalescent plasma as a potential therapy for COVID-19",
  "DOI": "10.1016/S1473-3099(20)30141-9",
  "Count": 12
}, {
  "Atitle": "Estimation of COVID-19 outbreak size in Italy",
  "DOI": "10.1016/S1473-3099(20)30227-9",
  "Count": 12
}, {
  "Atitle": "Feasibility of controlling COVID-19 outbreaks by isolation of cases and contacts",
  "DOI": "10.1016/S2214-109X(20)30074-7",
  "Count": 12
}, {
  "Atitle": "Patients with mental health disorders in the COVID-19 epidemic",
  "DOI": "10.1016/S2215-0366(20)30090-0",
  "Count": 12
}, {
  "Atitle": "SCIENTISTS FEAR CORONAVIRUS SPREAD IN VULNERABLE NATIONS",
  "DOI": "10.1038/d41586-020-00405-w",
  "Count": 12
}, {
  "Atitle": "COVID-19 infection: the perspectives on immune responses",
  "DOI": "10.1038/s41418-020-0530-3",
  "Count": 12
}, {
  "Atitle": "Soluble angiotensin-converting enzyme 2: a potential approach for coronavirus infection therapy?",
  "DOI": "10.1042/CS20200163",
  "Count": 12
}, {
  "Atitle": "Effect of gastrointestinal symptoms on patients infected with COVID-19",
  "DOI": "10.1053/j.gastro.2020.03.020",
  "Count": 12
}, {
  "Atitle": "Another Decade, Another Coronavirus",
  "DOI": "10.1056/NEJMe2001126",
  "Count": 12
}, {
  "Atitle": "Audio Interview: What Clinicians Need to Know in Diagnosing and Treating Covid-19",
  "DOI": "10.1056/NEJMe2004244",
  "Count": 12
}, {
  "Atitle": "Impact of international travel and border control measures on the global spread of the novel 2019 coronavirus outbreak",
  "DOI": "10.1073/pnas.2002616117",
  "Count": 12
}, {
  "Atitle": "Potent binding of 2019 novel coronavirus spike protein by a SARS coronavirus-specific human monoclonal antibody",
  "DOI": "10.1080/22221751.2020.1729069",
  "Count": 12
}, {
  "Atitle": "Emerging WuHan (COVID-19 coronavirus: glycan shield and structure prediction of spike glycoprotein and its interaction with human CD26",
  "DOI": "10.1080/22221751.2020.1739565",
  "Count": 12
}, {
  "Atitle": "The Role of Telehealth in Reducing the Mental Health Burden from COVID-19",
  "DOI": "10.1089/tmj.2020.0068",
  "Count": 12
}, {
  "Atitle": "Epidemiologic and Clinical Characteristics of 91 Hospitalized Patients with COVID-19 in Zhejiang, China: A retrospective, multi-centre case series",
  "DOI": "10.1093/qjmed/hcaa089",
  "Count": 12
}, {
  "Atitle": "The outbreak of COVID-19:  An overview",
  "DOI": "10.1097/JCMA.0000000000000270",
  "Count": 12
}, {
  "Atitle": "Why is COVID-19 so mild in children?",
  "DOI": "10.1111/apa.15271",
  "Count": 12
}, {
  "Atitle": "Where are we now with COVID-19?",
  "DOI": "10.1111/ijcp.13497",
  "Count": 12
}, {
  "Atitle": "New coronavirus threat galvanizes scientists",
  "DOI": "10.1126/science.367.6477.492",
  "Count": 12
}, {
  "Atitle": "Genome analyses help track coronavirus' moves",
  "DOI": "10.1126/science.367.6483.1176",
  "Count": 12
}, {
  "Atitle": "Compounds with therapeutic potential against novel respiratory 2019 coronavirus",
  "DOI": "10.1128/AAC.00399-20",
  "Count": 12
}, {
  "Atitle": "Antiviral activity of chloroquine against human coronavirus OC43 infection in newborn mice",
  "DOI": "10.1128/AAC.01509-08",
  "Count": 12
}, {
  "Atitle": "Covid-19: Medical conferences around the world are cancelled after US cases are linked to Massachusetts meeting",
  "DOI": "10.1136/bmj.m1054",
  "Count": 12
}, {
  "Atitle": "Novel coronavirus: Australian GPs raise concerns about shortage of face masks",
  "DOI": "10.1136/bmj.m477",
  "Count": 12
}, {
  "Atitle": "Rules on isolation rooms for suspected covid-19 cases in GP surgeries to be relaxed",
  "DOI": "10.1136/bmj.m707",
  "Count": 12
}, {
  "Atitle": "The pandemic of coronavirus: tackling the latest plague",
  "DOI": "10.1177/0141076820910926",
  "Count": 12
}, {
  "Atitle": "Chloroquine is a potent inhibitor of SARS coronavirus infection and spread",
  "DOI": "10.1186/1743-422X-2-69",
  "Count": 12
}, {
  "Atitle": "Pregnancy and Perinatal Outcomes of Women With Coronavirus Disease (COVID-19 Pneumonia: A Preliminary Analysis",
  "DOI": "10.2214/AJR.20.23072",
  "Count": 12
}, {
  "Atitle": "Drug targets for corona virus: A systematic review",
  "DOI": "10.4103/ijp.IJP_115_20",
  "Count": 12
}, {
  "Atitle": "Development of a Laboratory-safe and Low-cost Detection Protocol for SARS-CoV-2 of the Coronavirus Disease 2019 (COVID-19",
  "DOI": "10.5607/en20009",
  "Count": 12
}, {
  "Atitle": "The Novel Coronavirus Originating in Wuhan, China: Challenges for Global Health Governance",
  "DOI": "10.1001/jama.2020.1097",
  "Count": 11
}, {
  "Atitle": "Overlapping and discrete aspects of the pathology and pathogenesis of the emerging human pathogenic coronaviruses SARS?CoV, MERS?CoV, and 2019?nCoV",
  "DOI": "10.1002/jmv.25709",
  "Count": 11
}, {
  "Atitle": "Will COVID-19 be a litmus test for post-Ebola Sub-Saharan Africa?",
  "DOI": "10.1002/jmv.25780",
  "Count": 11
}, {
  "Atitle": "Clinical predictors of mortality due to COVID-19 based on an analysis of data of 150 patients from Wuhan, China",
  "DOI": "10.1007/s00134-020-05991-x",
  "Count": 11
}, {
  "Atitle": "Findings of lung ultrasonography of novel corona virus pneumonia during the 2019-2020 epidemic",
  "DOI": "10.1007/s00134-020-05996-6",
  "Count": 11
}, {
  "Atitle": "Initial CT findings and temporal changes in patients with the novel coronavirus pneumonia (2019-nCoV: a study of 63 patients in Wuhan, China",
  "DOI": "10.1007/s00330-020-06731-x",
  "Count": 11
}, {
  "Atitle": "Clinical characteristics of 24 asymptomatic infections with COVID-19 screened among close contacts in Nanjing, China",
  "DOI": "10.1007/s11427-020-1661-4",
  "Count": 11
}, {
  "Atitle": "Combination of western medicine and Chinese traditional patent medicine in treating a family case of COVID-19 in Wuhan",
  "DOI": "10.1007/s11684-020-0757-x",
  "Count": 11
}, {
  "Atitle": "COVID-19 may transmit through aerosol",
  "DOI": "10.1007/s11845-020-02218-2",
  "Count": 11
}, {
  "Atitle": "Clinical features of severe pediatric patients with coronavirus disease 2019 in Wuhan: a single center's observational study",
  "DOI": "10.1007/s12519-020-00354-4",
  "Count": 11
}, {
  "Atitle": "Preparing for a COVID-19 pandemic: a review of operating room outbreak response measures in a large tertiary hospital in Singapore",
  "DOI": "10.1007/s12630-020-01620-9",
  "Count": 11
}, {
  "Atitle": "Real-time forecasts of the COVID-19 epidemic in China from February 5th to February 24th, 2020",
  "DOI": "10.1016/j.idm.2020.02.002",
  "Count": 11
}, {
  "Atitle": "Prevalence of comorbidities in the novel Wuhan coronavirus (COVID-19 infection: a systematic review and meta-analysis",
  "DOI": "10.1016/j.ijid.2020.03.017",
  "Count": 11
}, {
  "Atitle": "Cardiovascular Considerations for Patients, Health Care Workers, and Health Systems During the Coronavirus Disease 2019 (COVID-19 Pandemic",
  "DOI": "10.1016/j.jacc.2020.03.031",
  "Count": 11
}, {
  "Atitle": "The dominance of human coronavirus OC43 and NL63 infections in infants",
  "DOI": "10.1016/j.jcv.2011.11.011",
  "Count": 11
}, {
  "Atitle": "Transmission of SARS and MERS coronaviruses and influenza virus in healthcare settings: the possible role of dry surface contamination",
  "DOI": "10.1016/j.jhin.2015.08.027",
  "Count": 11
}, {
  "Atitle": "Can we increase public awareness without creating anxiety about corona viruses?",
  "DOI": "10.1016/j.pec.2013.10.023",
  "Count": 11
}, {
  "Atitle": "Traditional Chinese medicine for COVID-19 treatment",
  "DOI": "10.1016/j.phrs.2020.104743",
  "Count": 11
}, {
  "Atitle": "Covid-19 goes global",
  "DOI": "10.1016/S0262-4079(20)30424-3",
  "Count": 11
}, {
  "Atitle": "Early dynamics of transmission and control of COVID-19: a mathematical modelling study",
  "DOI": "10.1016/S1473-3099(20)30144-4",
  "Count": 11
}, {
  "Atitle": "Pathological findings of COVID-19 associated with acute respiratory distress syndrome",
  "DOI": "10.1016/S2213-2600(20)30076-X",
  "Count": 11
}, {
  "Atitle": "Psychological interventions for people affected by the COVID-19 epidemic",
  "DOI": "10.1016/S2215-0366(20)30073-0",
  "Count": 11
}, {
  "Atitle": "Enteric involvement of coronaviruses: is faecal-oral transmission of SARS-CoV-2 possible?",
  "DOI": "10.1016/S2468-1253(20)30048-0",
  "Count": 11
}, {
  "Atitle": "South Korea is reporting intimate details of COVID-19 cases: has it helped?",
  "DOI": "10.1038/d41586-020-00740-y",
  "Count": 11
}, {
  "Atitle": "Coronavirus tests: researchers chase new diagnostics to fight the pandemic",
  "DOI": "10.1038/d41586-020-00827-6",
  "Count": 11
}, {
  "Atitle": "Origin and evolution of pathogenic coronaviruses",
  "DOI": "10.1038/s41579-018-0118-9",
  "Count": 11
}, {
  "Atitle": "Clinical characteristics of novel coronavirus cases in tertiary hospitals in Hubei Province",
  "DOI": "10.1097/CM9.0000000000000744",
  "Count": 11
}, {
  "Atitle": "Infectious diseases. Amid heightened concerns, new name for novel coronavirus emerges",
  "DOI": "10.1126/science.340.6133.673",
  "Count": 11
}, {
  "Atitle": "Coronavirus Susceptibility to the Antiviral Remdesivir (GS-5734 Is Mediated by the Viral Polymerase and the Proofreading Exoribonuclease",
  "DOI": "10.1128/mBio.00221-18",
  "Count": 11
}, {
  "Atitle": "Response to the emerging novel coronavirus outbreak",
  "DOI": "10.1136/bmj.m406",
  "Count": 11
}, {
  "Atitle": "Correlation of Chest CT and RT-PCR Testing in Coronavirus Disease                     2019 (COVID-19 in China: A Report of 1014 Cases",
  "DOI": "10.1148/radiol.2020200642",
  "Count": 11
}, {
  "Atitle": "Covid-19 infection and mortality - A physiologist's perspective enlightening clinical features and plausible interventional strategies",
  "DOI": "10.1152/ajplung.00097.2020",
  "Count": 11
}, {
  "Atitle": "Emergence of COVID-19 Infection: What Is Known and What Is to Be Expected � Narrative Review Article",
  "DOI": "10.1159/000506678",
  "Count": 11
}, {
  "Atitle": "Biochemical and Structural Insights into the Mechanisms of SARS Coronavirus RNA Ribose 2?-O-Methylation by nsp16/nsp10 Protein Complex (SARS-CoV 2?-O-Methylation Mechanisms by nsp16/10",
  "DOI": "10.1371/journal.ppat.1002294",
  "Count": 11
}, {
  "Atitle": "Update: Public Health Response to the Coronavirus Disease 2019 Outbreak  United States, February 24, 2020",
  "DOI": "10.15585/mmwr.mm6908e1",
  "Count": 11
}, {
  "Atitle": "Active Monitoring of Persons Exposed to Patients with Confirmed COVID-19 - United States, January-February 2020",
  "DOI": "10.15585/mmwr.mm6909e1",
  "Count": 11
}, {
  "Atitle": "Initial Investigation of Transmission of COVID-19 Among Crew Members During Quarantine of a Cruise Ship - Yokohama, Japan, February 2020",
  "DOI": "10.15585/mmwr.mm6911e2",
  "Count": 11
}, {
  "Atitle": "Lack of Vertical Transmission of Severe Acute Respiratory Syndrome Coronavirus 2, China",
  "DOI": "10.3201/eid2606.200287",
  "Count": 11
}, {
  "Atitle": "Better Understanding on MERS Corona Virus Outbreak in Korea",
  "DOI": "10.3346/jkms.2015.30.7.835",
  "Count": 11
}, {
  "Atitle": "How to train the health personnel for protecting themselves from novel coronavirus (COVID-19 infection during their patient or suspected case care",
  "DOI": "10.3352/jeehp.2020.17.10",
  "Count": 11
}, {
  "Atitle": "Communicating the Risk of Death from Novel Coronavirus Disease (COVID-19",
  "DOI": "10.3390/jcm9020580",
  "Count": 11
}, {
  "Atitle": "Optimization Method for Forecasting Confirmed Cases of COVID-19 in China",
  "DOI": "10.3390/jcm9030674",
  "Count": 11
}, {
  "Atitle": "Potential antiviral therapeutics for 2019 Novel Coronavirus]",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.0002",
  "Count": 11
}, {
  "Atitle": "Guidance for building a dedicated health facility to contain the spread of the 2019 novel coronavirus outbreak",
  "DOI": "10.4103/ijmr.IJMR_518_20",
  "Count": 11
}, {
  "Atitle": "Novel coronavirus (COVID-19: Leveraging telemedicine to optimize care while minimizing exposures and viral transmission",
  "DOI": "10.4103/JETS.JETS_32_20",
  "Count": 11
}, {
  "Atitle": "Preparation for Possible Sustained Transmission of 2019 Novel Coronavirus: Lessons From Previous Epidemics",
  "DOI": "10.1001/jama.2020.1960",
  "Count": 10
}, {
  "Atitle": "Neonatal Early-Onset Infection With SARS-CoV-2 in 33 Neonates Born to Mothers With COVID-19 in Wuhan, China",
  "DOI": "10.1001/jamapediatrics.2020.0878",
  "Count": 10
}, {
  "Atitle": "Tissue and cellular tropism of the coronavirus associated with severe acute respiratory syndrome: an in?situ hybridization study of fatal cases",
  "DOI": "10.1002/path.1510",
  "Count": 10
}, {
  "Atitle": "Stability and inactivation of SARS coronavirus",
  "DOI": "10.1007/s00430-004-0219-0",
  "Count": 10
}, {
  "Atitle": "An electrochemical immunosensor for the corona virus associated with the Middle East respiratory syndrome using an array of gold nanoparticle-modified carbon electrodes",
  "DOI": "10.1007/s00604-019-3345-5",
  "Count": 10
}, {
  "Atitle": "China's local governments are combating COVID-19 with unprecedented responses - from a Wenzhou governance perspective",
  "DOI": "10.1007/s11684-020-0755-z",
  "Count": 10
}, {
  "Atitle": "2019 Novel coronavirus: where we are and what we know",
  "DOI": "10.1007/s15010-020-01401-y",
  "Count": 10
}, {
  "Atitle": "Broad spectrum antiviral remdesivir inhibits human endemic and zoonotic deltacoronaviruses with a highly divergent RNA dependent RNA polymerase",
  "DOI": "10.1016/j.antiviral.2019.104541",
  "Count": 10
}, {
  "Atitle": "Design, synthesis and evaluation of a series of acyclic fleximer nucleoside analogues with anti-coronavirus activity",
  "DOI": "10.1016/j.bmcl.2015.05.039",
  "Count": 10
}, {
  "Atitle": "A Novel Coronavirus (COVID-19 Outbreak: A Call for Action",
  "DOI": "10.1016/j.chest.2020.02.014",
  "Count": 10
}, {
  "Atitle": "COVID-19 Therapeutic and Prevention",
  "DOI": "10.1016/j.ijantimicag.2020.105937",
  "Count": 10
}, {
  "Atitle": "The continuing 2019-nCoV epidemic threat of novel coronaviruses to global health  The latest 2019 novel coronavirus outbreak in Wuhan, China",
  "DOI": "10.1016/j.ijid.2020.01.009",
  "Count": 10
}, {
  "Atitle": "Estimation of the reproductive number of novel coronavirus (COVID-19 and the probable outbreak size on the Diamond Princess cruise ship: A data-driven analysis",
  "DOI": "10.1016/j.ijid.2020.02.033",
  "Count": 10
}, {
  "Atitle": "The novel coronavirus Covid-19: What are the ophthalmic risks?",
  "DOI": "10.1016/j.jfo.2020.02.001",
  "Count": 10
}, {
  "Atitle": "Clinical feature of COVID-19 in elderly patients: a comparison with young and middle-aged patients",
  "DOI": "10.1016/j.jinf.2020.03.005",
  "Count": 10
}, {
  "Atitle": "TH17 responses in cytokine storm of COVID-19: An emerging target of JAK2 inhibitor Fedratinib",
  "DOI": "10.1016/j.jmii.2020.03.005",
  "Count": 10
}, {
  "Atitle": "Clinical course and mortality risk of severe COVID-19",
  "DOI": "10.1016/S0140-6736(20)30633-4",
  "Count": 10
}, {
  "Atitle": "Can we contain the COVID-19 outbreak with the same measures as for SARS?",
  "DOI": "10.1016/S1473-3099(20)30129-8",
  "Count": 10
}, {
  "Atitle": "COVID-19: combining antiviral and anti-inflammatory treatments",
  "DOI": "10.1016/S1473-3099(20)30132-8",
  "Count": 10
}, {
  "Atitle": "SARS to novel coronavirus - old lessons and new lessons",
  "DOI": "10.1017/S0950268820000254",
  "Count": 10
}, {
  "Atitle": "Progress stalled on coronavirus",
  "DOI": "10.1038/501294a",
  "Count": 10
}, {
  "Atitle": "This scientist hopes to test coronavirus drugs on animals in locked-down Wuhan",
  "DOI": "10.1038/d41586-020-00190-6",
  "Count": 10
}, {
  "Atitle": "SARS and MERS: recent insights into emerging coronaviruses",
  "DOI": "10.1038/nrmicro.2016.81",
  "Count": 10
}, {
  "Atitle": "Comparative genetic analysis of the novel coronavirus (2019-nCoV/SARS-CoV-2 receptor ACE2 in different populations",
  "DOI": "10.1038/s41421-020-0147-1",
  "Count": 10
}, {
  "Atitle": "CT morphology of COVID-19: Case report and review of literature",
  "DOI": "10.1055/a-1142-4094",
  "Count": 10
}, {
  "Atitle": "Genomic characterization of the 2019 novel human-pathogenic coronavirus isolated from a patient with atypical pneumonia after visiting Wuhan",
  "DOI": "10.1080/22221751.2020.1719902",
  "Count": 10
}, {
  "Atitle": "Human Coronavirus NL63 Molecular Epidemiology and Evolutionary Patterns in Rural Coastal Kenya",
  "DOI": "10.1093/infdis/jiy098",
  "Count": 10
}, {
  "Atitle": "Occupational risks for COVID-19 infection",
  "DOI": "10.1093/occmed/kqaa036",
  "Count": 10
}, {
  "Atitle": "Awareness, Attitudes, and Practices Related to Coronavirus Pandemic Among Public in Saudi Arabia",
  "DOI": "10.1097/FCH.0000000000000082",
  "Count": 10
}, {
  "Atitle": "Preliminary prediction of the basic reproduction number of the Wuhan novel coronavirus 2019?nCoV",
  "DOI": "10.1111/jebm.12376",
  "Count": 10
}, {
  "Atitle": "Covid-19 and the Digestive System",
  "DOI": "10.1111/jgh.15047",
  "Count": 10
}, {
  "Atitle": "Receptor Recognition by the Novel Coronavirus from Wuhan: an Analysis Based on Decade-Long Structural Studies of SARS Coronavirus",
  "DOI": "10.1128/JVI.00127-20",
  "Count": 10
}, {
  "Atitle": "Covid-19: UK holds off closing schools and restricts testing to people in hospital",
  "DOI": "10.1136/bmj.m1060",
  "Count": 10
}, {
  "Atitle": "COVID-19 prevention and control recommendations for the ICU",
  "DOI": "10.13175/swjpcc017-20",
  "Count": 10
}, {
  "Atitle": "Risk Factors for Fatal Middle East Respiratory Syndrome Coronavirus Infections in Saudi Arabia: Analysis of the WHO Line List, 2013-2018",
  "DOI": "10.2105/AJPH.2019.305186",
  "Count": 10
}, {
  "Atitle": "Contact Transmission of COVID-19 in South Korea: Novel Investigation Techniques for Tracing Contacts; PMC7045882",
  "DOI": "10.24171/j.phrp.2020.11.1.09",
  "Count": 10
}, {
  "Atitle": "Chest Radiographic and CT Findings of the 2019 Novel Coronavirus Disease (COVID-19: Analysis of Nine Patients Treated in Korea",
  "DOI": "10.3348/kjr.2020.0132",
  "Count": 10
}, {
  "Atitle": "Initial Cluster of Novel Coronavirus (2019-nCoV Infections in Wuhan, China Is Consistent with Substantial Human-to-Human Transmission; PMC7073724",
  "DOI": "10.3390/jcm9020488",
  "Count": 10
}, {
  "Atitle": "Real-Time Estimation of the Risk of Death from Novel Coronavirus (COVID-19 Infection: Inference Using Exported Cases",
  "DOI": "10.3390/jcm9020523",
  "Count": 10
}, {
  "Atitle": "Insights into the Recent 2019 Novel Coronavirus (SARS-CoV-2 in Light of Past Human Coronavirus Outbreaks",
  "DOI": "10.3390/pathogens9030186",
  "Count": 10
}, {
  "Atitle": "Return of the Coronavirus: 2019-nCoV",
  "DOI": "10.3390/v12020135",
  "Count": 10
}, {
  "Atitle": "Analysis of COVID-19 infection spread in Japan based on stochastic transition model",
  "DOI": "10.5582/bst.2020.01482",
  "Count": 10
}, {
  "Atitle": "Managing Cancer Care During the COVID-19 Pandemic: Agility and Collaboration Toward a Common Goal",
  "DOI": "10.6004/jnccn.2020.7560",
  "Count": 10
}, {
  "Atitle": "2019 Novel Coronavirus - Important Information for Clinicians",
  "DOI": "10.1001/jama.2020.1490",
  "Count": 9
}, {
  "Atitle": "Preparing for the Most Critically Ill Patients With COVID-19: The Potential Role of Extracorporeal Membrane Oxygenation",
  "DOI": "10.1001/jama.2020.2342",
  "Count": 9
}, {
  "Atitle": "Positive RT-PCR Test Results in Patients Recovered From COVID-19",
  "DOI": "10.1001/jama.2020.2783",
  "Count": 9
}, {
  "Atitle": "Composition and divergence of coronavirus spike proteins and host ACE2 receptors predict potential intermediate hosts of SARS-CoV-2",
  "DOI": "10.1002/jmv.25726",
  "Count": 9
}, {
  "Atitle": "COVID-19 containment: China provides important lessons for global response",
  "DOI": "10.1007/s11684-020-0766-9",
  "Count": 9
}, {
  "Atitle": "Transmission potential and severity of COVID-19 in South Korea",
  "DOI": "10.1016/j.ijid.2020.03.031",
  "Count": 9
}, {
  "Atitle": "2019-novel coronavirus outbreak: A new challenge",
  "DOI": "10.1016/j.jgar.2020.02.021",
  "Count": 9
}, {
  "Atitle": "Duration of quarantine in hospitalized patients with severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2 infection: a question needing an answer",
  "DOI": "10.1016/j.jhin.2020.03.003",
  "Count": 9
}, {
  "Atitle": "Coronavirus 2019-nCoV: A brief perspective from the front line",
  "DOI": "10.1016/j.jinf.2020.02.010",
  "Count": 9
}, {
  "Atitle": "Inactivation of the coronavirus that induces severe acute respiratory syndrome, SARS-CoV",
  "DOI": "10.1016/j.jviromet.2004.06.006",
  "Count": 9
}, {
  "Atitle": "Is COVID-19 receiving ADE from other coronaviruses?",
  "DOI": "10.1016/j.micinf.2020.02.006",
  "Count": 9
}, {
  "Atitle": "The novel Coronavirus (SARS-CoV-2 is a one health issue",
  "DOI": "10.1016/j.onehlt.2020.100123",
  "Count": 9
}, {
  "Atitle": "Community pharmacist in public health emergencies: Quick to action against the coronavirus 2019-nCoV outbreak",
  "DOI": "10.1016/j.sapharm.2020.02.003",
  "Count": 9
}, {
  "Atitle": "A novel coronavirus outbreak of global health concern",
  "DOI": "10.1016/S0140-6736(20)30185-9",
  "Count": 9
}, {
  "Atitle": "Offline: COVID-19a reckoning",
  "DOI": "10.1016/S0140-6736(20)30669-3",
  "Count": 9
}, {
  "Atitle": "COVID-19 pneumonia: what has CT taught us?",
  "DOI": "10.1016/S1473-3099(20)30134-1",
  "Count": 9
}, {
  "Atitle": "Early epidemiological analysis of the coronavirus disease 2019 outbreak based on crowdsourced data: a population-level observational study",
  "DOI": "10.1016/S2589-7500%2820%2930026-1",
  "Count": 9
}, {
  "Atitle": "The coronavirus pandemic in five powerful charts",
  "DOI": "10.1038/d41586-020-00758-2",
  "Count": 9
}, {
  "Atitle": "Functional assessment of cell entry and receptor usage for SARS-CoV-2 and other lineage B betacoronaviruses",
  "DOI": "10.1038/s41564-020-0688-y",
  "Count": 9
}, {
  "Atitle": "In the fight against the new coronavirus outbreak, we must also struggle with human bias",
  "DOI": "10.1038/s41591-020-0802-y",
  "Count": 9
}, {
  "Atitle": "A novel coronavirus associated with severe acute respiratory syndrome",
  "DOI": "10.1056/NEJMoa030781",
  "Count": 9
}, {
  "Atitle": "Defining the Epidemiology of Covid-19  Studies Needed",
  "DOI": "10.1056/NEJMp2002125",
  "Count": 9
}, {
  "Atitle": "SARS-CoV2: should inhibitors of the renin-angiotensin system be withdrawn in patients with COVID-19?",
  "DOI": "10.1093/eurheartj/ehaa235",
  "Count": 9
}, {
  "Atitle": "Persistence and clearance of viral RNA in 2019 novel coronavirus disease rehabilitation patients",
  "DOI": "10.1097/CM9.0000000000000774",
  "Count": 9
}, {
  "Atitle": "Can angiotensin receptor-blocking drugs perhaps be harmful in the COVID-19 pandemic?",
  "DOI": "10.1097/HJH.0000000000002450",
  "Count": 9
}, {
  "Atitle": "Computed Tomography Manifestations of 5 Cases of the Novel Coronavirus Disease 2019 (COVID-19 Pneumonia From Patients Outside Wuhan",
  "DOI": "10.1097/RTI.0000000000000508",
  "Count": 9
}, {
  "Atitle": "Gold nanoparticle?adjuvanted S protein induces a strong antigen?specific IgG response against severe acute respiratory syndrome?related coronavirus infection, but fails to induce protective antibodies and limit eosinophilic infiltration in lungs",
  "DOI": "10.1111/1348-0421.12754",
  "Count": 9
}, {
  "Atitle": "Diabetes and COVID-19",
  "DOI": "10.1111/1753-0407.13027",
  "Count": 9
}, {
  "Atitle": "COVID-19: social distancing, ACE 2 receptors, protease inhibitors and beyond?",
  "DOI": "10.1111/ijcp.13503",
  "Count": 9
}, {
  "Atitle": "Liver injury during highly pathogenic human coronavirus infections",
  "DOI": "10.1111/liv.14435",
  "Count": 9
}, {
  "Atitle": "Broad-spectrum antiviral GS-5734 inhibits both epidemic and zoonotic coronaviruses",
  "DOI": "10.1126/scitranslmed.aal3653",
  "Count": 9
}, {
  "Atitle": "Human Coronavirus 229E Remains Infectious on Common Touch Surface Materials",
  "DOI": "10.1128/mBio.01697-15",
  "Count": 9
}, {
  "Atitle": "Covid-19 mass testing facilities could end the epidemic rapidly",
  "DOI": "10.1136/bmj.m1163",
  "Count": 9
}, {
  "Atitle": "Covid-19: surge in cases in Italy and South Korea makes pandemic look more likely",
  "DOI": "10.1136/bmj.m751",
  "Count": 9
}, {
  "Atitle": "Time Kinetics of Viral Clearance and Resolution of Symptoms in Novel Coronavirus Infection",
  "DOI": "10.1164/rccm.202003-0524LE",
  "Count": 9
}, {
  "Atitle": "Event based surveillance of Middle East Respiratory Syndrome Coronavirus (MERS- CoV in Bangladesh among pilgrims and travelers from the Middle East: An update for the period 2013�2016",
  "DOI": "10.1371/journal.pone.0189914",
  "Count": 9
}, {
  "Atitle": "Potential antivirals and antiviral strategies against SARS coronavirus infections",
  "DOI": "10.1586/14787210.4.2.291",
  "Count": 9
}, {
  "Atitle": "CT Findings of Coronavirus Disease (COVID-19 Severe Pneumonia",
  "DOI": "10.2214/AJR.20.23035",
  "Count": 9
}, {
  "Atitle": "Renin-angiotensin system in human coronavirus pathogenesis",
  "DOI": "10.2217/fvl.10.4",
  "Count": 9
}, {
  "Atitle": "Effectiveness for the Response to COVID-19: The MERS Outbreak Containment Procedures",
  "DOI": "10.24171/j.phrp.2020.11.1.01",
  "Count": 9
}, {
  "Atitle": "First cases of coronavirus disease 2019 (COVID-19 in the WHO European Region, 24 January to 21 February 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.9.2000178",
  "Count": 9
}, {
  "Atitle": "Global spread of COVID-19 and pandemic potential",
  "DOI": "10.31646/gbio.55",
  "Count": 9
}, {
  "Atitle": "Surgical treatment for esophageal cancer during the outbreak of COVID-19]",
  "DOI": "10.3760/cma.j.cn112152-20200226-00128",
  "Count": 9
}, {
  "Atitle": "Pharmacotherapeutics for the new coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.03.005",
  "Count": 9
}, {
  "Atitle": "Clinical characteristics of 30 medical workers infected with new coronavirus pneumonia",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.03.014",
  "Count": 9
}, {
  "Atitle": "Lessons learned from SARS outbreak prompt rapid response to new coronavirus",
  "DOI": "10.1001/jama.2013.3251",
  "Count": 8
}, {
  "Atitle": "Coronavirus Disease 2019 and Influenza 2019-2020",
  "DOI": "10.1001/jama.2020.2633",
  "Count": 8
}, {
  "Atitle": "Alert for non-respiratory symptoms of Coronavirus Disease 2019 (COVID-19 patients in epidemic period: A case report of familial cluster with three asymptomatic COVID-19 patients",
  "DOI": "10.1002/jmv.25776",
  "Count": 8
}, {
  "Atitle": "Clinical features in pediatric COVID-19",
  "DOI": "10.1002/ppul.24737",
  "Count": 8
}, {
  "Atitle": "Imaging and clinical features of patients with 2019 novel coronavirus SARS-CoV-2",
  "DOI": "10.1007/s00259-020-04735-9",
  "Count": 8
}, {
  "Atitle": "Pathogenic human coronavirus infections: causes and consequences of cytokine storm and immunopathology",
  "DOI": "10.1007/s00281-017-0629-x",
  "Count": 8
}, {
  "Atitle": "Factors Influencing Emergency Nurses' Burnout During an Outbreak of Middle East Respiratory Syndrome Coronavirus in Korea",
  "DOI": "10.1016/j.anr.2016.10.002",
  "Count": 8
}, {
  "Atitle": "Vicarious traumatization in the general public, members, and non-members of medical teams aiding in COVID-19 control",
  "DOI": "10.1016/j.bbi.2020.03.007",
  "Count": 8
}, {
  "Atitle": "Single cell RNA sequencing of 13 human tissues identify cell types and receptors of human coronaviruses",
  "DOI": "10.1016/j.bbrc.2020.03.044",
  "Count": 8
}, {
  "Atitle": "An updated estimation of the risk of transmission of the novel coronavirus (2019-nCov",
  "DOI": "10.1016/j.idm.2020.02.001",
  "Count": 8
}, {
  "Atitle": "VSI: COVID-19 Therapeutic",
  "DOI": "10.1016/j.ijantimicag.2020.105937",
  "Count": 8
}, {
  "Atitle": "Preliminary estimation of the basic reproduction number of novel coronavirus (2019?nCoV in China, from 2019 to 2020: A data?driven analysis in the early phase of the outbreak",
  "DOI": "10.1016/j.ijid.2020.01.050",
  "Count": 8
}, {
  "Atitle": "Comments on \"Preliminary estimation of the basic reproduction number of novel Coronavirus (2019-nCoV in China, from 2019 to 2020: A data-driven Analysis in the early phase of the outbreak",
  "DOI": "10.1016/j.ijid.2020.02.024",
  "Count": 8
}, {
  "Atitle": "A commentary on \"World Health Organization declares global emergency: A review of the 2019 novel Coronavirus (COVID-19",
  "DOI": "10.1016/j.ijsu.2020.03.001",
  "Count": 8
}, {
  "Atitle": "Behavioral considerations and impact on personal protective equipment (PPE use: Early lessons from the coronavirus (COVID-19 outbreak",
  "DOI": "10.1016/j.jaad.2020.03.013",
  "Count": 8
}, {
  "Atitle": "Coronavirus (COVID-19 Outbreak: What the Department of Radiology Should Know",
  "DOI": "10.1016/j.jacr.2020.02.008",
  "Count": 8
}, {
  "Atitle": "How health anxiety influences responses to viral outbreaks like COVID-19: What all decision-makers, health authorities, and health care professionals need to know",
  "DOI": "10.1016/j.janxdis.2020.102211",
  "Count": 8
}, {
  "Atitle": "Coronavirus disease (COVID-19: The need to maintain regular physical activity while taking precautions",
  "DOI": "10.1016/j.jshs.2020.02.001",
  "Count": 8
}, {
  "Atitle": "From SARS to COVID-19: A previously unknown SARS- related coronavirus (SARS-CoV-2 of pandemic potential infecting humans - Call for a One Health approach; PMC7075990",
  "DOI": "10.1016/j.onehlt.2020.100124",
  "Count": 8
}, {
  "Atitle": "COVID-19 and Italy: what next?",
  "DOI": "10.1016/S0140-6736(20)30627-9",
  "Count": 8
}, {
  "Atitle": "Canada and COVID-19: learning from SARS",
  "DOI": "10.1016/S0140-6736(20)30670-X",
  "Count": 8
}, {
  "Atitle": "Radiological findings from 81 patients with COVID-19 pneumonia in Wuhan, China: a descriptive study",
  "DOI": "10.1016/S1473-3099(20)30086-4",
  "Count": 8
}, {
  "Atitle": "COVID-19 in pregnant women",
  "DOI": "10.1016/S1473-3099(20)30175-4",
  "Count": 8
}, {
  "Atitle": "COVID-19 outbreak: less stethoscope, more ultrasound",
  "DOI": "10.1016/S2213-2600(20)30120-X",
  "Count": 8
}, {
  "Atitle": "The mental health of medical workers in Wuhan, China dealing with the 2019 novel coronavirus",
  "DOI": "10.1016/S2215-0366(20)30047-X",
  "Count": 8
}, {
  "Atitle": "Online mental health services in China during the COVID-19 outbreak",
  "DOI": "10.1016/S2215-0366(20)30077-8",
  "Count": 8
}, {
  "Atitle": "Mental health care for international Chinese students affected by the COVID-19 outbreak",
  "DOI": "10.1016/S2215-0366(20)30089-4",
  "Count": 8
}, {
  "Atitle": "Chronology of COVID-19 cases on the Diamond Princess cruise ship and ethical considerations: a report from Japan",
  "DOI": "10.1017/dmp.2020.50",
  "Count": 8
}, {
  "Atitle": "2019-ncov's epidemic in middle province of northern Italy: impact, logistic & strategy in the first line hospital",
  "DOI": "10.1017/dmp.2020.51",
  "Count": 8
}, {
  "Atitle": "a-Ketoamides as Broad-Spectrum Inhibitors of Coronavirus and Enterovirus Replication: Structure-Based Design, Synthesis, and Activity Assessment",
  "DOI": "10.1021/acs.jmedchem.9b01828",
  "Count": 8
}, {
  "Atitle": "Receptor for new coronavirus found",
  "DOI": "10.1038/495149a",
  "Count": 8
}, {
  "Atitle": "Don�t rush to deploy COVID-19 vaccines and drugs without sufficient safety guarantees",
  "DOI": "10.1038/d41586-020-00751-9",
  "Count": 8
}, {
  "Atitle": "A decade after SARS: strategies for controlling emerging coronaviruses",
  "DOI": "10.1038/nrmicro3143",
  "Count": 8
}, {
  "Atitle": "The species Severe acute respiratory syndrome-related coronavirus: classifying 2019-nCoV and naming it SARS-CoV-2",
  "DOI": "10.1038/s41564-020-0695-z",
  "Count": 8
}, {
  "Atitle": "Emergence of a novel human coronavirus threatening human health",
  "DOI": "10.1038/s41591-020-0796-5",
  "Count": 8
}, {
  "Atitle": "Covid-19 - The Search for Effective Therapy",
  "DOI": "10.1056/NEJMe2005477",
  "Count": 8
}, {
  "Atitle": "Structural and molecular basis of mismatch correction and ribavirin excision from coronavirus RNA",
  "DOI": "10.1073/pnas.1718806115",
  "Count": 8
}, {
  "Atitle": "The antiviral compound remdesivir potently inhibits RNA-dependent RNA polymerase from Middle East respiratory syndrome coronavirus",
  "DOI": "10.1074/jbc.AC120.013056",
  "Count": 8
}, {
  "Atitle": "A Case Series of children with 2019 novel coronavirus infection: clinical and epidemiological features",
  "DOI": "10.1093/cid/ciaa198",
  "Count": 8
}, {
  "Atitle": "Analysis of Epidemiological and Clinical features in older patients with Corona Virus Disease 2019 (COVID-19 out of Wuhan",
  "DOI": "10.1093/cid/ciaa242",
  "Count": 8
}, {
  "Atitle": "Precautions for Intubating Patients with COVID-19",
  "DOI": "10.1097/ALN.0000000000003288",
  "Count": 8
}, {
  "Atitle": "How COVID-19 Outbreak Is Impacting Colorectal Cancer Patients in Italy: A Long Shadow Beyond Infection",
  "DOI": "10.1097/DCR.0000000000001685",
  "Count": 8
}, {
  "Atitle": "Bronchoscopy in the Age of COVID-19",
  "DOI": "10.1097/LBR.0000000000000682",
  "Count": 8
}, {
  "Atitle": "Animal Origins of SARS Coronavirus: Possible Links with the International Trade in Small Carnivores",
  "DOI": "10.1098/rstb.2004.1492",
  "Count": 8
}, {
  "Atitle": "Case report of COVID-19 in a kidney transplant recipient: Does immunosuppression alter the clinical presentation?",
  "DOI": "10.1111/ajt.15874",
  "Count": 8
}, {
  "Atitle": "The 2019 coronavirus: Learning curves, lessons, and the weakest link",
  "DOI": "10.1111/ijcp.13488",
  "Count": 8
}, {
  "Atitle": "Covid-19: Italy confirms 11 deaths as cases spread from north",
  "DOI": "10.1136/bmj.m757",
  "Count": 8
}, {
  "Atitle": "Covid-19: retired doctors could be asked to return to work, says Hancock",
  "DOI": "10.1136/bmj.m831",
  "Count": 8
}, {
  "Atitle": "Renin-Angiotensin System Blockers and the COVID-19 Pandemic: At Present There Is No Evidence to Abandon Renin-Angiotensin System Blockers",
  "DOI": "10.1161/HYPERTENSIONAHA.120.15082",
  "Count": 8
}, {
  "Atitle": "Telehealth for global emergencies: Implications for coronavirus disease 2019 (COVID-19",
  "DOI": "10.1177/1357633X20916567",
  "Count": 8
}, {
  "Atitle": "What further should be done to control COVID-19 outbreaks in addition to cases isolation and contact tracing measures?",
  "DOI": "10.1186/s12916-020-01551-8",
  "Count": 8
}, {
  "Atitle": "Preparing for COVID-19: early experience from an intensive care unit in Singapore",
  "DOI": "10.1186/s13054-020-2814-x",
  "Count": 8
}, {
  "Atitle": "Treatment of COVID-19: old tricks for new challenges",
  "DOI": "10.1186/s13054-020-2818-6",
  "Count": 8
}, {
  "Atitle": "2019 novel coronavirus of pneumonia in Wuhan, China: emerging attack and management strategies",
  "DOI": "10.1186/s40169-020-00271-z",
  "Count": 8
}, {
  "Atitle": "Coronavirus disease-2019: is fever an adequate screening for the returning travelers?",
  "DOI": "10.1186/s41182-020-00201-2",
  "Count": 8
}, {
  "Atitle": "Gross examination report of a COVID-19�death autopsy",
  "DOI": "10.12116/j.issn.1004-5619.2020.01.005",
  "Count": 8
}, {
  "Atitle": "Perspectives on monoclonal antibody therapy as potential therapeutic intervention for Coronavirus disease-19 (COVID-19",
  "DOI": "10.12932/AP-200220-0773",
  "Count": 8
}, {
  "Atitle": "Modeling the Transmission of Middle East Respirator Syndrome Corona Virus in the Republic of Korea: e0144778",
  "DOI": "10.1371/journal.pone.0144778",
  "Count": 8
}, {
  "Atitle": "Relation Between Chest CT Findings and Clinical Conditions of Coronavirus Disease (COVID-19 Pneumonia: A Multicenter Study",
  "DOI": "10.2214/AJR.20.22976",
  "Count": 8
}, {
  "Atitle": "Novel coronavirus outbreak in wuhan, china, 2020: intense surveillance is vital for preventing sustained transmission in new locations; PMC7073840",
  "DOI": "10.3390/jcm9020498",
  "Count": 8
}, {
  "Atitle": "Assessing the Impact of Reduced Travel on Exportation Dynamics of Novel Coronavirus Infection (COVID-19",
  "DOI": "10.3390/jcm9020601",
  "Count": 8
}, {
  "Atitle": "Potential Rapid Diagnostics, Vaccine and Therapeutics for 2019 Novel Coronavirus (2019-nCoV: A Systematic Review",
  "DOI": "10.3390/jcm9030623",
  "Count": 8
}, {
  "Atitle": "Clinical analysis of 31 cases of 2019 novel coronavirus infection in children from six provinces (autonomous region of northern China]",
  "DOI": "10.3760/cma.j.cn112140-20200225-00138",
  "Count": 8
}, {
  "Atitle": "Impact of complicated myocardial injury on the clinical outcome of severe or critically ill COVID-19 patients",
  "DOI": "10.3760/cma.j.cn112148-20200228-00137",
  "Count": 8
}, {
  "Atitle": "Epidemiological characteristics of confirmed COVID-19 cases in Tianjin",
  "DOI": "10.3760/cma.j.cn112338-20200221-00146",
  "Count": 8
}, {
  "Atitle": "Lopinavir/ritonavir combination therapy amongst symptomatic coronavirus disease 2019 patients in India: Protocol for restricted public health emergency use",
  "DOI": "10.4103/ijmr.IJMR_502_20",
  "Count": 8
}, {
  "Atitle": "Novel Coronavirus: Concern over health-care professionals",
  "DOI": "10.4103/mjdrdypu.mjdrdypu_32_20",
  "Count": 8
}, {
  "Atitle": "COVID-19: gastrointestinal symptoms and potential sources of 2019-nCoV transmission",
  "DOI": "10.5114/ait.2020.93867",
  "Count": 8
}, {
  "Atitle": "Diagnostic Testing for the Novel Coronavirus",
  "DOI": "10.1001/jama.2020.3864",
  "Count": 7
}, {
  "Atitle": "Toward Universal Deployable Guidelines for the Care of Patients With COVID-19",
  "DOI": "10.1001/jama.2020.5110",
  "Count": 7
}, {
  "Atitle": "What Does the Coronavirus Disease 2019 (COVID-19 Mean for Families?",
  "DOI": "10.1001/jamapediatrics.2020.0828",
  "Count": 7
}, {
  "Atitle": "Evolving status of the 2019 novel coronavirus infection: Proposal of conventional serologic assays for disease diagnosis and infection monitoring",
  "DOI": "10.1002/jmv.25702",
  "Count": 7
}, {
  "Atitle": "The course of clinical diagnosis and treatment of a case infected with coronavirus disease 2019",
  "DOI": "10.1002/jmv.25711",
  "Count": 7
}, {
  "Atitle": "Development of epitope?based peptide vaccine against novel coronavirus 2019 (SARS?COV?2: Immunoinformatics approach",
  "DOI": "10.1002/jmv.25736",
  "Count": 7
}, {
  "Atitle": "Platelet-to-lymphocyte ratio is associated with prognosis in patients with Corona Virus Disease-19",
  "DOI": "10.1002/jmv.25767",
  "Count": 7
}, {
  "Atitle": "Clinical features of deaths in the novel coronavirus epidemic in China",
  "DOI": "10.1002/rmv.2103",
  "Count": 7
}, {
  "Atitle": "Coronaviruses: an overview of their replication and pathogenesis",
  "DOI": "10.1007/978-1-4939-2438-7_1",
  "Count": 7
}, {
  "Atitle": "Practical recommendations for critical care and anesthesiology teams caring for novel coronavirus (2019-nCoV patients",
  "DOI": "10.1007/s12630-020-01591-x",
  "Count": 7
}, {
  "Atitle": "Inactivation of surrogate coronaviruses on hard surfaces by health care germicides",
  "DOI": "10.1016/j.ajic.2010.08.011",
  "Count": 7
}, {
  "Atitle": "COVID-19 spike-host cell receptor GRP78 binding site prediction",
  "DOI": "10.1016/j.jinf.2020.02.026",
  "Count": 7
}, {
  "Atitle": "Pulmonary pathology of early phase 2019 novel coronavirus (COVID-19 pneumonia in two patients with lung cancer",
  "DOI": "10.1016/j.jtho.2020.02.010",
  "Count": 7
}, {
  "Atitle": "Molecular basis of COVID-19 relationships in different species: a one health perspective",
  "DOI": "10.1016/j.micinf.2020.03.002",
  "Count": 7
}, {
  "Atitle": "Molecular Evolution of Human Coronavirus Genomes",
  "DOI": "10.1016/j.tim.2016.09.001",
  "Count": 7
}, {
  "Atitle": "Outbreak of novel Corona Virus (2019-nCoV; implications for travelers to Pakistan?",
  "DOI": "10.1016/j.tmaid.2020.101571",
  "Count": 7
}, {
  "Atitle": "Case definition and management of patients with MERS coronavirus in Saudi Arabia",
  "DOI": "10.1016/S1473-3099(14)70918-1",
  "Count": 7
}, {
  "Atitle": "Staff safety during emergency airway management for COVID-19 in Hong Kong",
  "DOI": "10.1016/S2213-2600(20)30084-9",
  "Count": 7
}, {
  "Atitle": "COVID-19, ECMO, and lymphopenia: a word of caution",
  "DOI": "10.1016/S2213-2600(20)30119-3",
  "Count": 7
}, {
  "Atitle": "Use of antiviral drugs to reduce COVID-19 transmission",
  "DOI": "10.1016/S2214-109X(20)30114-5",
  "Count": 7
}, {
  "Atitle": "Mental health care for medical staff in China during the COVID-19 outbreak",
  "DOI": "10.1016/S2215-0366(20)30078-X",
  "Count": 7
}, {
  "Atitle": "Coronavirus outbreak: the role of companies in preparedness and responses",
  "DOI": "10.1016/S2468-2667(20)30051-7",
  "Count": 7
}, {
  "Atitle": "New coronavirus outbreak. Lessons learned from the severe acute respiratory syndrome epidemic",
  "DOI": "10.1017/S095026881400377X",
  "Count": 7
}, {
  "Atitle": "Coronavirus: limit economic damage",
  "DOI": "10.1038/d41586-020-00522-6",
  "Count": 7
}, {
  "Atitle": "Coronavirus and children, deep-sea microbes and a bold new climate law",
  "DOI": "10.1038/d41586-020-00670-9",
  "Count": 7
}, {
  "Atitle": "A crucial role of angiotensin converting enzyme 2 (ACE2 in SARS coronavirus-induced lung injury",
  "DOI": "10.1038/nm1267",
  "Count": 7
}, {
  "Atitle": "Elevated exhaustion levels and reduced functional diversity of T cells in peripheral blood may predict severe progression in COVID-19 patients",
  "DOI": "10.1038/s41423-020-0401-3",
  "Count": 7
}, {
  "Atitle": "Neuartiges Coronavirus (SARS-CoV-2",
  "DOI": "10.1055/a-1113-3096",
  "Count": 7
}, {
  "Atitle": "Covid-19 - Navigating the Uncharted",
  "DOI": "10.1056/NEJMe2002387",
  "Count": 7
}, {
  "Atitle": "Receptor usage and cell entry of bat coronavirus HKU4 provide insight into bat-to-human transmission of MERS coronavirus",
  "DOI": "10.1073/pnas.1405889111",
  "Count": 7
}, {
  "Atitle": "Broad-spectrum coronavirus antiviral drug discovery",
  "DOI": "10.1080/17460441.2019.1581171",
  "Count": 7
}, {
  "Atitle": "Laboratory Diagnosis of Emerging Human Coronavirus Infections - The State of the Art",
  "DOI": "10.1080/22221751.2020.1745095",
  "Count": 7
}, {
  "Atitle": "Detection of severe acute respiratory syndrome coronavirus in the brain: potential role of the chemokine mig in pathogenesis",
  "DOI": "10.1086/444461",
  "Count": 7
}, {
  "Atitle": "Three Emerging Coronaviruses in Two Decades",
  "DOI": "10.1093/ajcp/aqaa029",
  "Count": 7
}, {
  "Atitle": "Isolation and characterization of SARS-CoV-2 from the first US COVID-19 patient",
  "DOI": "10.1101/2020.03.02.972935",
  "Count": 7
}, {
  "Atitle": "Coronavirus disruptions reverberate through research",
  "DOI": "10.1126/science.367.6484.1289",
  "Count": 7
}, {
  "Atitle": "Negative Nasopharyngeal and Oropharyngeal Swab Does Not Rule Out COVID-19",
  "DOI": "10.1128/JCM.00297-20",
  "Count": 7
}, {
  "Atitle": "Virus-specific memory CD8 T cells provide substantial protection from lethal severe acute respiratory syndrome coronavirus infection",
  "DOI": "10.1128/JVI.01505-14",
  "Count": 7
}, {
  "Atitle": "Structure-Guided Mutagenesis Alters Deubiquitinating Activity and Attenuates Pathogenesis of a Murine Coronavirus",
  "DOI": "10.1128/JVI.01734-19",
  "Count": 7
}, {
  "Atitle": "Covid-19: doctors in final trimester of pregnancy should avoid direct patient contact",
  "DOI": "10.1136/bmj.m1173",
  "Count": 7
}, {
  "Atitle": "Covid-19: UK records first death, as world�s cases exceed 100 000",
  "DOI": "10.1136/bmj.m943",
  "Count": 7
}, {
  "Atitle": "Chest CT Findings in Coronavirus Disease-19 (COVID-19: Relationship to Duration of Infection",
  "DOI": "10.1148/radiol.2020200463",
  "Count": 7
}, {
  "Atitle": "Inactivation of SARS coronavirus by means of povidone-iodine, physical conditions and chemical reagents",
  "DOI": "10.1159/000089211",
  "Count": 7
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19: Emerging and Future Challenges for Dental and Oral Medicine",
  "DOI": "10.1177/0022034520914246",
  "Count": 7
}, {
  "Atitle": "MERS coronavirus: diagnostics, epidemiology and transmission",
  "DOI": "10.1186/s12985-015-0439-5",
  "Count": 7
}, {
  "Atitle": "Therapeutic strategies in an outbreak scenario to treat the novel coronavirus originating in Wuhan, China",
  "DOI": "10.12688/f1000research.22211.2",
  "Count": 7
}, {
  "Atitle": "COVID-19 in Children: Initial Characterization of the Pediatric Disease",
  "DOI": "10.1542/peds.2020-0834",
  "Count": 7
}, {
  "Atitle": "COVID-19: A New Virus as a Potential Rapidly Spreading in the Worldwide",
  "DOI": "10.22038/jctm.2020.46924.1264",
  "Count": 7
}, {
  "Atitle": "Differential diagnosis of illness in patients under investigation for the novel coronavirus (SARS-CoV-2, Italy, February 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.8.2000170",
  "Count": 7
}, {
  "Atitle": "COVID-19 in the Shadows of MERS-CoV in the Kingdom of Saudi Arabia",
  "DOI": "10.2991/jegh.k.200218.003",
  "Count": 7
}, {
  "Atitle": "Risk factors for Middle East respiratory syndrome coronavirus infection among healthcare personnel",
  "DOI": "10.3201/eid2211.160920",
  "Count": 7
}, {
  "Atitle": "Risk for Transportation of 2019 Novel Coronavirus Disease from Wuhan to Other Cities in China",
  "DOI": "10.3201/eid2605.200146",
  "Count": 7
}, {
  "Atitle": "Identifying and Interrupting Superspreading Events-Implications for Control of Severe Acute Respiratory Syndrome Coronavirus 2",
  "DOI": "10.3201/eid2606.200495",
  "Count": 7
}, {
  "Atitle": "COVID-19, Australia: Epidemiology Report 7 (Reporting week ending 19:00 AEDT 14 March 2020",
  "DOI": "10.33321/cdi.2020.44.23",
  "Count": 7
}, {
  "Atitle": "Bats, Coronaviruses, and Deforestation: Toward the Emergence of Novel Infectious Diseases?",
  "DOI": "10.3389/fmicb.2018.00702",
  "Count": 7
}, {
  "Atitle": "Construction and evaluation of a novel diagnosis process for 2019-Corona Virus Disease]",
  "DOI": "10.3760/cma.j.cn112137-20200228-00499",
  "Count": 7
}, {
  "Atitle": "Recommendations for respiratory rehabilitation of COVID-19 in adult]",
  "DOI": "10.3760/cma.j.cn112147-20200228-00206",
  "Count": 7
}, {
  "Atitle": "Which sampling method for the upper respiratory tract specimen should be taken to diagnose patient with COVID-19?",
  "DOI": "10.3760/cma.j.cn115330-20200223-00116",
  "Count": 7
}, {
  "Atitle": "Advances in the research of cytokine storm mechanism induced by Corona Virus Disease 2019 and the corresponding immunotherapies]",
  "DOI": "10.3760/cma.j.cn501120-20200224-00088",
  "Count": 7
}, {
  "Atitle": "COVID-19 with post-chemotherapy agranulocytosis in childhood acute leukemia: a case report]",
  "DOI": "10.3760/cma.j.issn.0253-2727.2020.0004",
  "Count": 7
}, {
  "Atitle": "Treatment strategy for gastrointestinal tumor under the outbreak of novel coronavirus pneumonia in China]",
  "DOI": "10.3760/cma.j.issn.1671-0274.2020.02.001",
  "Count": 7
}, {
  "Atitle": "2019-nCoV (Wuhan virus, a novel Coronavirus: human-to-human transmission, travel-related cases, and vaccine readiness",
  "DOI": "10.3855/jidc.12425",
  "Count": 7
}, {
  "Atitle": "2019-novel Coronavirus (2019-nCoV: estimating the case fatality rate - a word of caution",
  "DOI": "10.4414/smw.2020.20203",
  "Count": 7
}, {
  "Atitle": "Challenges to the system of reserve medical supplies for public health emergencies: reflections on the outbreak of the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2 epidemic in China",
  "DOI": "10.5582/bst.2020.01043",
  "Count": 7
}, {
  "Atitle": "Traditional Chinese Medicine in the Treatment of Patients Infected with 2019-New Coronavirus (SARS-CoV-2: A Review and Perspective",
  "DOI": "10.7150/ijbs.45538",
  "Count": 7
}, {
  "Atitle": "Histopathologic Changes and SARS-CoV-2 Immunostaining in the Lung of a Patient With COVID-19",
  "DOI": "10.7326/M20-0533",
  "Count": 7
}, {
  "Atitle": "Response to COVID-19 in Taiwan: Big Data Analytics, New Technology, and Proactive Testing",
  "DOI": "10.1001/jama.2020.3151",
  "Count": 6
}, {
  "Atitle": "SARS-CoV-2, the Virus that Causes COVID-19: Cytometry and the New Challenge for Global Health",
  "DOI": "10.1002/cyto.a.24002",
  "Count": 6
}, {
  "Atitle": "Genomic variance of the 2019?nCoV coronavirus",
  "DOI": "10.1002/jmv.25700",
  "Count": 6
}, {
  "Atitle": "An exclusive 42 amino acid signature in pp1ab protein provides insights into the evolutive history of the 2019 novel human-pathogenic coronavirus (SARS-CoV2",
  "DOI": "10.1002/jmv.25758",
  "Count": 6
}, {
  "Atitle": "Initial clinical features of suspected Coronavirus Disease 2019 in two emergency departments outside of Hubei, China",
  "DOI": "10.1002/jmv.25763",
  "Count": 6
}, {
  "Atitle": "Diagnostic Utility of Clinical Laboratory Data Determinations for Patients with the Severe COVID-19",
  "DOI": "10.1002/jmv.25770",
  "Count": 6
}, {
  "Atitle": "Navigating Coronavirus Disease 2019 (Covid-19 in Physiatry: A CAN report for Inpatient Rehabilitation Facilities",
  "DOI": "10.1002/pmrj.12369",
  "Count": 6
}, {
  "Atitle": "Host Factors in Coronavirus Replication",
  "DOI": "10.1007/82_2017_25",
  "Count": 6
}, {
  "Atitle": "Stepping up infection control measures in ophthalmology during the novel coronavirus outbreak: an experience from Hong Kong",
  "DOI": "10.1007/s00417-020-04641-8",
  "Count": 6
}, {
  "Atitle": "AI-Driven Tools for Coronavirus Outbreak: Need of Active Learning and Cross-Population Train/Test Models on Multitudinal/Multimodal Data",
  "DOI": "10.1007/s10916-020-01562-1",
  "Count": 6
}, {
  "Atitle": "Modeling the epidemic dynamics and control of COVID-19 outbreak in China",
  "DOI": "10.1007/s40484-020-0199-0",
  "Count": 6
}, {
  "Atitle": "Labor and Delivery Guidance for COVID-19",
  "DOI": "10.1016/j.ajogmf.2020.100110",
  "Count": 6
}, {
  "Atitle": "Clinical considerations for patients with diabetes in times of COVID-19 epidemic",
  "DOI": "10.1016/j.dsx.2020.03.002",
  "Count": 6
}, {
  "Atitle": "CT manifestations of coronavirus disease-2019: A retrospective analysis of 73 cases by disease severity",
  "DOI": "10.1016/j.ejrad.2020.108941",
  "Count": 6
}, {
  "Atitle": "Transmission of COVID-19 in the terminal stage of incubation period: a familial cluster",
  "DOI": "10.1016/j.ijid.2020.03.027",
  "Count": 6
}, {
  "Atitle": "An Invited Commentary on \"World Health Organization declares Global Emergency: A review of the 2019 Novel Coronavirus (COVID-19\": Emergency or New Reality?",
  "DOI": "10.1016/j.ijsu.2020.03.002",
  "Count": 6
}, {
  "Atitle": "The deadly coronaviruses: The 2003 SARS pandemic and the 2020 novel coronavirus epidemic in China",
  "DOI": "10.1016/j.jaut.2020.102434",
  "Count": 6
}, {
  "Atitle": "Human coronavirus circulation in the United States 2014�2017",
  "DOI": "10.1016/j.jcv.2018.01.019",
  "Count": 6
}, {
  "Atitle": "Toona sinensis Roem tender leaf extract inhibits SARS coronavirus replication",
  "DOI": "10.1016/j.jep.2008.07.048",
  "Count": 6
}, {
  "Atitle": "Makeshift hospitals for COVID-19 patients: where health-care workers and patients need sufficient ventilation for more protection",
  "DOI": "10.1016/j.jhin.2020.03.008",
  "Count": 6
}, {
  "Atitle": "In silico screening of Chinese herbal medicines with the potential to directly inhibit 2019 novel coronavirus",
  "DOI": "10.1016/j.joim.2020.02.005",
  "Count": 6
}, {
  "Atitle": "COVID-19, a worldwide public health emergency",
  "DOI": "10.1016/j.rce.2020.03.001",
  "Count": 6
}, {
  "Atitle": "Maps, masks and media - Traveller and practitioner resources for 2019 novel coronavirus (2019-nCoV acute respiratory virus",
  "DOI": "10.1016/j.tmaid.2020.101574",
  "Count": 6
}, {
  "Atitle": "Coronavirus Disease 2019: Coronaviruses and Blood Safety",
  "DOI": "10.1016/j.tmrv.2020.02.003",
  "Count": 6
}, {
  "Atitle": "Enteric coronavirus infection in adult horses",
  "DOI": "10.1016/j.tvjl.2017.11.004",
  "Count": 6
}, {
  "Atitle": "Development of animal models against emerging coronaviruses: From SARS to MERS coronavirus",
  "DOI": "10.1016/j.virol.2015.02.030",
  "Count": 6
}, {
  "Atitle": "Coronavirus adds respiratory symptoms.(Infectious Diseases",
  "DOI": "10.1016/S0031-398X(08)70581-2",
  "Count": 6
}, {
  "Atitle": "COVID-19 and the anti-lessons of history",
  "DOI": "10.1016/S0140-6736(20)30468-2",
  "Count": 6
}, {
  "Atitle": "Mass masking in the COVID-19 epidemic: people need guidance",
  "DOI": "10.1016/S0140-6736(20)30520-1",
  "Count": 6
}, {
  "Atitle": "Sex difference and smoking predisposition in patients with COVID-19",
  "DOI": "10.1016/S2213-2600(20)30117-X",
  "Count": 6
}, {
  "Atitle": "COVID-19 and the liver: little cause for concern",
  "DOI": "10.1016/S2468-1253(20)30084-4",
  "Count": 6
}, {
  "Atitle": "Coronavirus outbreak: what�s next?",
  "DOI": "10.1038/d41586-020-00236-9",
  "Count": 6
}, {
  "Atitle": "China coronavirus: how many papers have been published?",
  "DOI": "10.1038/d41586-020-00253-8",
  "Count": 6
}, {
  "Atitle": "Did pangolins spread the China coronavirus to people?",
  "DOI": "10.1038/d41586-020-00364-2",
  "Count": 6
}, {
  "Atitle": "More than 80 clinical trials launch to test coronavirus treatments",
  "DOI": "10.1038/d41586-020-00444-3",
  "Count": 6
}, {
  "Atitle": "Coronavirus: limit short-term economic damage",
  "DOI": "10.1038/d41586-020-00522-6",
  "Count": 6
}, {
  "Atitle": "What China�s coronavirus response can teach the rest of the world",
  "DOI": "10.1038/d41586-020-00741-x",
  "Count": 6
}, {
  "Atitle": "Coronavirus: three things all governments and their science advisers must do now",
  "DOI": "10.1038/d41586-020-00772-4",
  "Count": 6
}, {
  "Atitle": "Angiotensin-converting enzyme 2 is a functional receptor for the SARS coronavirus",
  "DOI": "10.1038/nature02145",
  "Count": 6
}, {
  "Atitle": "Pre-fusion structure of a human coronavirus spike protein",
  "DOI": "10.1038/nature17200",
  "Count": 6
}, {
  "Atitle": "Identification of a new human coronavirus",
  "DOI": "10.1038/nm1024",
  "Count": 6
}, {
  "Atitle": "Functional exhaustion of antiviral lymphocytes in COVID-19 patients",
  "DOI": "10.1038/s41423-020-0402-2",
  "Count": 6
}, {
  "Atitle": "Fatal swine acute diarrhoea syndrome caused by an HKU2-related coronavirus of bat origin",
  "DOI": "10.1038/s41586-018-0010-9",
  "Count": 6
}, {
  "Atitle": "Identifying SARS-CoV-2 related coronaviruses in Malayan pangolins",
  "DOI": "10.1038/s41586-020-2169-0",
  "Count": 6
}, {
  "Atitle": "COVID-19: Gastrointestinal manifestations and potential fecal-oral transmission",
  "DOI": "10.1053/j.gastro.2020.02.054",
  "Count": 6
}, {
  "Atitle": "Critical Supply Shortages  The Need for Ventilators and Personal Protective Equipment during the Covid-19 Pandemic",
  "DOI": "10.1056/NEJMp2006141",
  "Count": 6
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus-like virus in Chinese horseshoe bats",
  "DOI": "10.1073/pnas.0506735102",
  "Count": 6
}, {
  "Atitle": "Coronavirus disinfection in histopathology",
  "DOI": "10.1080/01478885.2020.1734718",
  "Count": 6
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: five years later",
  "DOI": "10.1080/17476348.2017.1367288",
  "Count": 6
}, {
  "Atitle": "A Novel Approach for a Novel Pathogen: using a home assessment team to evaluate patients for 2019 novel coronavirus (SARS-CoV-2",
  "DOI": "10.1093/cid/ciaa256",
  "Count": 6
}, {
  "Atitle": "Clinical characteristics of refractory COVID-19 pneumonia in Wuhan, China",
  "DOI": "10.1093/cid/ciaa270",
  "Count": 6
}, {
  "Atitle": "Quantifying the association between domestic travel and the exportation of novel coronavirus (2019-nCoV cases from Wuhan, China in 2020: a correlational analysis",
  "DOI": "10.1093/jtm/taaa022",
  "Count": 6
}, {
  "Atitle": "COVID-19 outbreak on the Diamond Princess cruise ship: estimating the epidemic potential and effectiveness of public health countermeasures",
  "DOI": "10.1093/jtm/taaa030",
  "Count": 6
}, {
  "Atitle": "Hypothesis: angiotensin-converting enzyme inhibitors and angiotensin receptor blockers may increase the risk of severe COVID-19",
  "DOI": "10.1093/jtm/taaa041",
  "Count": 6
}, {
  "Atitle": "Comparative effectiveness and safety of ribavirin plus interferon-alpha, lopinavir/ritonavir plus interferon-alpha and ribavirin plus lopinavir/ritonavir plus interferon-alphain in patients with mild to moderate novel coronavirus pneumonia",
  "DOI": "10.1097/CM9.0000000000000790",
  "Count": 6
}, {
  "Atitle": "The Clinical and Chest CT Features Associated with Severe and Critical COVID-19 Pneumonia",
  "DOI": "10.1097/RLI.0000000000000672",
  "Count": 6
}, {
  "Atitle": "COVID-19  impact will be worse than flu",
  "DOI": "10.1108/OXAN-ES251195",
  "Count": 6
}, {
  "Atitle": "Emergency management of the prevention and control of novel coronavirus pneumonia in specialized branches of hospital",
  "DOI": "10.1111/acem.13958",
  "Count": 6
}, {
  "Atitle": "Optimizing COVID-19 candidate therapeutics: Thinking Without Borders",
  "DOI": "10.1111/cts.12790",
  "Count": 6
}, {
  "Atitle": "Is nicotine exposure linked to cardiopulmonary vulnerability to COVID-19 in the general population?",
  "DOI": "10.1111/febs.15303",
  "Count": 6
}, {
  "Atitle": "Coronavirus Disease 2019 in Geriatrics and Long-term Care: The ABCDs of COVID-19",
  "DOI": "10.1111/jgs.16445",
  "Count": 6
}, {
  "Atitle": "Swine enteric coronavirus disease: A review of 4�years with porcine epidemic diarrhoea virus and porcine deltacoronavirus in the United States and Canada",
  "DOI": "10.1111/tbed.12823",
  "Count": 6
}, {
  "Atitle": "Covid-19: six million doses of hydroxychloroquine donated to US despite lack of evidence",
  "DOI": "10.1136/bmj.m1166",
  "Count": 6
}, {
  "Atitle": "Coronaviruses in animals and humans",
  "DOI": "10.1136/bmj.m634",
  "Count": 6
}, {
  "Atitle": "Covid-19: Trump says risk to Americans is �very low�",
  "DOI": "10.1136/bmj.m793",
  "Count": 6
}, {
  "Atitle": "Covid-19: 90% of cases will hit NHS over nine week period, chief medical officer warns",
  "DOI": "10.1136/bmj.m918",
  "Count": 6
}, {
  "Atitle": "Covid-19: UK trade talks with EU must not hinder cooperation in tackling threat, BMA warns",
  "DOI": "10.1136/bmj.m988",
  "Count": 6
}, {
  "Atitle": "Covid-19: Trump proposes tax cuts and improved health insurance, but millions are not covered",
  "DOI": "10.1136/bmj.m993",
  "Count": 6
}, {
  "Atitle": "The Effects of Temperature and Relative Humidity on the Viability of the SARS Coronavirus",
  "DOI": "10.1155/2011/734690",
  "Count": 6
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19 and Cardiovascular Disease",
  "DOI": "10.1161/CIRCULATIONAHA.120.046941",
  "Count": 6
}, {
  "Atitle": "A midpoint perspective on the COVID-19 pandemic",
  "DOI": "10.11622/smedj.2020036",
  "Count": 6
}, {
  "Atitle": "Coronavirus: the spread of misinformation",
  "DOI": "10.1186/s12916-020-01556-3",
  "Count": 6
}, {
  "Atitle": "Geographical tracking and mapping of coronavirus disease COVID-19/severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2 epidemic and associated events around the world: how 21st century GIS technologies are supporting the global fight against outbr",
  "DOI": "10.1186/s12942-020-00202-8",
  "Count": 6
}, {
  "Atitle": "Lower mortality of COVID-19 by early recognition and intervention: experience from Jiangsu Province",
  "DOI": "10.1186/s13613-020-00650-2",
  "Count": 6
}, {
  "Atitle": "Lack of innate interferon responses during SARS coronavirus infection in a vaccination and reinfection ferret model",
  "DOI": "10.1371/journal.pone.0045842",
  "Count": 6
}, {
  "Atitle": "SARS Coronavirus nsp1 Protein Induces Template-Dependent Endonucleolytic Cleavage of mRNAs: Viral mRNAs Are Resistant to nsp1-Induced RNA Cleavage",
  "DOI": "10.1371/journal.ppat.1002433",
  "Count": 6
}, {
  "Atitle": "New coronavirus with \"pandemic potential\" sparks global surveillance efforts",
  "DOI": "10.1503/cmaj.109-4453",
  "Count": 6
}, {
  "Atitle": "Severe Outcomes Among Patients with Coronavirus Disease 2019 (COVID-19  United States, February 12�March 16, 2020",
  "DOI": "10.15585/mmwr.mm6912e2",
  "Count": 6
}, {
  "Atitle": "Challenges and countermeasures on Chinese malaria elimination programme during the coronavirus disease 2019 (COVID-19 outbreak]",
  "DOI": "10.16250/j.32.1374.2020036",
  "Count": 6
}, {
  "Atitle": "The 2019 novel coronavirus resource",
  "DOI": "10.16288/j.yczz.20-030",
  "Count": 6
}, {
  "Atitle": "The 2019 Novel Coronavirus: A Crown Jewel of Pandemics?",
  "DOI": "10.2478/jccm-2020-0013",
  "Count": 6
}, {
  "Atitle": "Coronavirus Disease 2019 outbreak: preparedness and readiness of countries in the Eastern Mediterranean Region",
  "DOI": "10.26719/2020.26.2.136",
  "Count": 6
}, {
  "Atitle": "Comparison of serological assays in human Middle East respiratory syndrome (MERS-coronavirus infection",
  "DOI": "10.2807/1560-7917.ES.2015.20.41.30042",
  "Count": 6
}, {
  "Atitle": "Updated rapid risk assessment from ECDC on the novel coronavirus disease 2019 (COVID-19 pandemic: increased transmission in the EU/EEA and the UK",
  "DOI": "10.2807/1560-7917.ES.2020.25.10.2003121",
  "Count": 6
}, {
  "Atitle": "Real-time tentative assessment of the epidemiological characteristics of novel coronavirus infections in Wuhan, China, as at 22 January 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.3.2000044",
  "Count": 6
}, {
  "Atitle": "Effectiveness of airport screening at detecting travellers infected with novel coronavirus (2019-nCoV",
  "DOI": "10.2807/1560-7917.ES.2020.25.5.2000080",
  "Count": 6
}, {
  "Atitle": "A Novel Approach of Consultation on 2019 Novel Coronavirus (COVID-19-Related Psychological and Mental Problems: Structured Letter Therapy",
  "DOI": "10.30773/pi.2020.0047",
  "Count": 6
}, {
  "Atitle": "Bat Coronaviruses in China",
  "DOI": "10.3390/v11030210",
  "Count": 6
}, {
  "Atitle": "Systematic Comparison of Two Animal-to-Human Transmitted Human Coronaviruses: SARS-CoV-2 and SARS-CoV",
  "DOI": "10.3390/v12020244",
  "Count": 6
}, {
  "Atitle": "Human coronaviruses: insights into environmental resistance and its influence on the development of new antiseptic strategies",
  "DOI": "10.3390/v4113044",
  "Count": 6
}, {
  "Atitle": "Comparison of heart failure and 2019 novel coronavirus pneumonia in chest CT features and clinical characteristics]",
  "DOI": "10.3760/cma.j.cn112148-20200218-00093",
  "Count": 6
}, {
  "Atitle": "Clinical Management of Lung Cancer Patients during the Outbreak of 2019 Novel Coronavirus Disease (COVID-19]",
  "DOI": "10.3779/j.issn.1009-3419.2020.03.02",
  "Count": 6
}, {
  "Atitle": "COVID-19: Impact on health of people & wealth of nations",
  "DOI": "10.4103/ijmr.IJMR_664_20",
  "Count": 6
}, {
  "Atitle": "COVID-19: Real-time dissemination of scientific information to fight a public health emergency of international concern",
  "DOI": "10.5582/bst.2020.01056",
  "Count": 6
}, {
  "Atitle": "Finding an Accurate Early Forecasting Model from Small Dataset: A Case of 2019-nCoV Novel Coronavirus Outbreak",
  "DOI": "10.9781/ijimai.2020.02.002",
  "Count": 6
}, {
  "Atitle": "Epidemiologic and Clinical Characteristics of Novel Coronavirus Infections Involving 13 Patients Outside Wuhan, China",
  "DOI": "10.1001/jama.2020.1623",
  "Count": 5
}, {
  "Atitle": "Novel Coronavirus Infection in Hospitalized Infants Under 1 Year of Age in China",
  "DOI": "10.1001/jama.2020.2131",
  "Count": 5
}, {
  "Atitle": "Preserving Clinical Trial Integrity During the Coronavirus Pandemic",
  "DOI": "10.1001/jama.2020.4689",
  "Count": 5
}, {
  "Atitle": "A report of clinical diagnosis and treatment of 9 cases of coronavirus disease 2019",
  "DOI": "10.1002/jmv.25755",
  "Count": 5
}, {
  "Atitle": "Coronavirus disease 2019 (COVID-19: update for anesthesiologists and intensivists March�2020",
  "DOI": "10.1007/s00101-020-00760-3",
  "Count": 5
}, {
  "Atitle": "Coronavirus disease 2019 (COVID-19: update for anesthesiologists and intensivists March 2020",
  "DOI": "10.1007/s00101-020-00760-3",
  "Count": 5
}, {
  "Atitle": "The Role of Augmented Intelligence (AI in Detecting and Preventing the Spread of Novel Coronavirus",
  "DOI": "10.1007/s10916-020-1536-6",
  "Count": 5
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19: A critical care perspective beyond China",
  "DOI": "10.1016/j.accpm.2020.03.001",
  "Count": 5
}, {
  "Atitle": "Coronavirus and Other Respiratory Illnesses Comparing Older with Young Adults",
  "DOI": "10.1016/j.amjmed.2015.05.034",
  "Count": 5
}, {
  "Atitle": "A hexapeptide of the receptor-binding domain of SARS corona virus spike protein blocks viral entry into host cells via the human receptor ACE2",
  "DOI": "10.1016/j.antiviral.2011.12.012",
  "Count": 5
}, {
  "Atitle": "Growth kinetics of SARS-coronavirus in Vero E6 cells",
  "DOI": "10.1016/j.bbrc.2005.02.085",
  "Count": 5
}, {
  "Atitle": "High-flow nasal-oxygenation-assisted fibreoptic tracheal intubation in critically ill patients with COVID-19 pneumonia: a prospective randomised controlled trial",
  "DOI": "10.1016/j.bja.2020.02.020",
  "Count": 5
}, {
  "Atitle": "Thrombocytopenia is associated with severe coronavirus disease 2019 (COVID-19 infections: A meta-analysis",
  "DOI": "10.1016/j.cca.2020.03.022",
  "Count": 5
}, {
  "Atitle": "Don't overlook digestive symptoms in patients with 2019 novel coronavirus disease (COVID-19",
  "DOI": "10.1016/j.cgh.2020.03.043",
  "Count": 5
}, {
  "Atitle": "Teicoplanin: an alternative drug for the treatment of coronavirus COVID-19?",
  "DOI": "10.1016/j.ijantimicag.2020.105944",
  "Count": 5
}, {
  "Atitle": "Viral load quantitation of SARS-coronavirus RNA using a one-step real-time RT-PCR",
  "DOI": "10.1016/j.ijid.2005.02.003",
  "Count": 5
}, {
  "Atitle": "Therapeutic Options for Middle East Respiratory Syndrome Coronavirus (MERS-CoV � possible lessons from a systematic review of SARS-CoV therapy",
  "DOI": "10.1016/j.ijid.2013.07.002",
  "Count": 5
}, {
  "Atitle": "Recurrence of positive SARS-CoV-2 RNA in COVID-19: A case report",
  "DOI": "10.1016/j.ijid.2020.03.003",
  "Count": 5
}, {
  "Atitle": "Clinical features and dynamics of viral load in imported and non-imported patients with COVID-19",
  "DOI": "10.1016/j.ijid.2020.03.022",
  "Count": 5
}, {
  "Atitle": "The Battle Against Coronavirus Disease 2019 (COVID-19: Emergency Management and Infection Control in a Radiology Department",
  "DOI": "10.1016/j.jacr.2020.03.011",
  "Count": 5
}, {
  "Atitle": "Association of seropositivity for influenza and coronaviruses with history of mood disorders and suicide attempts",
  "DOI": "10.1016/j.jad.2010.09.029",
  "Count": 5
}, {
  "Atitle": "Natural Compounds Potentially Suppressible Corona Virus Infection Disease",
  "DOI": "10.1016/j.jams.2018.08.208",
  "Count": 5
}, {
  "Atitle": "The detection of feline coronaviruses in blood samples from cats by mRNA RT-PCR",
  "DOI": "10.1016/j.jfms.2007.03.002",
  "Count": 5
}, {
  "Atitle": "2019 novel coronavirus (2019-nCoV outbreak: A new challenge",
  "DOI": "10.1016/j.jgar.2020.02.021",
  "Count": 5
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-CoV outbreak in South Korea, 2015: epidemiology, characteristics and public health implications",
  "DOI": "10.1016/j.jhin.2016.10.008",
  "Count": 5
}, {
  "Atitle": "Preparedness and proactive infection control measures against the emerging novel coronavirus in China",
  "DOI": "10.1016/j.jhin.2020.01.010",
  "Count": 5
}, {
  "Atitle": "Effective strategies to prevent coronavirus disease-2019 (COVID-19 outbreak in hospital",
  "DOI": "10.1016/j.jhin.2020.02.022",
  "Count": 5
}, {
  "Atitle": "Recent advances and perspectives of nucleic acid detection for coronavirus",
  "DOI": "10.1016/j.jpha.2020.02.010",
  "Count": 5
}, {
  "Atitle": "Wuhan coronavirus (2019-nCoV: The need to maintain regular physical activity while taking precautions",
  "DOI": "10.1016/j.jshs.2020.02.001",
  "Count": 5
}, {
  "Atitle": "Monoclonal antibodies to SARS-associated coronavirus (SARS-CoV: Identification of neutralizing and antibodies reactive to S, N, M and E viral proteins",
  "DOI": "10.1016/j.jviromet.2005.03.021",
  "Count": 5
}, {
  "Atitle": "Lianhuaqingwen exerts anti-viral and anti-inflammatory activity against novel coronavirus (SARS-CoV-2",
  "DOI": "10.1016/j.phrs.2020.104761",
  "Count": 5
}, {
  "Atitle": "The psychiatric impact of the novel coronavirus outbreak",
  "DOI": "10.1016/j.psychres.2020.112902",
  "Count": 5
}, {
  "Atitle": "Wuhan novel coronavirus (COVID-19 : why global control is challenging?",
  "DOI": "10.1016/j.puhe.2020.02.001",
  "Count": 5
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: Implications for health care facilities",
  "DOI": "10.1016/j.tmaid.2013.10.004",
  "Count": 5
}, {
  "Atitle": "Asymptomatic coronavirus infection: MERS-CoV and SARS-CoV-2 (COVID-19",
  "DOI": "10.1016/j.tmaid.2020.101608",
  "Count": 5
}, {
  "Atitle": "Spatial transmission of COVID-19 via public and private transportation in China",
  "DOI": "10.1016/j.tmaid.2020.101626",
  "Count": 5
}, {
  "Atitle": "A longitudinal study of the dynamics of bovine corona virus and respiratory syncytial virus infections in dairy herds",
  "DOI": "10.1016/j.tvjl.2013.01.028",
  "Count": 5
}, {
  "Atitle": "The novel coronavirus (COVID-19 infection in Hangzhou: An experience to share",
  "DOI": "10.1017/ice.2020.62",
  "Count": 5
}, {
  "Atitle": "The difference in the incubation period of 2019 novel coronavirus (SARS-CoV-2 infection between travelers to Hubei and non-travelers: The need of a longer quarantine period",
  "DOI": "10.1017/ice.2020.81",
  "Count": 5
}, {
  "Atitle": "Letter to editor: Role of masks/respirator protection against 2019-novel coronavirus (COVID-19",
  "DOI": "10.1017/ice.2020.83",
  "Count": 5
}, {
  "Atitle": "China coronavirus: Six questions scientists are asking",
  "DOI": "10.1038/d41586-020-00166-6",
  "Count": 5
}, {
  "Atitle": "What you need to know about the Wuhan coronavirus",
  "DOI": "10.1038/d41586-020-00209-y",
  "Count": 5
}, {
  "Atitle": "WHAT'S NEXT FOR THE CORONAVIRUS OUTBREAK CAUSING GLOBAL ALARM",
  "DOI": "10.1038/d41586-020-00236-9",
  "Count": 5
}, {
  "Atitle": "SLEW OF TRIALS LAUNCH TO TEST CORONAVIRUS TREATMENTS IN CHINA",
  "DOI": "10.1038/d41586-020-00444-3",
  "Count": 5
}, {
  "Atitle": "Mystery deepens over animal source of coronavirus",
  "DOI": "10.1038/d41586-020-00548-w",
  "Count": 5
}, {
  "Atitle": "Breadth of concomitant immune responses prior to patient recovery: a case report of non-severe COVID-19",
  "DOI": "10.1038/s41591-020-0819-2",
  "Count": 5
}, {
  "Atitle": "Transmission of MERS-Coronavirus in Household Contacts",
  "DOI": "10.1056/NEJMoa1405858",
  "Count": 5
}, {
  "Atitle": "Novel Coronavirus and Old Lessons - Preparing the Health System for the Pandemic",
  "DOI": "10.1056/NEJMp2005118",
  "Count": 5
}, {
  "Atitle": "Effects of misleading media coverage on public health crisis: a case of the 2019 novel coronavirus outbreak in China",
  "DOI": "10.1080/13032917.2020.1730621",
  "Count": 5
}, {
  "Atitle": "A Well Infant with Coronavirus Disease 2019 (COVID-19 with High Viral Load",
  "DOI": "10.1093/cid/ciaa201",
  "Count": 5
}, {
  "Atitle": "Risk Factors of Healthcare Workers with Corona Virus Disease 2019: A Retrospective Cohort Study in a Designated Hospital of Wuhan in China",
  "DOI": "10.1093/cid/ciaa287",
  "Count": 5
}, {
  "Atitle": "Is There an Association Between COVID-19 Mortality and the Renin-Angiotensin System-a Call for Epidemiologic Investigations",
  "DOI": "10.1093/cid/ciaa329",
  "Count": 5
}, {
  "Atitle": "Serial interval in determining the estimation of reproduction number of the novel coronavirus disease (COVID-19 during the early outbreak",
  "DOI": "10.1093/jtm/taaa033",
  "Count": 5
}, {
  "Atitle": "Recommendations for the prevention, mitigation and containment of the emerging SARS-CoV-2 (COVID-19 pandemic in haemodialysis centres",
  "DOI": "10.1093/ndt/gfaa069",
  "Count": 5
}, {
  "Atitle": "Response of Chinese Anesthesiologists to the COVID-19 Outbreak",
  "DOI": "10.1097/ALN.0000000000003300",
  "Count": 5
}, {
  "Atitle": "Perioperative Management of Patients Infected with the Novel Coronavirus: Recommendation from the Joint Task Force of the Chinese Society of Anesthesiology and the Chinese Association of Anesthesiologists",
  "DOI": "10.1097/ALN.0000000000003301",
  "Count": 5
}, {
  "Atitle": "Repurposing of clinically approved drugs for treatment of coronavirus disease 2019 in a 2019-novel coronavirus (2019-nCoV related coronavirus model",
  "DOI": "10.1097/CM9.0000000000000797",
  "Count": 5
}, {
  "Atitle": "Design of multi epitope-based peptide vaccine against E protein of human COVID-19: An immunoinformatics approach",
  "DOI": "10.1101/2020.02.04.934232",
  "Count": 5
}, {
  "Atitle": "Aerodynamic Characteristics and RNA Concentration of SARS-CoV-2 Aerosol in Wuhan Hospitals during COVID-19 Outbreak",
  "DOI": "10.1101/2020.03.08.982637",
  "Count": 5
}, {
  "Atitle": "Successful recovery of COVID-19 pneumonia in a renal transplant recipient with long-term immunosuppression",
  "DOI": "10.1111/ajt.15869",
  "Count": 5
}, {
  "Atitle": "Inactivation of three emerging viruses - severe acute respiratory syndrome coronavirus, Crimean-Congo haemorrhagic fever virus and Nipah virus - in platelet concentrates by ultraviolet C light and in plasma by methylene blue plus visible light",
  "DOI": "10.1111/vox.12888",
  "Count": 5
}, {
  "Atitle": "Isolation and characterization of viruses related to the SARS coronavirus from animals in southern China",
  "DOI": "10.1126/science.1087139",
  "Count": 5
}, {
  "Atitle": "How I faced my coronavirus anxiety",
  "DOI": "10.1126/science.367.6484.1398",
  "Count": 5
}, {
  "Atitle": "Effects of Air Temperature and Relative Humidity on Coronavirus Survival on Surfaces",
  "DOI": "10.1128/AEM.02291-09",
  "Count": 5
}, {
  "Atitle": "Improved molecular diagnosis of COVID-19 by the novel, highly sensitive and specific COVID-19-RdRp/Hel real-time reverse transcription-polymerase chain reaction assay validated in vitro and with clinical specimens",
  "DOI": "10.1128/JCM.00310-20",
  "Count": 5
}, {
  "Atitle": "Hiding in Plain Sight: an Approach to Treating Patients with Severe COVID-19 Infection",
  "DOI": "10.1128/mBio.00398-20",
  "Count": 5
}, {
  "Atitle": "Complete Genome Sequence of a 2019 Novel Coronavirus (SARS-CoV-2 Strain Isolated in Nepal",
  "DOI": "10.1128/MRA.00169-20",
  "Count": 5
}, {
  "Atitle": "Proposal for prevention and control of the 2019 novel coronavirus disease in newborn infants",
  "DOI": "10.1136/archdischild-2020-318996",
  "Count": 5
}, {
  "Atitle": "Challenges for NHS hospitals during covid-19 epidemic",
  "DOI": "10.1136/bmj.m1117",
  "Count": 5
}, {
  "Atitle": "China coronavirus: what do we know so far?",
  "DOI": "10.1136/bmj.m308",
  "Count": 5
}, {
  "Atitle": "In Beijing, coronavirus 2019-nCoV has created a siege mentality",
  "DOI": "10.1136/bmj.m516",
  "Count": 5
}, {
  "Atitle": "Coronavirus: home testing pilot launched in London to cut hospital visits and ambulance use",
  "DOI": "10.1136/bmj.m621",
  "Count": 5
}, {
  "Atitle": "Letter from China: covid-19 on the grapevine, on the internet, and in commerce",
  "DOI": "10.1136/bmj.m643",
  "Count": 5
}, {
  "Atitle": "Covid-19: Portugal closes all medical schools after 31 cases confirmed in the country",
  "DOI": "10.1136/bmj.m986",
  "Count": 5
}, {
  "Atitle": "Advice and guidance on coronavirus",
  "DOI": "10.1136/vr.m669",
  "Count": 5
}, {
  "Atitle": "Can Lung US Help Critical Care Clinicians in the Early Diagnosis of Novel Coronavirus (COVID-19 Pneumonia?",
  "DOI": "10.1148/radiol.2020200847",
  "Count": 5
}, {
  "Atitle": "More awareness is needed for severe acute respiratory syndrome coronavirus 2019 transmission through exhaled air during non-invasive respiratory support: experience from China",
  "DOI": "10.1183/13993003.00352-2020",
  "Count": 5
}, {
  "Atitle": "Bat origin of human coronaviruses",
  "DOI": "10.1186/s12985-015-0422-1",
  "Count": 5
}, {
  "Atitle": "Host susceptibility to severe COVID-19 and establishment of a host risk score: findings of 487 cases outside Wuhan",
  "DOI": "10.1186/s13054-020-2833-7",
  "Count": 5
}, {
  "Atitle": "The novel coronavirus outbreak: what can be learned from China in public reporting?",
  "DOI": "10.1186/s41256-020-00140-9",
  "Count": 5
}, {
  "Atitle": "Zn(2+ inhibits coronavirus and arterivirus RNA polymerase activity in vitro and zinc ionophores block the replication of these viruses in cell culture",
  "DOI": "10.1371/journal.ppat.1001176",
  "Count": 5
}, {
  "Atitle": "Persons Evaluated for 2019 Novel Coronavirus  United States, January 2020",
  "DOI": "10.15585/mmwr.mm6906e1",
  "Count": 5
}, {
  "Atitle": "Evaluation of the Effectiveness of Surveillance and Containment Measures for the First 100 Patients with COVID-19 in Singapore - January 2-February 29, 2020",
  "DOI": "10.15585/mmwr.mm6911e1",
  "Count": 5
}, {
  "Atitle": "Membrane binding proteins of coronaviruses",
  "DOI": "10.2217/fvl-2018-0144",
  "Count": 5
}, {
  "Atitle": "Controversies about COVID-19 and anticancer treatment with immune checkpoint inhibitors",
  "DOI": "10.2217/imt-2020-0067",
  "Count": 5
}, {
  "Atitle": "Coronavirus disease 2019 outbreak",
  "DOI": "10.23736/S0031-0808.20.03897-5",
  "Count": 5
}, {
  "Atitle": "Possible therapeutic role of a highly standardized mixture of active compounds derived from cultured Lentinula edodes mycelia (AHCC in patients infected with 2019 novel coronavirus",
  "DOI": "10.23736/S1121-421X.20.02697-5",
  "Count": 5
}, {
  "Atitle": "Mast cells contribute to coronavirus-induced inflammation: new anti-inflammatory strategy",
  "DOI": "10.23812/20-Editorial-Kritas",
  "Count": 5
}, {
  "Atitle": "Environmental persistence of porcine epidemic diarrhea virus, porcine delta corona virus, and transmissible gastroenteritis in feed ingredients",
  "DOI": "10.2527/jam2016-0176",
  "Count": 5
}, {
  "Atitle": "Incubation period of 2019 novel coronavirus (2019-nCoV infections among travellers from Wuhan, China, 20-28 January 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.5.2000062",
  "Count": 5
}, {
  "Atitle": "Mental Health Care Measures in Response to the 2019 Novel Coronavirus Outbreak in Korea",
  "DOI": "10.30773/pi.2020.0058",
  "Count": 5
}, {
  "Atitle": "Severe Respiratory Illness Outbreak Associated with Human Coronavirus NL63 in a Long-Term Care Facility",
  "DOI": "10.3201/eid2410.180862",
  "Count": 5
}, {
  "Atitle": "Rhabdomyolysis as Potential Late Complication Associated with COVID-19",
  "DOI": "10.3201/eid2607.200445",
  "Count": 5
}, {
  "Atitle": "Drive-Through Screening Center for COVID-19: a Safe and Efficient Screening System against Massive Community Outbreak",
  "DOI": "10.3346/jkms.2020.35.e123",
  "Count": 5
}, {
  "Atitle": "Are We Ready for Coronavirus Disease 2019 Arriving at Schools?",
  "DOI": "10.3346/jkms.2020.35.e127",
  "Count": 5
}, {
  "Atitle": "2019 Novel Coronavirus (COVID-19 Pneumonia: Serial Computed Tomography Findings",
  "DOI": "10.3348/kjr.2020.0112",
  "Count": 5
}, {
  "Atitle": "False-Negative Results of Real-Time Reverse-Transcriptase Polymerase Chain Reaction for Severe Acute Respiratory Syndrome Coronavirus 2: Role of Deep-Learning-Based CT Diagnosis and Insights from Two Cases",
  "DOI": "10.3348/kjr.2020.0146",
  "Count": 5
}, {
  "Atitle": "Mechanisms of Coronavirus Cell Entry Mediated by the Viral Spike Protein",
  "DOI": "10.3390/v4061011",
  "Count": 5
}, {
  "Atitle": "Analysis of the pregnancy outcomes in pregnant women with COVID-19 in Hubei Province]",
  "DOI": "10.3760/cma.j.cn112141-20200218-00111",
  "Count": 5
}, {
  "Atitle": "Analysis of myocardial injury in patients with COVID-19 and association between concomitant cardiovascular diseases and severity of COVID-19]",
  "DOI": "10.3760/cma.j.cn112148-20200225-00123",
  "Count": 5
}, {
  "Atitle": "Recommendations for general surgery clinical practice in 2019 coronavirus disease situation]",
  "DOI": "10.3760/cma.j.issn.0529-5815.2020.03.003",
  "Count": 5
}, {
  "Atitle": "Clinical features of 2019 novel coronavirus pneumonia in the early stage from a fever clinic in Beijing",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.0013",
  "Count": 5
}, {
  "Atitle": "Ethics preparedness for infectious disease outbreaks research in India: A case for novel coronavirus disease 2019",
  "DOI": "10.4103/ijmr.IJMR_463_20",
  "Count": 5
}, {
  "Atitle": "Prudent public health intervention strategies to control the coronavirus disease 2019 transmission in India: A mathematical model-based approach",
  "DOI": "10.4103/ijmr.IJMR_504_20",
  "Count": 5
}, {
  "Atitle": "Epidemiologic characteristics of early cases with 2019 novel coronavirus (2019-nCoV disease in Korea",
  "DOI": "10.4178/epih.e2020007",
  "Count": 5
}, {
  "Atitle": "Getting ready for the next pandemic COVID-19: Why we need to be more prepared and less scared",
  "DOI": "10.5055/jem.2020.046",
  "Count": 5
}, {
  "Atitle": "Clinical characteristics and therapeutic procedure for four cases with 2019 novel coronavirus pneumonia receiving combined Chinese and Western medicine treatment",
  "DOI": "10.5582/bst.2020.01030",
  "Count": 5
}, {
  "Atitle": "Targeting the Endocytic Pathway and Autophagy Process as a Novel Therapeutic Strategy in COVID-19",
  "DOI": "10.7150/ijbs.45498.Availablefromhttp://www.ijbs.com/v16p1724.htmGoFileimportinstruction",
  "Count": 5
}, {
  "Atitle": "Clinical course and outcomes of critically ill patients with Middle East respiratory syndrome coronavirus infection",
  "DOI": "10.7326/M13-2486",
  "Count": 5
}, {
  "Atitle": "Postacute Care Preparedness for COVID-19: Thinking Ahead",
  "DOI": "10.1001/jama.2020.4686",
  "Count": 4
}, {
  "Atitle": "Practical Aspects of Otolaryngologic Clinical Services During the 2019 Novel Coronavirus Epidemic: An Experience in Hong Kong",
  "DOI": "10.1001/jamaoto.2020.0488",
  "Count": 4
}, {
  "Atitle": "A guideline for homology modeling of the proteins from newly discovered betacoronavirus, 2019 novel coronavirus (2019-nCoV",
  "DOI": "10.1002/jmv.25768",
  "Count": 4
}, {
  "Atitle": "ISUOG Safety Committee Position Statement: safe performance of obstetric and gynecological scans and equipment cleaning in the context of COVID-19",
  "DOI": "10.1002/uog.22027",
  "Count": 4
}, {
  "Atitle": "Zinc-binding of the cysteine-rich domain encoded in the open reading frame of 1B of the RNA polymerase gene of coronavirus",
  "DOI": "10.1007/978-1-4615-1899-0_70",
  "Count": 4
}, {
  "Atitle": "Coronavirus disease 2019: initial chest CT findings",
  "DOI": "10.1007/s00330-020-06816-7",
  "Count": 4
}, {
  "Atitle": "CT image visual quantitative evaluation and clinical classification of coronavirus disease (COVID-19",
  "DOI": "10.1007/s00330-020-06817-6",
  "Count": 4
}, {
  "Atitle": "A Unique Protease Cleavage Site Predicted in the Spike Protein of the Novel Pneumonia Coronavirus (2019-nCoV Potentially Related to Viral Transmissibility",
  "DOI": "10.1007/s12250-020-00212-7",
  "Count": 4
}, {
  "Atitle": "Safety and efficacy of different anesthetic regimens for parturients with COVID-19 undergoing Cesarean delivery: a case series of 17 patients",
  "DOI": "10.1007/s12630-020-01630-7",
  "Count": 4
}, {
  "Atitle": "Corona Virus International Public Health Emergencies: Implications for Radiology Management",
  "DOI": "10.1016/j.acra.2020.02.003",
  "Count": 4
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus on inanimate surfaces: A risk for health care transmission",
  "DOI": "10.1016/j.ajic.2016.05.006",
  "Count": 4
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus transmission among health care workers: Implication for infection control",
  "DOI": "10.1016/j.ajic.2017.08.010",
  "Count": 4
}, {
  "Atitle": "Infection control influence of Middle East respiratory syndrome coronavirus: A hospital-based analysis",
  "DOI": "10.1016/j.ajic.2018.09.015",
  "Count": 4
}, {
  "Atitle": "Antibody-dependent SARS coronavirus infection is mediated by antibodies against spike proteins",
  "DOI": "10.1016/j.bbrc.2014.07.090",
  "Count": 4
}, {
  "Atitle": "Procalcitonin in patients with severe coronavirus disease 2019 (COVID-19: A meta-analysis",
  "DOI": "10.1016/j.cca.2020.03.004",
  "Count": 4
}, {
  "Atitle": "Computers and viral diseases. Preliminary bioinformatics studies on the design of a synthetic vaccine and a preventative peptidomimetic antagonist against the SARS-CoV-2 (2019-nCoV, COVID-19 coronavirus",
  "DOI": "10.1016/j.compbiomed.2020.103670",
  "Count": 4
}, {
  "Atitle": "Timely blood glucose management for the outbreak of 2019 novel coronavirus disease (COVID-19 is urgently needed",
  "DOI": "10.1016/j.diabres.2020.108118",
  "Count": 4
}, {
  "Atitle": "Catheterization Laboratory Considerations During the Coronavirus (COVID-19 Pandemic: From ACC�s Interventional Council and SCAI",
  "DOI": "10.1016/j.jacc.2020.03.021",
  "Count": 4
}, {
  "Atitle": "COVID-19 & Beyond: Micro-practices for Burnout Prevention and Emotional Wellness",
  "DOI": "10.1016/j.jacr.2020.03.013",
  "Count": 4
}, {
  "Atitle": "Survival of aerosolized coronavirus in the ambient air",
  "DOI": "10.1016/j.jaerosci.2017.09.009",
  "Count": 4
}, {
  "Atitle": "Preparation of virus-like particle mimetic nanovesicles displaying the S protein of Middle East respiratory syndrome coronavirus using insect cells",
  "DOI": "10.1016/j.jbiotec.2019.10.007",
  "Count": 4
}, {
  "Atitle": "Exploring the reasons for healthcare workers infected with novel coronavirus disease 2019 (COVID-19 in China",
  "DOI": "10.1016/j.jhin.2020.03.002",
  "Count": 4
}, {
  "Atitle": "Clinical and computed tomographic imaging features of novel coronavirus pneumonia caused by SARS-CoV-2",
  "DOI": "10.1016/j.jinf.2020.02.017",
  "Count": 4
}, {
  "Atitle": "Traditional Chinese medicine is a resource for drug discovery against 2019 novel coronavirus (SARS-CoV-2",
  "DOI": "10.1016/j.joim.2020.02.004",
  "Count": 4
}, {
  "Atitle": "Development of a SYBR green-based real-time RT-PCR assay for rapid detection of the emerging swine acute diarrhea syndrome coronavirus",
  "DOI": "10.1016/j.jviromet.2018.12.010",
  "Count": 4
}, {
  "Atitle": "Extraordinary GU-rich single-strand RNA identified from SARS coronavirus contributes an excessive innate immune response",
  "DOI": "10.1016/j.micinf.2012.10.008",
  "Count": 4
}, {
  "Atitle": "Measures for diagnosing and treating infections by a novel coronavirus responsible for a pneumonia outbreak originating in Wuhan, China",
  "DOI": "10.1016/j.micinf.2020.01.003",
  "Count": 4
}, {
  "Atitle": "New therapeutic opportunities for COVID-19 patients with Tocilizumab: Possible correlation of interleukin-6 receptor inhibitors with osteonecrosis of the jaws",
  "DOI": "10.1016/j.oraloncology.2020.104659",
  "Count": 4
}, {
  "Atitle": "Psychological crisis interventions in Sichuan Province during the 2019 novel coronavirus outbreak",
  "DOI": "10.1016/j.psychres.2020.112895",
  "Count": 4
}, {
  "Atitle": "COVID-19, una emergencia de salud p�blica mundial",
  "DOI": "10.1016/j.rce.2020.03.001",
  "Count": 4
}, {
  "Atitle": "Patients with respiratory symptoms are at greater risk of COVID-19 transmission",
  "DOI": "10.1016/j.rmed.2020.105935",
  "Count": 4
}, {
  "Atitle": "Positive result of Sars-Cov-2 in sputum from a cured patient with COVID-19",
  "DOI": "10.1016/j.tmaid.2020.101619",
  "Count": 4
}, {
  "Atitle": "Rapid viral diagnosis and ambulatory management of suspected COVID-19 cases presenting at the infectious diseases referral hospital in Marseille, France, - January 31st to March 1st, 2020: A respiratory virus snapshot",
  "DOI": "10.1016/j.tmaid.2020.101632",
  "Count": 4
}, {
  "Atitle": "Derivation of a novel SARS�coronavirus replicon cell line and its application for anti-SARS drug screening",
  "DOI": "10.1016/j.virol.2006.10.016",
  "Count": 4
}, {
  "Atitle": "Induction of innate immune response following infectious bronchitis corona virus infection in the respiratory tract of chickens",
  "DOI": "10.1016/j.virol.2013.12.001",
  "Count": 4
}, {
  "Atitle": "Coronavirus envelope (E protein remains at the site of assembly",
  "DOI": "10.1016/j.virol.2015.02.005",
  "Count": 4
}, {
  "Atitle": "A complete protocol for whole-genome sequencing of virus from clinical samples: Application to coronavirus OC43",
  "DOI": "10.1016/j.virol.2019.03.006",
  "Count": 4
}, {
  "Atitle": "Coronavirus genomic RNA packaging",
  "DOI": "10.1016/j.virol.2019.08.031",
  "Count": 4
}, {
  "Atitle": "The molecular biology of coronaviruses",
  "DOI": "10.1016/S0065-3527(06)66005-3",
  "Count": 4
}, {
  "Atitle": "Glycyrrhizin, an active component of liquorice roots, and replication of SARS-associated coronavirus",
  "DOI": "10.1016/S0140-6736(03)13615-X",
  "Count": 4
}, {
  "Atitle": "Interhuman transmissibility of Middle East respiratory syndrome coronavirus: estimation of pandemic risk",
  "DOI": "10.1016/S0140-6736(13)61492-0",
  "Count": 4
}, {
  "Atitle": "Will heat kill the coronavirus?",
  "DOI": "10.1016/S0262-4079(20)30377-8",
  "Count": 4
}, {
  "Atitle": "Risk of COVID-19 for cancer patients",
  "DOI": "10.1016/S1470-2045(20)30150-9",
  "Count": 4
}, {
  "Atitle": "Cancer care in the time of COVID-19",
  "DOI": "10.1016/S1470-2045(20)30201-1",
  "Count": 4
}, {
  "Atitle": "Challenges of coronavirus disease 2019",
  "DOI": "10.1016/S1473-3099(20)30072-4",
  "Count": 4
}, {
  "Atitle": "Initiation of a new infection control system for the COVID-19 outbreak",
  "DOI": "10.1016/S1473-3099(20)30110-9",
  "Count": 4
}, {
  "Atitle": "An interactive web-based dashboard to track COVID-19 in real time",
  "DOI": "10.1016/S1473-3099(20)30120-1",
  "Count": 4
}, {
  "Atitle": "SARS-CoV-2 RNA more readily detected in induced sputum than in throat swabs of convalescent COVID-19 patients",
  "DOI": "10.1016/S1473-3099(20)30174-2",
  "Count": 4
}, {
  "Atitle": "Therapeutic and triage strategies for 2019 novel coronavirus disease in fever clinics",
  "DOI": "10.1016/S2213-2600(20)30071-0",
  "Count": 4
}, {
  "Atitle": "Novel coronavirus and hospital infection prevention: Preparing for the impromptu speech",
  "DOI": "10.1017/ice.2020.55",
  "Count": 4
}, {
  "Atitle": "Protecting Chinese Healthcare Workers While Combating the 2019 Novel Coronavirus",
  "DOI": "10.1017/ice.2020.60",
  "Count": 4
}, {
  "Atitle": "Putative Receptor Binding Domain of Bat-Derived Coronavirus HKU9 Spike Protein: Evolution of Betacoronavirus Receptor Binding Motifs",
  "DOI": "10.1021/acs.biochem.6b00790",
  "Count": 4
}, {
  "Atitle": "Research and Development on Therapeutic Agents and Vaccines for COVID-19 and Related Human Coronavirus Diseases",
  "DOI": "10.1021/acscentsci.0c00272",
  "Count": 4
}, {
  "Atitle": "Coronavirus latest: global infections pass 100,000",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 4
}, {
  "Atitle": "Coronavirus latest: WHO describes outbreak as pandemic",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 4
}, {
  "Atitle": "How much is coronavirus spreading under the radar?",
  "DOI": "10.1038/d41586-020-00760-8",
  "Count": 4
}, {
  "Atitle": "A year without conferences? How the coronavirus pandemic could change research",
  "DOI": "10.1038/d41586-020-00786-y",
  "Count": 4
}, {
  "Atitle": "Covert coronavirus infections could be seeding new outbreaks",
  "DOI": "10.1038/d41586-020-00822-x",
  "Count": 4
}, {
  "Atitle": "Corrigendum: A SARS-like cluster of circulating bat coronaviruses shows potential for human emergence",
  "DOI": "10.1038/nm0416-446d",
  "Count": 4
}, {
  "Atitle": "Network-based drug repurposing for novel coronavirus 2019-nCoV/SARS-CoV-2",
  "DOI": "10.1038/s41421-020-0153-3",
  "Count": 4
}, {
  "Atitle": "COVID-19 and the crisis of national development",
  "DOI": "10.1038/s41562-020-0852-7",
  "Count": 4
}, {
  "Atitle": "Early events during human coronavirus OC43 entry to the cell",
  "DOI": "10.1038/s41598-018-25640-0",
  "Count": 4
}, {
  "Atitle": "The Covid-19 pandemic and otolaryngology: What it comes down to?]",
  "DOI": "10.1055/a-1095-2344",
  "Count": 4
}, {
  "Atitle": "Importation and Human-to-Human Transmission of a Novel Coronavirus in Vietnam",
  "DOI": "10.1056/NEJMc2001272",
  "Count": 4
}, {
  "Atitle": "Hospital outbreak of Middle East respiratory syndrome coronavirus",
  "DOI": "10.1056/NEJMoa1306742",
  "Count": 4
}, {
  "Atitle": "Inhibitors of cathepsin L prevent severe acute respiratory syndrome coronavirus entry",
  "DOI": "10.1073/pnas.0505577102",
  "Count": 4
}, {
  "Atitle": "Structure of coronavirus hemagglutinin-esterase offers insight into corona and influenza virus evolution",
  "DOI": "10.1073/pnas.0800502105",
  "Count": 4
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-CoV causes transient lower respiratory tract infection in rhesus macaques",
  "DOI": "10.1073/pnas.1310744110",
  "Count": 4
}, {
  "Atitle": "One severe acute respiratory syndrome coronavirus protein complex integrates processive RNA polymerase and exonuclease activities",
  "DOI": "10.1073/pnas.1323705111",
  "Count": 4
}, {
  "Atitle": "Can the Coronavirus Disease 2019 (COVID-19 Affect the Eyes? A Review of Coronaviruses and Ocular Implications in Humans and Animals",
  "DOI": "10.1080/09273948.2020.1738501",
  "Count": 4
}, {
  "Atitle": "Update on therapeutic options for Middle East Respiratory Syndrome Coronavirus (MERS-CoV",
  "DOI": "10.1080/14787210.2017.1271712",
  "Count": 4
}, {
  "Atitle": "Diagnosis and clinical management of severe acute respiratory syndrome Coronavirus 2 (SARS-CoV-2 infection: an operational recommendation of Peking Union Medical College Hospital (V2.0",
  "DOI": "10.1080/22221751.2020.1735265",
  "Count": 4
}, {
  "Atitle": "Immunogenicity and protection efficacy of monomeric and trimeric recombinant SARS coronavirus spike protein subunit vaccine candidates",
  "DOI": "10.1089/vim.2012.0076",
  "Count": 4
}, {
  "Atitle": "Three Emerging Coronaviruses in Two Decades: The Story of SARS, MERS, and Now COVID-19",
  "DOI": "10.1093/ajcp/aqaa029",
  "Count": 4
}, {
  "Atitle": "Covid-19: Protecting Worker Health",
  "DOI": "10.1093/annweh/wxaa033",
  "Count": 4
}, {
  "Atitle": "Consistent detection of 2019 novel coronavirus in saliva",
  "DOI": "10.1093/cid/ciaa149",
  "Count": 4
}, {
  "Atitle": "Clinical Characteristics of Imported Cases of COVID-19 in Jiangsu Province: A Multicenter Descriptive Study",
  "DOI": "10.1093/cid/ciaa199",
  "Count": 4
}, {
  "Atitle": "Genomic diversity of SARS-CoV-2 in Coronavirus Disease 2019 patients",
  "DOI": "10.1093/cid/ciaa203",
  "Count": 4
}, {
  "Atitle": "Perinatal Transmission�of COVID-19 Associated SARS-CoV-2:�Should We Worry?",
  "DOI": "10.1093/cid/ciaa226",
  "Count": 4
}, {
  "Atitle": "The roles of transportation and transportation hubs in the propagation of influenza and coronaviruses: a systematic review",
  "DOI": "10.1093/jtm/tav002",
  "Count": 4
}, {
  "Atitle": "Preventing Infection of Patients and Healthcare Workers Should Be the New Normal in the Era of Novel Coronavirus Epidemics",
  "DOI": "10.1097/ALN.0000000000003295",
  "Count": 4
}, {
  "Atitle": "COVID-19 Infection",
  "DOI": "10.1097/ALN.0000000000003303",
  "Count": 4
}, {
  "Atitle": "The ADP-ribose-1''-monophosphatase domains of severe acute respiratory syndrome coronavirus and human coronavirus 229E mediate resistance to antiviral interferon responses",
  "DOI": "10.1099/vir.0.031856-0",
  "Count": 4
}, {
  "Atitle": "Delayed induction of proinflammatory cytokines and suppression of innate antiviral response by the novel Middle East respiratory syndrome coronavirus: implications for pathogenesis and treatment",
  "DOI": "10.1099/vir.0.055533-0",
  "Count": 4
}, {
  "Atitle": "The novel coronavirus 2019 (2019-nCoV uses the SARS-coronavirus receptor ACE2 and the cellular protease TMPRSS2 for entry into target cells",
  "DOI": "10.1101/2020.01.31.929042",
  "Count": 4
}, {
  "Atitle": "An Effective CTL Peptide Vaccine for Ebola Zaire Based on Survivors' CD8+ Targeting of a Particular Nucleocapsid Protein Epitope with Potential Implications for COVID-19 Vaccine Design",
  "DOI": "10.1101/2020.02.25.963546",
  "Count": 4
}, {
  "Atitle": "COVID-19 will probably accelerate remote working trend",
  "DOI": "10.1108/OXAN-ES251161",
  "Count": 4
}, {
  "Atitle": "Hospital Emergency Management Plan During the COVID-19 Epidemic",
  "DOI": "10.1111/acem.13951",
  "Count": 4
}, {
  "Atitle": "COVID-19: A Global Transplant Perspective on Successfully Navigating a Pandemic",
  "DOI": "10.1111/ajt.15876",
  "Count": 4
}, {
  "Atitle": "Heat inactivation of the M iddle E ast respiratory syndrome coronavirus",
  "DOI": "10.1111/irv.12261",
  "Count": 4
}, {
  "Atitle": "SARS?coronavirus modulation of myocardial ACE2 expression and inflammation in patients with SARS",
  "DOI": "10.1111/j.1365-2362.2009.02153.x",
  "Count": 4
}, {
  "Atitle": "Cutaneous manifestations in COVID-19: a first perspective",
  "DOI": "10.1111/jdv.16387",
  "Count": 4
}, {
  "Atitle": "Preventing the Spread of COVID-19 to Nursing Homes: Experience from a Singapore Geriatric Centre",
  "DOI": "10.1111/jgs.16447",
  "Count": 4
}, {
  "Atitle": "Trust is a key factor in the willingness of health professionals to work during the COVID-19 outbreak: Experience from the H1N1 pandemic in Japan 2009",
  "DOI": "10.1111/pcn.12995",
  "Count": 4
}, {
  "Atitle": "Molecular evolution of the SARS coronavirus during the course of the SARS epidemic in China",
  "DOI": "10.1126/science.1092002",
  "Count": 4
}, {
  "Atitle": "Can China�s COVID-19 strategy work elsewhere?",
  "DOI": "10.1126/science.367.6482.1061",
  "Count": 4
}, {
  "Atitle": "Study claiming new coronavirus can be transmitted by people without symptoms was flawed",
  "DOI": "10.1126/science.abb1524",
  "Count": 4
}, {
  "Atitle": "Aggregated mobility data could help fight COVID-19",
  "DOI": "10.1126/science.abb8021",
  "Count": 4
}, {
  "Atitle": "Coronavirus HKU1 and Other Coronavirus Infections in Hong Kong",
  "DOI": "10.1128/JCM.02614-05",
  "Count": 4
}, {
  "Atitle": "Coronavirus Endoribonuclease and Deubiquitinating Interferon Antagonists Differentially Modulate the Host Response during Replication in Macrophages",
  "DOI": "10.1128/JVI.00178-20",
  "Count": 4
}, {
  "Atitle": "Covid-19: UK budget gives �94 a week statutory sick pay to self-isolators and their carers",
  "DOI": "10.1136/bmj.m1001",
  "Count": 4
}, {
  "Atitle": "Covid-19: how doctors and healthcare systems are tackling coronavirus worldwide",
  "DOI": "10.1136/bmj.m1090",
  "Count": 4
}, {
  "Atitle": "Epidemiological, clinical and virological characteristics of 74 cases of coronavirus-infected disease 2019 (COVID-19 with gastrointestinal symptoms",
  "DOI": "10.1136/gutjnl-2020-320926",
  "Count": 4
}, {
  "Atitle": "Practical laboratory considerations amidst the COVID-19 outbreak: early experience from Singapore",
  "DOI": "10.1136/jclinpath-2020-206563",
  "Count": 4
}, {
  "Atitle": "Pet dog confirmed to have coronavirus",
  "DOI": "10.1136/vr.m892",
  "Count": 4
}, {
  "Atitle": "Chest CT Findings in 2019 Novel Coronavirus (2019-nCoV Infections from Wuhan, China: Key Points for the Radiologist",
  "DOI": "10.1148/radiol.2020200241",
  "Count": 4
}, {
  "Atitle": "Performance of radiologists in differentiating COVID-19 from viral pneumonia on chest CT",
  "DOI": "10.1148/radiol.2020200823",
  "Count": 4
}, {
  "Atitle": "Novel Wuhan (2019-nCoV Coronavirus",
  "DOI": "10.1164/rccm.2014P7",
  "Count": 4
}, {
  "Atitle": "Ventilatory Ratio in Hypercapnic Mechanically Ventilated Patients with COVID-19 Associated ARDS",
  "DOI": "10.1164/rccm.202002-0373LE",
  "Count": 4
}, {
  "Atitle": "Rising to the Challenge of the Novel SARS-coronavirus-2 (SARS-CoV-2: Advice for Pulmonary and Critical Care and an Agenda for Research",
  "DOI": "10.1164/rccm.202003-0741ED",
  "Count": 4
}, {
  "Atitle": "Visualising the expansion and spread of coronavirus disease 2019 by cartograms",
  "DOI": "10.1177/0308518X20910162",
  "Count": 4
}, {
  "Atitle": "Challenges and Countermeasures of Integrative Cancer Therapy in the Epidemic of COVID-19",
  "DOI": "10.1177/1534735420912811",
  "Count": 4
}, {
  "Atitle": "Coronavirus envelope protein: current knowledge",
  "DOI": "10.1186/s12985-019-1182-0",
  "Count": 4
}, {
  "Atitle": "Outcome of Oncology Patients Infected With Coronavirus",
  "DOI": "10.1200/GO.20.00064",
  "Count": 4
}, {
  "Atitle": "Recommendations for Endotracheal Intubation of COVID-19 Patients",
  "DOI": "10.1213/ANE.0000000000004803",
  "Count": 4
}, {
  "Atitle": "The Effects of Social Support on Sleep Quality of Medical Staff Treating Patients with Coronavirus Disease 2019 (COVID-19 in January and February 2020 in China",
  "DOI": "10.12659/MSM.923549",
  "Count": 4
}, {
  "Atitle": "Feline coronavirus antibody titer in cerebrospinal fluid from cats with neurological signs",
  "DOI": "10.1292/jvms.17-0399",
  "Count": 4
}, {
  "Atitle": "Infections without borders: a new coronavirus in Wuhan, China",
  "DOI": "10.12968/bjon.2020.29.3.166",
  "Count": 4
}, {
  "Atitle": "Characterization of Human Coronavirus Etiology in Chinese Adults with Acute Upper Respiratory Tract Infection by Real-Time RT-PCR Assays",
  "DOI": "10.1371/journal.pone.0038638",
  "Count": 4
}, {
  "Atitle": "Modeling the Transmission of Middle East Respirator Syndrome Corona Virus in the Republic of Korea",
  "DOI": "10.1371/journal.pone.0144778",
  "Count": 4
}, {
  "Atitle": "Association of radiologic findings with mortality of patients infected with 2019 novel coronavirus in Wuhan, China",
  "DOI": "10.1371/journal.pone.0230548",
  "Count": 4
}, {
  "Atitle": "Zn 2+ Inhibits Coronavirus and Arterivirus RNA Polymerase Activity In Vitro and Zinc Ionophores Block the Replication of These Viruses in Cell Culture (Zn 2+ Inhibits Nidovirus Replication",
  "DOI": "10.1371/journal.ppat.1001176",
  "Count": 4
}, {
  "Atitle": "Characterization and inhibition of SARS-coronavirus main protease",
  "DOI": "10.2174/156802606776287090",
  "Count": 4
}, {
  "Atitle": "Antiviral strategies against human coronaviruses",
  "DOI": "10.2174/187152607780090757",
  "Count": 4
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19: Role of Chest CT in Diagnosis and Management",
  "DOI": "10.2214/AJR.20.22954",
  "Count": 4
}, {
  "Atitle": "Recent developments in anti-severe acute respiratory syndrome coronavirus chemotherapy",
  "DOI": "10.2217/fvl.11.33",
  "Count": 4
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: current knowledge and future considerations",
  "DOI": "10.26719/2016.22.7.533",
  "Count": 4
}, {
  "Atitle": "Post-discharge surveillance and positive virus detection in two medical staff recovered from coronavirus disease 2019 (COVID-19, China, January to February 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.10.2000191",
  "Count": 4
}, {
  "Atitle": "Note from the editors: World Health Organization declares novel coronavirus (2019-nCoV sixth public health emergency of international concern",
  "DOI": "10.2807/1560-7917.ES.2020.25.5.200131e",
  "Count": 4
}, {
  "Atitle": "Early transmission patterns of coronavirus disease 2019 (COVID-19 in travellers from Wuhan to Thailand, January 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.8.2000097",
  "Count": 4
}, {
  "Atitle": "Authors' response: Plenty of coronaviruses but no SARS-CoV-2",
  "DOI": "10.2807/1560-7917.ES.2020.25.8.2000197",
  "Count": 4
}, {
  "Atitle": "Effects of coronavirus infections in children",
  "DOI": "10.3201/eid1602.090469",
  "Count": 4
}, {
  "Atitle": "Risk Factors for Primary Middle East Respiratory Syndrome Coronavirus Illness in Humans, Saudi Arabia, 2014",
  "DOI": "10.3201/eid2201.151340",
  "Count": 4
}, {
  "Atitle": "Early Introduction of Severe Acute Respiratory Syndrome Coronavirus 2 into Europe",
  "DOI": "10.3201/eid2607.200359",
  "Count": 4
}, {
  "Atitle": "COVID-19, Australia: Epidemiology Report 6 (Reporting week ending 19:00 AEDT 7 March 2020",
  "DOI": "10.33321/cdi.2020.44.21",
  "Count": 4
}, {
  "Atitle": "The First Case of 2019 Novel Coronavirus Pneumonia Imported into Korea from Wuhan, China: Implication for Infection Prevention and Control Measures",
  "DOI": "10.3346/jkms.2020.35.e61",
  "Count": 4
}, {
  "Atitle": "Novel Coronavirus Pneumonia Outbreak in 2019: Computed Tomographic Findings in Two Cases",
  "DOI": "10.3348/kjr.2020.0078",
  "Count": 4
}, {
  "Atitle": "A Patient with COVID-19 Presenting a False-Negative Reverse Transcriptase Polymerase Chain Reaction Result",
  "DOI": "10.3348/kjr.2020.0195",
  "Count": 4
}, {
  "Atitle": "Identification of Diverse Bat Alphacoronaviruses and Betacoronaviruses in China Provides New Insights Into the Evolution and Origin of Coronavirus-Related Diseases",
  "DOI": "10.3389/fmicb.2019.01900",
  "Count": 4
}, {
  "Atitle": "The Extent of Transmission of Novel Coronavirus in Wuhan, China, 2020",
  "DOI": "10.3390/jcm9020330",
  "Count": 4
}, {
  "Atitle": "2019 Novel Coronavirus Disease (COVID-19: Paving the Road for Rapid Detection and Point-of-Care Diagnostics",
  "DOI": "10.3390/mi11030306",
  "Count": 4
}, {
  "Atitle": "Emergence of Novel Coronavirus 2019-nCoV: Need for Rapid Vaccine and Biologics Development",
  "DOI": "10.3390/pathogens9020148",
  "Count": 4
}, {
  "Atitle": "Potential Maternal and Infant Outcomes from (Wuhan Coronavirus 2019-nCoV Infecting Pregnant Women: Lessons from SARS, MERS, and Other Human Coronavirus Infections",
  "DOI": "10.3390/v12020194",
  "Count": 4
}, {
  "Atitle": "Efficient management of novel coronavirus pneumonia by efficient prevention and control in scientific manner",
  "DOI": "10.3760/cma.issn.1001-0939.2020.03.002",
  "Count": 4
}, {
  "Atitle": "Prone ventilation for novel coronavirus pneumonia: no time to delay",
  "DOI": "10.3760/cma.j.cn112138-20200304-00184",
  "Count": 4
}, {
  "Atitle": "Analysis of bronchoscope-guided tracheal intubation in 12 cases with COVID-19 under the personal protective equipment with positive pressure protective hood]",
  "DOI": "10.3760/cma.j.cn112147-20200222-00153",
  "Count": 4
}, {
  "Atitle": "Cause analysis and treatment strategies of \"recurrence\" with novel coronavirus pneumonia (covid-19 patients after discharge from hospital]",
  "DOI": "10.3760/cma.j.cn112147-20200229-00219",
  "Count": 4
}, {
  "Atitle": "Health protection guideline of mobile cabin hospitals during Novel Coronavirus Pneumonia (NPC outbreak]",
  "DOI": "10.3760/cma.j.cn112150-20200217-00121",
  "Count": 4
}, {
  "Atitle": "Epidemiological analysis on 1 052 cases of COVID-19 in epidemic clusters]",
  "DOI": "10.3760/cma.j.cn112338-20200301-00223",
  "Count": 4
}, {
  "Atitle": "2019 novel coronavirus infection in a three-month-old baby]",
  "DOI": "10.3760/cma.j.issn.0578-1310.2020.03.004",
  "Count": 4
}, {
  "Atitle": "Expert consensus for bronchoscopy during the epidemic of 2019 novel coronavirus infection (Trial version]",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.03.012",
  "Count": 4
}, {
  "Atitle": "Preliminary study of the relationship between novel coronavirus pneumonia and liver function damage: a multicenter study]",
  "DOI": "10.3760/cma.j.issn.1007-3418.2020.02.003",
  "Count": 4
}, {
  "Atitle": "A Chinese Case of COVID-19 Did Not Show Infectivity During the Incubation Period: Based on an Epidemiological Survey",
  "DOI": "10.3961/jpmph.20.048",
  "Count": 4
}, {
  "Atitle": "Understanding COVID-19 new diagnostic guidelines - a message of reassurance from an internal medicine doctor in Shanghai",
  "DOI": "10.4414/smw.2020.20216",
  "Count": 4
}, {
  "Atitle": "Is A Problem Shared, A Problem Halved? Not Always! The Novel Coronavirus COVID-19 Outbreak",
  "DOI": "10.5005/jp-journals-10071-23365",
  "Count": 4
}, {
  "Atitle": "Detection of corona virus antigen by ELISA from diarrhoeic cow calves in Mathura, India.(RESEARCH(Report",
  "DOI": "10.5455/vetworld.2012.166-168",
  "Count": 4
}, {
  "Atitle": "Coronavirus Infections in Pediatric Outpatients with Febrile Respiratory Tract Infections in Hiroshima, Japan, over a 3-Year Period",
  "DOI": "10.7883/yoken.JJID.2014.591",
  "Count": 4
}, {
  "Atitle": "COVID-19New Insights on a Rapidly Changing Epidemic",
  "DOI": "10.1001/jama.2020.3072",
  "Count": 3
}, {
  "Atitle": "Response to COVID-19 in Taiwan",
  "DOI": "10.1001/jama.2020.3151",
  "Count": 3
}, {
  "Atitle": "Stopping the Spread of COVID-19",
  "DOI": "10.1001/jama.2020.4269",
  "Count": 3
}, {
  "Atitle": "Turbulent Gas Clouds and Respiratory Pathogen Emissions: Potential Implications for Reducing Transmission of COVID-19",
  "DOI": "10.1001/jama.2020.4756",
  "Count": 3
}, {
  "Atitle": "An Acute Respiratory Infection Runs Into the Most Common Noncommunicable Epidemic-COVID-19 and Cardiovascular Diseases",
  "DOI": "10.1001/jamacardio.2020.0934",
  "Count": 3
}, {
  "Atitle": "Hematologic parameters in patients with COVID-19 infection",
  "DOI": "10.1002/ajh.25774",
  "Count": 3
}, {
  "Atitle": "COVID-19 and mycoplasma pneumoniae coinfection",
  "DOI": "10.1002/ajh.25785",
  "Count": 3
}, {
  "Atitle": "Combination of RT-qPCR testing and clinical features for diagnosis of COVID-19 facilitates management of SARS-CoV-2 outbreak",
  "DOI": "10.1002/jmv.25721",
  "Count": 3
}, {
  "Atitle": "Fecal specimen diagnosis 2019 novel coronavirus-infected pneumonia",
  "DOI": "10.1002/jmv.25742",
  "Count": 3
}, {
  "Atitle": "Under the epidemic situation of COVID-19, should special attention to pregnant women be given?",
  "DOI": "10.1002/jmv.25771",
  "Count": 3
}, {
  "Atitle": "Coronavirus genome structure and replication",
  "DOI": "10.1007/3-540-26765-4_1",
  "Count": 3
}, {
  "Atitle": "Electrocardiographic changes following rabbit coronavirus-induced myocarditis and dilated cardiomyopathy",
  "DOI": "10.1007/978-1-4615-2996-5_56",
  "Count": 3
}, {
  "Atitle": "The effect of ascorbic acid on infection chick-embryo ciliated tracheal organ cultures by coronavirus",
  "DOI": "10.1007/bf01317848",
  "Count": 3
}, {
  "Atitle": "Novel coronavirus infection during the 2019-2020 epidemic: preparing intensive care units-the experience in Sichuan Province, China",
  "DOI": "10.1007/s00134-020-05954-2",
  "Count": 3
}, {
  "Atitle": "COVID-19: a novel coronavirus and a novel challenge for critical care",
  "DOI": "10.1007/s00134-020-05955-1",
  "Count": 3
}, {
  "Atitle": "Biochemical characterization of a recombinant SARS coronavirus nsp12 RNA-dependent RNA polymerase capable of copying viral RNA templates",
  "DOI": "10.1007/s00705-012-1404-x",
  "Count": 3
}, {
  "Atitle": "COVID-19: opportunity arises from a world health crisis",
  "DOI": "10.1007/s10928-020-09681-5",
  "Count": 3
}, {
  "Atitle": "Clinical trials for the treatment of Coronavirus disease 2019 (COVID-19: A rapid response to urgent need",
  "DOI": "10.1007/s11427-020-1660-2",
  "Count": 3
}, {
  "Atitle": "Structural insights into coronavirus entry",
  "DOI": "10.1016/bs.aivir.2019.08.002",
  "Count": 3
}, {
  "Atitle": "The Emerging Pandemic of Coronavirus: The Urgent Need for Public Health Leadership",
  "DOI": "10.1016/j.amjmed.2020.03.001",
  "Count": 3
}, {
  "Atitle": "Inhibition of human coronavirus 229E infection in human epithelial lung cells (L132 by chloroquine: Involvement of p38 MAPK and ERK",
  "DOI": "10.1016/j.antiviral.2007.10.011",
  "Count": 3
}, {
  "Atitle": "Receptor recognition and cross-species infections of SARS coronavirus",
  "DOI": "10.1016/j.antiviral.2013.08.014",
  "Count": 3
}, {
  "Atitle": "Structural model of the SARS coronavirus E channel in LMPG micelles",
  "DOI": "10.1016/j.bbamem.2018.02.017",
  "Count": 3
}, {
  "Atitle": "Construction of a non-infectious SARS coronavirus replicon for application in drug screening and analysis of viral protein function",
  "DOI": "10.1016/j.bbrc.2008.06.129",
  "Count": 3
}, {
  "Atitle": "Synthetic virus-like particles prepared via protein corona formation enable effective vaccination in an avian model of coronavirus infection",
  "DOI": "10.1016/j.biomaterials.2016.08.018",
  "Count": 3
}, {
  "Atitle": "Asymptomatic novel coronavirus pneumonia patient outside Wuhan: The value of CT images in the course of the disease",
  "DOI": "10.1016/j.clinimag.2020.02.008",
  "Count": 3
}, {
  "Atitle": "Probable Pangolin Origin of SARS-CoV-2 Associated with the COVID-19 Outbreak",
  "DOI": "10.1016/j.cub.2020.03.022",
  "Count": 3
}, {
  "Atitle": "Serial interval of novel coronavirus (COVID-19 infections",
  "DOI": "10.1016/j.ijid.2020.02.060",
  "Count": 3
}, {
  "Atitle": "SARS-CoV-2 turned positive in a discharged patient with COVID-19 arouses concern regarding the present standard for discharge",
  "DOI": "10.1016/j.ijid.2020.03.007",
  "Count": 3
}, {
  "Atitle": "The effectiveness of quarantine and isolation determine the trend of the COVID-19 epidemics in the final phase of the current outbreak in China",
  "DOI": "10.1016/j.ijid.2020.03.018",
  "Count": 3
}, {
  "Atitle": "COVID-19 OUTBREAK IN NORTHERN ITALY: FIRST PRACTICAL INDICATIONS FOR RADIOTHERAPY DEPARTMENTS",
  "DOI": "10.1016/j.ijrobp.2020.03.007",
  "Count": 3
}, {
  "Atitle": "The non-contact handheld cutaneous infra-red thermometer for fever screening during the COVID-19 global emergency",
  "DOI": "10.1016/j.jhin.2020.02.010",
  "Count": 3
}, {
  "Atitle": "Emergence of a novel coronavirus causing respiratory illness from Wuhan, China",
  "DOI": "10.1016/j.jinf.2020.01.014",
  "Count": 3
}, {
  "Atitle": "The Progression of Computed Tomographic (CT Images in Patients with Coronavirus Disease (COVID-19 Pneumonia: The CT progression of COVID-19 pneumonia",
  "DOI": "10.1016/j.jinf.2020.03.020",
  "Count": 3
}, {
  "Atitle": "Are Saudi medical students aware of middle east respiratory syndrome coronavirus during an outbreak?",
  "DOI": "10.1016/j.jiph.2016.06.013",
  "Count": 3
}, {
  "Atitle": "Climate factors and incidence of Middle East respiratory syndrome coronavirus",
  "DOI": "10.1016/j.jiph.2019.11.011",
  "Count": 3
}, {
  "Atitle": "Middle East Respiratory Syndrome-Corona Virus (MERS-CoV associated stress among medical students at a university teaching hospital in Saudi Arabia",
  "DOI": "10.1016/j.jiph.2020.01.005",
  "Count": 3
}, {
  "Atitle": "Interrupting COVID-19 transmission by implementing enhanced traffic control bundling: Implications for global prevention and control efforts",
  "DOI": "10.1016/j.jmii.2020.03.011",
  "Count": 3
}, {
  "Atitle": "Inactivation and safety testing of Middle East Respiratory Syndrome Coronavirus",
  "DOI": "10.1016/j.jviromet.2015.07.002",
  "Count": 3
}, {
  "Atitle": "Guide to Understanding the 2019 Novel Coronavirus",
  "DOI": "10.1016/j.mayocp.2020.02.003",
  "Count": 3
}, {
  "Atitle": "Comparison of clinical characteristics of coronavirus disease (COVID-19 and severe acute respiratory syndrome (SARS as experienced in Taiwan",
  "DOI": "10.1016/j.tmaid.2020.101625",
  "Count": 3
}, {
  "Atitle": "Predicting the impacts of epidemic outbreaks on global supply chains: A simulation-based analysis on the coronavirus outbreak (COVID-19/SARS-CoV-2 case",
  "DOI": "10.1016/j.tre.2020.101922",
  "Count": 3
}, {
  "Atitle": "SARS-CoV related Betacoronavirus and diverse Alphacoronavirus members found in western old-world",
  "DOI": "10.1016/j.virol.2018.01.014",
  "Count": 3
}, {
  "Atitle": "Replication of human coronaviruses SARS-CoV, HCoV-NL63 and HCoV-229E is inhibited by the drug FK506",
  "DOI": "10.1016/j.virusres.2012.02.002",
  "Count": 3
}, {
  "Atitle": "Serological assays for emerging coronaviruses: challenges and pitfalls",
  "DOI": "10.1016/j.virusres.2014.03.018",
  "Count": 3
}, {
  "Atitle": "Alisporivir inhibits MERS- and SARS-coronavirus replication in cell culture, but not SARS-coronavirus infection in a mouse model",
  "DOI": "10.1016/j.virusres.2016.11.011",
  "Count": 3
}, {
  "Atitle": "Characterization of novel monoclonal antibodies against MERS-coronavirus spike protein",
  "DOI": "10.1016/j.virusres.2020.197863",
  "Count": 3
}, {
  "Atitle": "Survival of surrogate coronaviruses in water",
  "DOI": "10.1016/j.watres.2009.02.002",
  "Count": 3
}, {
  "Atitle": "Viral shedding patterns of coronavirus in patients with probable severe acute respiratory syndrome",
  "DOI": "10.1016/S0140-6736(04)16255-7",
  "Count": 3
}, {
  "Atitle": "Scientists are sprinting to outpace the novel coronavirus",
  "DOI": "10.1016/S0140-6736(20)30420-7",
  "Count": 3
}, {
  "Atitle": "Comorbidities and multi-organ injuries in the treatment of COVID-19",
  "DOI": "10.1016/S0140-6736(20)30558-4",
  "Count": 3
}, {
  "Atitle": "Protecting health-care workers from subclinical coronavirus infection",
  "DOI": "10.1016/S2213-2600(20)30066-7",
  "Count": 3
}, {
  "Atitle": "COVID-19 in Italy: momentous decisions and many uncertainties",
  "DOI": "10.1016/S2214-109X(20)30110-8",
  "Count": 3
}, {
  "Atitle": "The neglected health of international migrant workers in the COVID-19 epidemic",
  "DOI": "10.1016/S2215-0366(20)30076-6",
  "Count": 3
}, {
  "Atitle": "Mental health services for older adults in China during the COVID-19 outbreak",
  "DOI": "10.1016/S2215-0366(20)30079-1",
  "Count": 3
}, {
  "Atitle": "COVID-19 in a patient with chronic lymphocytic leukaemia",
  "DOI": "10.1016/S2352-3026(20)30074-0",
  "Count": 3
}, {
  "Atitle": "Liver injury in COVID-19: management and challenges",
  "DOI": "10.1016/S2468-1253(20)30057-1",
  "Count": 3
}, {
  "Atitle": "COVID-19 and the consequences of isolating the elderly",
  "DOI": "10.1016/S2468-2667(20)30061-X",
  "Count": 3
}, {
  "Atitle": "Involving Antimicrobial Stewardship Programs in COVID-19 Response Efforts: All Hands on Deck",
  "DOI": "10.1017/ice.2020.69",
  "Count": 3
}, {
  "Atitle": "Specific plant terpenoids and lignoids possess potent antiviral activities against severe acute respiratory syndrome coronavirus",
  "DOI": "10.1021/jm070295s",
  "Count": 3
}, {
  "Atitle": "Broad reception for coronavirus",
  "DOI": "10.1038/495176a",
  "Count": 3
}, {
  "Atitle": "SARS coronavirus entry into host cells through a novel clathrin- and caveolae-independent endocytic pathway",
  "DOI": "10.1038/cr.2008.15",
  "Count": 3
}, {
  "Atitle": "Coronavirus: global solutions to prevent a pandemic",
  "DOI": "10.1038/d41586-020-00457-y",
  "Count": 3
}, {
  "Atitle": "Labs rush to study coronavirus in transgenic animals - some are in short supply",
  "DOI": "10.1038/d41586-020-00698-x",
  "Count": 3
}, {
  "Atitle": "Scientists exposed to coronavirus wonder: why weren�t we notified?",
  "DOI": "10.1038/d41586-020-00823-w",
  "Count": 3
}, {
  "Atitle": "Coronavirus lockdown: What I learnt when I shut my cancer lab in 48 hours",
  "DOI": "10.1038/d41586-020-00826-7",
  "Count": 3
}, {
  "Atitle": "What the cruise-ship outbreaks reveal about COVID-19",
  "DOI": "10.1038/d41586-020-00885-w",
  "Count": 3
}, {
  "Atitle": "Should scientists infect healthy people with the coronavirus to test vaccines?",
  "DOI": "10.1038/d41586-020-00927-3",
  "Count": 3
}, {
  "Atitle": "Coronavirus puts drug repurposing on the fast track",
  "DOI": "10.1038/d41587-020-00003-1",
  "Count": 3
}, {
  "Atitle": "Nigeria responds to COVID-19; first case detected in sub-Saharan Africa",
  "DOI": "10.1038/d41591-020-00004-2",
  "Count": 3
}, {
  "Atitle": "Understanding the T cell immune response in SARS coronavirus infection",
  "DOI": "10.1038/emi.2012.26",
  "Count": 3
}, {
  "Atitle": "Systematic, active surveillance for Middle East respiratory syndrome coronavirus in camels in Egypt",
  "DOI": "10.1038/emi.2016.130",
  "Count": 3
}, {
  "Atitle": "Deadly coronavirus found in bats",
  "DOI": "10.1038/nature.2013.13597",
  "Count": 3
}, {
  "Atitle": "Dipeptidyl peptidase 4 is a functional receptor for the emerging human coronavirus-EMC",
  "DOI": "10.1038/nature12005",
  "Count": 3
}, {
  "Atitle": "Coronaviruses - drug discovery and therapeutic options",
  "DOI": "10.1038/nrd.2015.37",
  "Count": 3
}, {
  "Atitle": "Glycan shield and epitope masking of a coronavirus spike protein observed by cryo-electron microscopy",
  "DOI": "10.1038/nsmb.3293",
  "Count": 3
}, {
  "Atitle": "A novel human coronavirus OC43 genotype detected in mainland China",
  "DOI": "10.1038/s41426-018-0171-5",
  "Count": 3
}, {
  "Atitle": "COVID-19: faecal-oral transmission?",
  "DOI": "10.1038/s41575-020-0295-7",
  "Count": 3
}, {
  "Atitle": "Epidemiological data from the COVID-19 outbreak, real-time case information",
  "DOI": "10.1038/s41597-020-0448-0",
  "Count": 3
}, {
  "Atitle": "Detection and characterisation of coronaviruses in migratory and non-migratory Australian wild birds",
  "DOI": "10.1038/s41598-018-24407-x",
  "Count": 3
}, {
  "Atitle": "White-nose syndrome is associated with increased replication of a naturally persisting coronaviruses in bats",
  "DOI": "10.1038/s41598-018-33975-x",
  "Count": 3
}, {
  "Atitle": "Genome Organization of Canada Goose Coronavirus, A Novel Species Identified in a Mass Die-off of Canada Geese",
  "DOI": "10.1038/s41598-019-42355-y",
  "Count": 3
}, {
  "Atitle": "Receptor and viral determinants of SARS-coronavirus adaptation to human ACE2",
  "DOI": "10.1038/sj.emboj.7600640",
  "Count": 3
}, {
  "Atitle": "RNA aptamer-based sensitive detection of SARS coronavirus nucleocapsid protein",
  "DOI": "10.1039/b906788d",
  "Count": 3
}, {
  "Atitle": "Anesthetic Management of Patients With Suspected or Confirmed 2019 Novel Coronavirus Infection During Emergency Procedures",
  "DOI": "10.1053/j.jvca.2020.02.039",
  "Count": 3
}, {
  "Atitle": "Journey of a Thai Taxi Driver and Novel Coronavirus",
  "DOI": "10.1056/NEJMc2001621",
  "Count": 3
}, {
  "Atitle": "Audio Interview: Making Decisions about Covid-19 Testing and Treatment for Your Patients",
  "DOI": "10.1056/NEJMe2004856",
  "Count": 3
}, {
  "Atitle": "Responding to Covid-19 - A Once-in-a-Century Pandemic?",
  "DOI": "10.1056/NEJMp2003762",
  "Count": 3
}, {
  "Atitle": "Covid-19  The Law and Limits of Quarantine",
  "DOI": "10.1056/NEJMp2004211",
  "Count": 3
}, {
  "Atitle": "Small Molecules Targeting Severe Acute Respiratory Syndrome Human Coronavirus",
  "DOI": "10.1073/pnas.0403596101",
  "Count": 3
}, {
  "Atitle": "RNA 3'-end mismatch excision by the severe acute respiratory syndrome coronavirus nonstructural protein nsp10/nsp14 exoribonuclease complex",
  "DOI": "10.1073/pnas.1201130109",
  "Count": 3
}, {
  "Atitle": "Reverse genetics with a full-length infectious cDNA of the Middle East respiratory syndrome coronavirus",
  "DOI": "10.1073/pnas.1311542110",
  "Count": 3
}, {
  "Atitle": "Mouse-adapted MERS coronavirus causes lethal lung disease in human DPP4 knockin mice",
  "DOI": "10.1073/pnas.1619109114",
  "Count": 3
}, {
  "Atitle": "2019 novel coronavirus: an emerging global threat",
  "DOI": "10.1080/08998280.2020.1731272",
  "Count": 3
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-CoV: animal to human interaction",
  "DOI": "10.1080/20477724.2015.1122852",
  "Count": 3
}, {
  "Atitle": "Understanding bat SARS-like coronaviruses for the preparation of future coronavirus outbreaks  Implications for coronavirus vaccine development",
  "DOI": "10.1080/21645515.2016.1228500",
  "Count": 3
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus on hospital surfaces",
  "DOI": "10.1086/422652",
  "Count": 3
}, {
  "Atitle": "Airborne Severe Acute Respiratory Syndrome Coronavirus and Its Implications",
  "DOI": "10.1086/429637",
  "Count": 3
}, {
  "Atitle": "Coronavirus Survival on Healthcare Personal Protective Equipment",
  "DOI": "10.1086/652452",
  "Count": 3
}, {
  "Atitle": "What Have We Learned About Middle East Respiratory Syndrome Coronavirus Emergence in Humans? A Systematic Literature Review",
  "DOI": "10.1089/vbz.2017.2191",
  "Count": 3
}, {
  "Atitle": "Genome Detective Coronavirus Typing Tool for rapid identification and characterization of novel coronavirus genomes",
  "DOI": "10.1093/bioinformatics/btaa145",
  "Count": 3
}, {
  "Atitle": "Diagnosis and Management of First Case of COVID-19 in Canada: Lessons applied from SARS",
  "DOI": "10.1093/cid/ciaa227",
  "Count": 3
}, {
  "Atitle": "Molecular Diagnosis of a Novel Coronavirus (2019-nCoV Causing an Outbreak of Pneumonia",
  "DOI": "10.1093/clinchem/hvaa029",
  "Count": 3
}, {
  "Atitle": "Emergence of a Novel Coronavirus Disease (COVID-19 and the Importance of Diagnostic Testing: Why Partnership between Clinical Laboratories, Public Health Agencies, and Industry Is Essential to Control the Outbreak",
  "DOI": "10.1093/clinchem/hvaa071",
  "Count": 3
}, {
  "Atitle": "Are patients with inflammatory bowel disease at increased risk for Covid-19 infection?",
  "DOI": "10.1093/ecco-jcc/jjaa061",
  "Count": 3
}, {
  "Atitle": "Coronaviruses: a paradigm of new emerging zoonotic diseases",
  "DOI": "10.1093/femspd/ftaa006",
  "Count": 3
}, {
  "Atitle": "Clinical impact of human coronaviruses 229E and OC43 infection in diverse adult populations",
  "DOI": "10.1093/infdis/jit393",
  "Count": 3
}, {
  "Atitle": "Novel coronavirus (2019-nCoV:  Update on 3rd Coronavirus Outbreak of 21st Century",
  "DOI": "10.1093/qjmed/hcaa081",
  "Count": 3
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus pathogenesis, disease and vaccines: an update",
  "DOI": "10.1097/01.inf.0000144666.95284.05",
  "Count": 3
}, {
  "Atitle": "Six weeks into the 2019 coronavirus disease (COVID-19 outbreak- it is time to consider strategies to impede the emergence of new zoonotic infections",
  "DOI": "10.1097/CM9.0000000000000760",
  "Count": 3
}, {
  "Atitle": "Diagnosis and Treatment Plan for COVID-19 (Trial Version 6",
  "DOI": "10.1097/CM9.0000000000000819",
  "Count": 3
}, {
  "Atitle": "Effect of isolation practice on the transmission of middle east respiratory syndrome coronavirus among hemodialysis patients: A 2-year prospective cohort study",
  "DOI": "10.1097/MD.0000000000018782",
  "Count": 3
}, {
  "Atitle": "Chest CT Findings in Patients with Corona Virus Disease 2019 and its Relationship with Clinical Features",
  "DOI": "10.1097/RLI.0000000000000670",
  "Count": 3
}, {
  "Atitle": "Managing COVID-19 in Surgical Systems",
  "DOI": "10.1097/SLA.0000000000003923",
  "Count": 3
}, {
  "Atitle": "Discovery of a novel coronavirus associated with the recent pneumonia outbreak in humans and its potential bat origin",
  "DOI": "10.1101/2020.01.22.914952",
  "Count": 3
}, {
  "Atitle": "Machine learning analysis of genomic signatures provides evidence of associations between Wuhan 2019-nCoV and bat betacoronaviruses",
  "DOI": "10.1101/2020.02.03.932350",
  "Count": 3
}, {
  "Atitle": "Inactivating porcine coronavirus before nuclei acid isolation with the temperature higher than 56 �C damages its genome integrity seriously",
  "DOI": "10.1101/2020.02.20.958785",
  "Count": 3
}, {
  "Atitle": "Screening of FDA-approved drugs using a MERS-CoV clinical isolate from South Korea identifies potential therapeutic options for COVID-19",
  "DOI": "10.1101/2020.02.25.965582",
  "Count": 3
}, {
  "Atitle": "An ultrasensitive, rapid, and portable coronavirus SARS-CoV-2 sequence detection method based on CRISPR-Cas12",
  "DOI": "10.1101/2020.02.29.971127",
  "Count": 3
}, {
  "Atitle": "A data-driven drug repositioning framework discovered a potential therapeutic agent targeting COVID-19",
  "DOI": "10.1101/2020.03.11.986836",
  "Count": 3
}, {
  "Atitle": "Coronavirus adds to longer-term drags on oil demand",
  "DOI": "10.1108/OXAN-DB250744",
  "Count": 3
}, {
  "Atitle": "Lack of nasal carriage of novel corona virus in French Hajj pilgrims returning from the Hajj 2012, despite a high rate of respiratory symptoms",
  "DOI": "10.1111/1469-0691.12174",
  "Count": 3
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus not detected in children hospitalized with acute respiratory illness in Amman, Jordan, March 2010 to September 2012",
  "DOI": "10.1111/1469-0691.12438",
  "Count": 3
}, {
  "Atitle": "Initial Public Health Response and Interim Clinical Guidance for the 2019 Novel Coronavirus Outbreak  United States, December 31, 2019�February 4, 2020",
  "DOI": "10.1111/ajt.15805",
  "Count": 3
}, {
  "Atitle": "COVID-19 and Economy",
  "DOI": "10.1111/dth.13329",
  "Count": 3
}, {
  "Atitle": "Heat sensitivity of a SARS?associated coronavirus introduced into plasma products",
  "DOI": "10.1111/j.1423-0410.2004.00577.x",
  "Count": 3
}, {
  "Atitle": "Evaluation of inactivation methods for severe acute respiratory syndrome coronavirus in noncellular blood products",
  "DOI": "10.1111/j.1537-2995.2006.00976.x",
  "Count": 3
}, {
  "Atitle": "Severe Acute Respiratory Syndrome Associated Coronavirus Is Detected in Intestinal Tissues of Fatal Cases",
  "DOI": "10.1111/j.1572-0241.2005.40377.x",
  "Count": 3
}, {
  "Atitle": "Abnormal coagulation parameters are associated with poor prognosis in patients with novel coronavirus pneumonia",
  "DOI": "10.1111/jth.14768",
  "Count": 3
}, {
  "Atitle": "Prepare to adapt: Blood supply and transfusion support during the first 2 weeks of the 2019 Novel Coronavirus (COVID-19 pandemic affecting Washington State",
  "DOI": "10.1111/trf.15789",
  "Count": 3
}, {
  "Atitle": "Preventing COVID-19 prejudice in academia",
  "DOI": "10.1126/science.abb4870",
  "Count": 3
}, {
  "Atitle": "Differentiation between Human Coronaviruses NL63 and 229E Using a Novel Double-Antibody Sandwich Enzyme-Linked Immunosorbent Assay Based on Specific Monoclonal Antibodies",
  "DOI": "10.1128/CVI.00355-10",
  "Count": 3
}, {
  "Atitle": "Antibody to virus components in volunteers experimentally infected with human coronavirus 229E group viruses",
  "DOI": "10.1128/IAI.31.3.845-849.1981",
  "Count": 3
}, {
  "Atitle": "Receptor recognition by novel coronavirus from Wuhan: An analysis based on decade-long structural studies of SARS",
  "DOI": "10.1128/JVI.00127-20",
  "Count": 3
}, {
  "Atitle": "Comparative analysis of 22 coronavirus HKU1 genomes reveals a novel genotype and evidence of natural recombination in coronavirus HKU1",
  "DOI": "10.1128/JVI.00509-06",
  "Count": 3
}, {
  "Atitle": "Identification of a receptor-binding domain in the S protein of the novel human coronavirus Middle East respiratory syndrome coronavirus as an essential target for vaccine development",
  "DOI": "10.1128/JVI.01048-13",
  "Count": 3
}, {
  "Atitle": "Entry of Human Coronavirus NL63 into the Cell",
  "DOI": "10.1128/JVI.01933-17",
  "Count": 3
}, {
  "Atitle": "ACE2 Receptor Expression and Severe Acute Respiratory Syndrome Coronavirus Infection Depend on Differentiation of Human Airway Epithelia",
  "DOI": "10.1128/JVI.79.23.14614-14621.2005",
  "Count": 3
}, {
  "Atitle": "Covid-19: UK ramps up testing by 500% as health minister tests positive for virus",
  "DOI": "10.1136/bmj.m1003",
  "Count": 3
}, {
  "Atitle": "Covid-19: Trump cancels all flights from Europe, apart from the UK",
  "DOI": "10.1136/bmj.m1037",
  "Count": 3
}, {
  "Atitle": "On the front lines of coronavirus: the Italian response to covid-19",
  "DOI": "10.1136/bmj.m1065",
  "Count": 3
}, {
  "Atitle": "Covid-19: UK starts social distancing after new model points to 260?000 potential deaths",
  "DOI": "10.1136/bmj.m1089",
  "Count": 3
}, {
  "Atitle": "Covid-19: pregnant doctors should speak to occupational health, say experts",
  "DOI": "10.1136/bmj.m1104",
  "Count": 3
}, {
  "Atitle": "Covid-19: all non-urgent elective surgery is suspended for at least three months in England",
  "DOI": "10.1136/bmj.m1106",
  "Count": 3
}, {
  "Atitle": "Covid-19: control measures must be equitable and inclusive",
  "DOI": "10.1136/bmj.m1141",
  "Count": 3
}, {
  "Atitle": "Covid-19: medical students to be employed by NHS as part of epidemic response",
  "DOI": "10.1136/bmj.m1156",
  "Count": 3
}, {
  "Atitle": "WHO must prioritise the needs of older people in its response to the covid-19 pandemic",
  "DOI": "10.1136/bmj.m1164",
  "Count": 3
}, {
  "Atitle": "Covid-19: Trump declares intention to �re-open economy� within weeks against experts� advice",
  "DOI": "10.1136/bmj.m1217",
  "Count": 3
}, {
  "Atitle": "Following the evidence, from coronavirus to terrorism response",
  "DOI": "10.1136/bmj.m344",
  "Count": 3
}, {
  "Atitle": "Covid-19: school closures and bans on mass gatherings will need to be considered, says England�s CMO",
  "DOI": "10.1136/bmj.m806",
  "Count": 3
}, {
  "Atitle": "Covid-19: out-of-hours providers are drafted in to manage non-urgent patients in community",
  "DOI": "10.1136/bmj.m959",
  "Count": 3
}, {
  "Atitle": "Challenges and responsibilities of family doctors in the new global coronavirus outbreak",
  "DOI": "10.1136/fmch-2020-000333",
  "Count": 3
}, {
  "Atitle": "CT Imaging of the 2019 Novel Coronavirus (2019-nCoV Pneumonia",
  "DOI": "10.1148/radiol.2020200236",
  "Count": 3
}, {
  "Atitle": "Emerging 2019 Novel Coronavirus (2019-nCoV Pneumonia",
  "DOI": "10.1148/radiol.2020200274",
  "Count": 3
}, {
  "Atitle": "Pre- and Posttreatment Chest CT Findings: 2019 Novel Coronavirus (2019-nCoV Pneumonia",
  "DOI": "10.1148/radiol.2020200323",
  "Count": 3
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19: A Perspective from                     China",
  "DOI": "10.1148/radiol.2020200490",
  "Count": 3
}, {
  "Atitle": "Impact of Coronavirus Disease 2019 (COVID-19 Outbreak on ST-Segment-Elevation Myocardial Infarction Care in Hong Kong, China",
  "DOI": "10.1161/CIRCOUTCOMES.120.006631",
  "Count": 3
}, {
  "Atitle": "A Comparative Review of Animal Models of Middle East Respiratory Syndrome Coronavirus Infection",
  "DOI": "10.1177/0300985815620845",
  "Count": 3
}, {
  "Atitle": "Detection of feline coronavirus in cerebrospinal fluid for diagnosis of feline infectious peritonitis in cats with and without neurological signs",
  "DOI": "10.1177/1098612X15574757",
  "Count": 3
}, {
  "Atitle": "Feline coronavirus quantitative reverse transcriptase polymerase chain reaction on effusion samples in cats with and without feline infectious peritonitis",
  "DOI": "10.1177/1098612X15606957",
  "Count": 3
}, {
  "Atitle": "Report of middle east respiratory syndrome coronavirus (MERSCoV infection in four patients with hematological malignancies treated at king fahad medical City, Riyadh, Saudi Arabia",
  "DOI": "10.1182/blood.V128.22.4903.4903",
  "Count": 3
}, {
  "Atitle": "A novel pancoronavirus RT-PCR assay: frequent detection of human coronavirus NL63 in children hospitalized with respiratory tract infections in Belgium",
  "DOI": "10.1186/1471-2334-5-6",
  "Count": 3
}, {
  "Atitle": "Investigation of Antibody-Dependent Enhancement (ADE of SARS coronavirus infection and its role in pathogenesis of SARS",
  "DOI": "10.1186/1753-6561-5-s1-p80",
  "Count": 3
}, {
  "Atitle": "Coronaviruses and the human airway: a universal system for virus-host interaction studies",
  "DOI": "10.1186/s12985-016-0479-5",
  "Count": 3
}, {
  "Atitle": "A mathematical model for simulating the phase-based transmissibility of a novel coronavirus",
  "DOI": "10.1186/s40249-020-00640-3",
  "Count": 3
}, {
  "Atitle": "Porcine innate and adaptative immune responses to influenza and coronavirus infections",
  "DOI": "10.1196/annals.1373.014",
  "Count": 3
}, {
  "Atitle": "Angiotensin II for the Treatment of COVID-19-Related Vasodilatory Shock",
  "DOI": "10.1213/ANE.0000000000004825",
  "Count": 3
}, {
  "Atitle": "The transmissibility of novel Coronavirus in the early stages of the 2019-20 outbreak in Wuhan: Exploring initial point-source exposure sizes and durations using scenario analysis version 1; peer review: awaiting peer review]",
  "DOI": "10.12688/wellcomeopenres.15718.1",
  "Count": 3
}, {
  "Atitle": "Immunization with SARS Coronavirus Vaccines Leads to Pulmonary Immunopathology on Challenge with the SARS Virus",
  "DOI": "10.1371/journal.pone.0035421",
  "Count": 3
}, {
  "Atitle": "Lack of Innate Interferon Responses during SARS Coronavirus Infection in a Vaccination and Reinfection Ferret Model (IFN Responses of SARS CoV Infection in Ferrets",
  "DOI": "10.1371/journal.pone.0045842",
  "Count": 3
}, {
  "Atitle": "Functional and Genetic Analysis of Coronavirus Replicase-Transcriptase Proteins (MHV-A59 Replicase-Transcriptase Proteins",
  "DOI": "10.1371/journal.ppat.0010039",
  "Count": 3
}, {
  "Atitle": "Communication, transparency key as Canada faces new coronavirus threat",
  "DOI": "10.1503/cmaj.1095846",
  "Count": 3
}, {
  "Atitle": "The Novel Coronavirus: A Bird's Eye View",
  "DOI": "10.15171/ijoem.2020.1921",
  "Count": 3
}, {
  "Atitle": "SARS Coronavirus E Protein in Phospholipid Bilayers: An X-Ray Study",
  "DOI": "10.1529/biophysj.105.072892",
  "Count": 3
}, {
  "Atitle": "COVID-19 in a Long-Term Care Facility - King County, Washington, February 27-March 9, 2020",
  "DOI": "10.15585/mmwr.mm6912e1",
  "Count": 3
}, {
  "Atitle": "Infection control measures for the prevention of MERS coronavirus transmission in healthcare settings",
  "DOI": "10.1586/14787210.2016.1135053",
  "Count": 3
}, {
  "Atitle": "COVID-19 coronavirus: what implications for Cardiology?]",
  "DOI": "10.1714/3328.32981",
  "Count": 3
}, {
  "Atitle": "COVID-19. The only certainty is the uncertainty]",
  "DOI": "10.17992/lbl.2020.03.469",
  "Count": 3
}, {
  "Atitle": "Middle east respiratory syndrome corona virus spike glycoprotein suppresses macrophage responses via DPP4-mediated induction of IRAK-M and PPAR?",
  "DOI": "10.18632/oncotarget.14754",
  "Count": 3
}, {
  "Atitle": "Statistics-Based Predictions of Coronavirus Epidemic Spreading in Mainland China",
  "DOI": "10.20535/ibb.2020.4.1.195074",
  "Count": 3
}, {
  "Atitle": "Chinese expert consensus on the perinatal and neonatal management for the prevention and control of the 2019 novel coronavirus infection (First edition",
  "DOI": "10.21037/atm.2020.02.20",
  "Count": 3
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19 Pneumonia: Early Stage Chest CT Imaging Features and Clinical Relevance",
  "DOI": "10.2139/ssrn.3543606",
  "Count": 3
}, {
  "Atitle": "Estimation Of Direct Medical Costs Of Middle East Respiratory Syndrome Coronavirus Infection: A Single-Center Retrospective Chart Review Study",
  "DOI": "10.2147/IDR.S231087",
  "Count": 3
}, {
  "Atitle": "Understanding Human Coronavirus HCoV-NL63",
  "DOI": "10.2174/1874357901004010076",
  "Count": 3
}, {
  "Atitle": "Radiology Perspective of Coronavirus Disease 2019 (COVID-19: Lessons From Severe Acute Respiratory Syndrome and Middle East Respiratory Syndrome",
  "DOI": "10.2214/AJR.20.22969",
  "Count": 3
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19: A Systematic Review of Imaging Findings in 919 Patients",
  "DOI": "10.2214/AJR.20.23034",
  "Count": 3
}, {
  "Atitle": "Is regulation preventing the development of therapeutics that may prevent future coronavirus pandemics?",
  "DOI": "10.2217/fvl-2017-0143",
  "Count": 3
}, {
  "Atitle": "Urology practice during COVID-19 pandemic",
  "DOI": "10.23736/S0393-2249.20.03846-1",
  "Count": 3
}, {
  "Atitle": "Impact of COVID-19 outbreak on rehabilitation services and Physical and Rehabilitation Medicine (PRM physicians' activities in Italy. An official document of the Italian PRM Society (SIMFER",
  "DOI": "10.23736/S1973-9087.20.06256-5",
  "Count": 3
}, {
  "Atitle": "WHO Declares COVID-19 a Pandemic",
  "DOI": "10.23750/abm.v91i1.9397",
  "Count": 3
}, {
  "Atitle": "Early Epidemiological and Clinical Characteristics of 28 Cases of Coronavirus Disease in South Korea",
  "DOI": "10.24171/j.phrp.2020.11.1.03",
  "Count": 3
}, {
  "Atitle": "Emergence of novel coronavirus: global context",
  "DOI": "10.26719/2013.19.supp1.S5",
  "Count": 3
}, {
  "Atitle": "Enhanced surveillance and investigation of coronavirus: what is required?/Surveillance et recherche renforcees pour le coronavirus: quels sont les besoins?(Short communication(Report",
  "DOI": "10.26719/2013.19.supp1.S55",
  "Count": 3
}, {
  "Atitle": "Laboratory readiness and response for novel coronavirus (2019-nCoV in expert laboratories in 30 EU/EEA countries, January 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.6.2000082",
  "Count": 3
}, {
  "Atitle": "Letter to the editor: Plenty of coronaviruses but no SARS-CoV-2",
  "DOI": "10.2807/1560-7917.ES.2020.25.8.2000171",
  "Count": 3
}, {
  "Atitle": "Updated rapid risk assessment from ECDC on the outbreak of COVID-19: increased transmission globally",
  "DOI": "10.2807/1560-7917.ES.2020.25.9.2003051",
  "Count": 3
}, {
  "Atitle": "Air Medical Evacuation of Nepalese Citizen During Epidemic of COVID-19 from Wuhan to Nepal",
  "DOI": "10.31729/jnma.4857",
  "Count": 3
}, {
  "Atitle": "Possible SARS coronavirus transmission during cardiopulmonary resuscitation",
  "DOI": "10.3201/eid1002.030700",
  "Count": 3
}, {
  "Atitle": "Detection of SARS-associated coronavirus in throat wash and saliva in early diagnosis",
  "DOI": "10.3201/eid1007.031113",
  "Count": 3
}, {
  "Atitle": "SARS-associated coronavirus transmitted from human to pig",
  "DOI": "10.3201/eid1103.040824",
  "Count": 3
}, {
  "Atitle": "Asymptomatic SARS coronavirus infection among healthcare workers, Singapore",
  "DOI": "10.3201/eid1107.041165",
  "Count": 3
}, {
  "Atitle": "Genetically Diverse Coronaviruses in Wild Bird Populations of Northern England",
  "DOI": "10.3201/eid1507.090067",
  "Count": 3
}, {
  "Atitle": "Human infection with MERS coronavirus after exposure to infected camels, Saudi Arabia, 2013",
  "DOI": "10.3201/eid2006.140402",
  "Count": 3
}, {
  "Atitle": "Enhanced MERS coronavirus surveillance of travelers from the Middle East to England",
  "DOI": "10.3201/eid2009.140817",
  "Count": 3
}, {
  "Atitle": "Transmission of Middle East Respiratory Syndrome Coronavirus Infections in Healthcare Settings, Abu Dhabi",
  "DOI": "10.3201/eid2204.151615",
  "Count": 3
}, {
  "Atitle": "Serial Interval of COVID-19 among Publicly Reported Confirmed Cases",
  "DOI": "10.3201/eid2606.200357",
  "Count": 3
}, {
  "Atitle": "COVID-19, Australia: Epidemiology Report 5 (Reporting week ending 19:00 AEDT 29 February 2020",
  "DOI": "10.33321/cdi.2020.44.20",
  "Count": 3
}, {
  "Atitle": "Report on the Epidemiological Features of Coronavirus Disease 2019 (COVID-19 Outbreak in the Republic of Korea from January 19 to March 2, 2020",
  "DOI": "10.3346/jkms.2020.35.e112",
  "Count": 3
}, {
  "Atitle": "Human Coronaviruses: A Review of Virus-Host Interactions",
  "DOI": "10.3390/diseases4030026",
  "Count": 3
}, {
  "Atitle": "Estimating the Unreported Number of Novel Coronavirus (2019-nCoV Cases in China in the First Half of January 2020: A Data-Driven Modelling Analysis of the Early Outbreak; PMC7074332",
  "DOI": "10.3390/jcm9020388",
  "Count": 3
}, {
  "Atitle": "The Rate of Underascertainment of Novel Coronavirus (2019-nCoV Infection: Estimation Using Japanese Passengers Data on Evacuation Flights",
  "DOI": "10.3390/jcm9020419",
  "Count": 3
}, {
  "Atitle": "Risk Management Analysis for Novel Coronavirus in Wuhan, China",
  "DOI": "10.3390/jrfm13020022",
  "Count": 3
}, {
  "Atitle": "From SARS to MERS, Thrusting Coronaviruses into the Spotlight",
  "DOI": "10.3390/v11010059",
  "Count": 3
}, {
  "Atitle": "The Coronavirus Nucleocapsid Is a Multifunctional Protein",
  "DOI": "10.3390/v6082991",
  "Count": 3
}, {
  "Atitle": "In the era of corona virus: health care professionals' knowledge, attitudes, and practice of hand hygiene in Saudi primary care centers: a cross-sectional study",
  "DOI": "10.3402/jchimp.v6.32151",
  "Count": 3
}, {
  "Atitle": "Several suggestions of operation for colorectal cancer under the outbreak of corona virus disease 2019 in China]",
  "DOI": "10.3760/cma.j.cn.441530-20200224-00074",
  "Count": 3
}, {
  "Atitle": "Chemotherapy strategy for colorectal cancer under the outbreak of corona virus disease 2019]",
  "DOI": "10.3760/cma.j.cn.441530-20200225-00089",
  "Count": 3
}, {
  "Atitle": "Genomic analysis of a 2019-nCoV strain in the first COVID-19 patient found in Hangzhou, Zhejiang, China]",
  "DOI": "10.3760/cma.j.cn112150-20200217-00128",
  "Count": 3
}, {
  "Atitle": "Surgical treatment strategy for digestive system malignancies during the outbreak of novel coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.cn112152-20200223-00117",
  "Count": 3
}, {
  "Atitle": "Diagnostic and therapeutic strategies of lung cancer patients during the outbreak of 2019 novel coronavirus disease (COVID-19]",
  "DOI": "10.3760/cma.j.cn112152-20200229-00152",
  "Count": 3
}, {
  "Atitle": "RETRACTED]Potential false-positive rate among the 'asymptomatic infected individuals' in close contacts of COVID-19 patients]",
  "DOI": "10.3760/cma.j.cn112338-20200221-00144",
  "Count": 3
}, {
  "Atitle": "COVID-19 Pandemic: global epidemiological trends and China's subsequent preparedness and responses]",
  "DOI": "10.3760/cma.j.cn112338-20200301-00222",
  "Count": 3
}, {
  "Atitle": "Clinical features of respiratory coronavirus infections and relationship to otolaryngology]",
  "DOI": "10.3760/cma.j.cn115330-20200227-00135",
  "Count": 3
}, {
  "Atitle": "Clinical characteristics and influencing factors of patients with novel coronavirus pneumonia combined with liver injury in Shaanxi region]",
  "DOI": "10.3760/cma.j.cn501113-20200226-00070",
  "Count": 3
}, {
  "Atitle": "Advances in the research of mechanism of pulmonary fibrosis induced by Corona Virus Disease 2019 and the corresponding therapeutic measures]",
  "DOI": "10.3760/cma.j.cn501120-20200307-00132",
  "Count": 3
}, {
  "Atitle": "The network investigation on knowledge, attitude and practice about Novel coronavirus pneumonia of the residents in Anhui Province]",
  "DOI": "10.3760/cma.j.issn.0253-9624.2020.0004",
  "Count": 3
}, {
  "Atitle": "Interpretation of \"Guidelines for the Diagnosis and Treatment of Novel Coronavirus (2019-nCoV Infection by the National Health Commission (Trial Version 5",
  "DOI": "10.3760/cma.j.issn.0376-2491.2020.0001",
  "Count": 3
}, {
  "Atitle": "Pulmonary rehabilitation guidelines in the principle of 4S for patients infected with 2019 novel coronavirus (2019-nCoV]",
  "DOI": "10.3760/cma.j.issn.1001-0939.2020.0004",
  "Count": 3
}, {
  "Atitle": "Suggestions for prevention of 2019 novel coronavirus infection in otolaryngology head and neck surgery medical staff]",
  "DOI": "10.3760/cma.j.issn.1673-0860.2020.0001",
  "Count": 3
}, {
  "Atitle": "Production of Pseudotyped Particles to Study Highly Pathogenic Coronaviruses in a Biosafety Level 2 Setting",
  "DOI": "10.3791/59010",
  "Count": 3
}, {
  "Atitle": "Fear of the novel coronavirus",
  "DOI": "10.3855/jidc.12496",
  "Count": 3
}, {
  "Atitle": "Ethical Perspectives on the Middle East Respiratory Syndrome Coronavirus Epidemic in Korea",
  "DOI": "10.3961/jpmph.16.013",
  "Count": 3
}, {
  "Atitle": "Therapeutic options for the treatment of 2019-novel coronavirus: An evidence-based approach",
  "DOI": "10.4103/ijp.IJP_119_20",
  "Count": 3
}, {
  "Atitle": "COVID-19 epidemic in Switzerland: on the importance of testing, contact tracing and isolation",
  "DOI": "10.4414/smw.2020.20225",
  "Count": 3
}, {
  "Atitle": "Tabletop exercise to prepare institutions of higher education for an outbreak of COVID-19",
  "DOI": "10.5055/jem.2020.0463",
  "Count": 3
}, {
  "Atitle": "The COVID-19 outbreak and psychiatric hospitals in China: managing challenges through mental health service reform",
  "DOI": "10.7150/ijbs.45072.Availablefromhttp://www.ijbs.com/v16p1741.htmGoFileimportinstruction",
  "Count": 3
}, {
  "Atitle": "COVID-19 and the Risk to Health Care Workers: A Case Report",
  "DOI": "10.7326/L20-0175",
  "Count": 3
}, {
  "Atitle": "Publishing in the time of COVID-19",
  "DOI": "10.7554/eLife.57162",
  "Count": 3
}, {
  "Atitle": "Priorities for the US Health Community Responding to COVID-19",
  "DOI": "10.1001/jama.2020.3413",
  "Count": 2
}, {
  "Atitle": "Antibodies in Infants Born to Mothers With COVID-19 Pneumonia",
  "DOI": "10.1001/jama.2020.4861",
  "Count": 2
}, {
  "Atitle": "What does $8 billion for coronavirus say about opioid funding?",
  "DOI": "10.1002/adaw.32658",
  "Count": 2
}, {
  "Atitle": "Considerations for Cardiac Catheterization Laboratory Procedures During the COVID-19 Pandemic Perspectives from the Society for Cardiovascular Angiography and Interventions Emerging Leader Mentorship (SCAI ELM Members and Graduates",
  "DOI": "10.1002/ccd.28887",
  "Count": 2
}, {
  "Atitle": "Machine Learning, COVID-19 (2019-nCoV, and multi-OMICS",
  "DOI": "10.1002/cyto.a.23990",
  "Count": 2
}, {
  "Atitle": "COVID-19: Vulnerability and the power of privilege in a pandemic",
  "DOI": "10.1002/hpja.333",
  "Count": 2
}, {
  "Atitle": "Modulation of the immune response by Middle East respiratory syndrome coronavirus",
  "DOI": "10.1002/jcp.27155",
  "Count": 2
}, {
  "Atitle": "Homologous recombination within the spike glycoprotein of the newly identified coronavirus may boost cross-species transmission from snake to human",
  "DOI": "10.1002/jmv.25682",
  "Count": 2
}, {
  "Atitle": "Is novel coronavirus disease (COVID-19 transmitted through conjunctiva?",
  "DOI": "10.1002/jmv.25753",
  "Count": 2
}, {
  "Atitle": "Exploring the pathogenesis of severe acute respiratory syndrome (SARS: the tissue distribution of the coronavirus (SARS?CoV and its putative receptor, angiotensin?converting enzyme 2 (ACE2",
  "DOI": "10.1002/path.1597",
  "Count": 2
}, {
  "Atitle": "Pathogenesis of Middle East respiratory syndrome coronavirus",
  "DOI": "10.1002/path.4458",
  "Count": 2
}, {
  "Atitle": "Evaluation of nested polymerase chain methods for the detection of human coronaviruses 229E and OC43",
  "DOI": "10.1006/mcpr.1994.1052",
  "Count": 2
}, {
  "Atitle": "Large-Scale Preparation of UV-Inactivated SARS Coronavirus Virions for Vaccine Antigen",
  "DOI": "10.1007/978-1-59745-181-9_11",
  "Count": 2
}, {
  "Atitle": "Detection of SARS Coronavirus",
  "DOI": "10.1007/978-1-60761-817-1UL20",
  "Count": 2
}, {
  "Atitle": "Angiotensin-converting enzyme 2: a functional receptor for SARS coronavirus",
  "DOI": "10.1007/s00018-004-4242-5",
  "Count": 2
}, {
  "Atitle": "Critical care crisis and some recommendations during the COVID-19 epidemic in China",
  "DOI": "10.1007/s00134-020-05979-7",
  "Count": 2
}, {
  "Atitle": "Clinical features and short-term outcomes of 18 patients with corona virus disease 2019 in intensive care unit",
  "DOI": "10.1007/s00134-020-05987-7",
  "Count": 2
}, {
  "Atitle": "How to balance acute myocardial infarction and COVID-19: the protocols from Sichuan Provincial People's Hospital",
  "DOI": "10.1007/s00134-020-05993-9",
  "Count": 2
}, {
  "Atitle": "18F-FDG PET/CT findings of COVID-19: a series of four highly suspected cases",
  "DOI": "10.1007/s00259-020-04734-w",
  "Count": 2
}, {
  "Atitle": "18F-FDG PET/CT and COVID-19",
  "DOI": "10.1007/s00259-020-04762-6",
  "Count": 2
}, {
  "Atitle": "Outbreak of novel coronavirus (COVID-19: What is the role of radiologists?",
  "DOI": "10.1007/s00330-020-06748-2",
  "Count": 2
}, {
  "Atitle": "Two deletion variants of Middle East respiratory syndrome coronavirus found in a patient with characteristic symptoms",
  "DOI": "10.1007/s00705-017-3361-x",
  "Count": 2
}, {
  "Atitle": "Coronavirus COVID-19 impacts to dentistry and potential salivary diagnosis",
  "DOI": "10.1007/s00784-020-03248-x",
  "Count": 2
}, {
  "Atitle": "Effects of humidity and other factors on the generation and sampling of a coronavirus aerosol",
  "DOI": "10.1007/s10453-007-9068-9",
  "Count": 2
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: current situation and travel-associated concerns",
  "DOI": "10.1007/s11684-016-0446-y",
  "Count": 2
}, {
  "Atitle": "Middle East Respiratory Syndrome coronavirus (MERS CoV: Update 2013",
  "DOI": "10.1007/s11908-013-0344-2",
  "Count": 2
}, {
  "Atitle": "T cell-mediated immune response to respiratory coronaviruses",
  "DOI": "10.1007/s12026-014-8534-z",
  "Count": 2
}, {
  "Atitle": "Longitudinal surveillance of SARS-like coronaviruses in bats by quantitative real-time PCR",
  "DOI": "10.1007/s12250-015-3703-3",
  "Count": 2
}, {
  "Atitle": "Coexistence of multiple coronaviruses in several bat colonies in an abandoned mineshaft",
  "DOI": "10.1007/s12250-016-3713-9",
  "Count": 2
}, {
  "Atitle": "The Risk and Prevention of Novel Coronavirus Pneumonia Infections Among Inpatients in Psychiatric Hospitals",
  "DOI": "10.1007/s12264-020-00476-9",
  "Count": 2
}, {
  "Atitle": "Clinical features of pediatric patients with COVID-19: a report of two family cluster cases",
  "DOI": "10.1007/s12519-020-00356-2",
  "Count": 2
}, {
  "Atitle": "Survival of Coronaviruses in Water and Wastewater",
  "DOI": "10.1007/s12560-008-9001-6",
  "Count": 2
}, {
  "Atitle": "The structural and accessory proteins M, ORF 4a, ORF 4b, and ORF 5 of Middle East respiratory syndrome coronavirus (MERS-CoV are potent interferon antagonists",
  "DOI": "10.1007/s13238-013-3096-8",
  "Count": 2
}, {
  "Atitle": "SARS coronavirus papain-like protease inhibits the type I interferon signaling pathway through interaction with the STING-TRAF3-TBK1 complex",
  "DOI": "10.1007/s13238-014-0026-3",
  "Count": 2
}, {
  "Atitle": "Electron microscopy studies of the coronavirus ribonucleoprotein complex",
  "DOI": "10.1007/s13238-016-0352-8",
  "Count": 2
}, {
  "Atitle": "Molecular Basis of Coronavirus Virulence and Vaccine Development",
  "DOI": "10.1016/bs.aivir.2016.08.003",
  "Count": 2
}, {
  "Atitle": "Coronavirus Spike Protein and Tropism Changes",
  "DOI": "10.1016/bs.aivir.2016.08.004",
  "Count": 2
}, {
  "Atitle": "Coronavirus Disease (COVID-19: Spectrum of CT Findings and Temporal Progression of the Disease",
  "DOI": "10.1016/j.acra.2020.03.003",
  "Count": 2
}, {
  "Atitle": "Crisis prevention and management by infection control nurses during the Middle East respiratory coronavirus outbreak in Korea",
  "DOI": "10.1016/j.ajic.2015.10.032",
  "Count": 2
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus intermittent positive cases: Implications for infection control",
  "DOI": "10.1016/j.ajic.2018.08.020",
  "Count": 2
}, {
  "Atitle": "Clinicopathologic, Immunohistochemical, and Ultrastructural Findings of a Fatal Case of Middle East Respiratory Syndrome Coronavirus Infection in the United Arab Emirates, April 2014",
  "DOI": "10.1016/j.ajpath.2015.10.024",
  "Count": 2
}, {
  "Atitle": "Managing COVID-19 in the oncology clinic and avoiding the distraction effect",
  "DOI": "10.1016/j.annonc.2020.03.286",
  "Count": 2
}, {
  "Atitle": "Identification of natural compounds with antiviral activities against SARS-associated coronavirus",
  "DOI": "10.1016/j.antiviral.2005.02.007",
  "Count": 2
}, {
  "Atitle": "Inhibition of feline (FIPV and human (SARS coronavirus by semisynthetic derivatives of glycopeptide antibiotics",
  "DOI": "10.1016/j.antiviral.2006.03.005",
  "Count": 2
}, {
  "Atitle": "Plant lectins are potent inhibitors of coronaviruses by interfering with two targets in the viral replication cycle",
  "DOI": "10.1016/j.antiviral.2007.03.003",
  "Count": 2
}, {
  "Atitle": "IL-22 suppresses the infection of porcine enteric coronaviruses and rotavirus by activating STAT3 signal pathway",
  "DOI": "10.1016/j.antiviral.2017.03.006",
  "Count": 2
}, {
  "Atitle": "The role of epidermal growth factor receptor (EGFR signaling in SARS coronavirus-induced pulmonary fibrosis",
  "DOI": "10.1016/j.antiviral.2017.03.022",
  "Count": 2
}, {
  "Atitle": "Disulfiram can inhibit MERS and SARS coronavirus papain-like proteases via different modes",
  "DOI": "10.1016/j.antiviral.2017.12.015",
  "Count": 2
}, {
  "Atitle": "Crystal structure-based exploration of the important role of Arg106 in the RNA-binding domain of human coronavirus OC43 nucleocapsid protein",
  "DOI": "10.1016/j.bbapap.2013.03.003",
  "Count": 2
}, {
  "Atitle": "TMPRSS2: A potential target for treatment of influenza virus and coronavirus infections",
  "DOI": "10.1016/j.biochi.2017.07.016",
  "Count": 2
}, {
  "Atitle": "Contact lens practice in the time of COVID-19",
  "DOI": "10.1016/j.clae.2020.03.007",
  "Count": 2
}, {
  "Atitle": "MERS coronavirus outbreak: Implications for emerging viral infections",
  "DOI": "10.1016/j.diagmicrobio.2018.10.011",
  "Count": 2
}, {
  "Atitle": "Recent insights into the development of therapeutics against coronavirus diseases by targeting N protein",
  "DOI": "10.1016/j.drudis.2015.11.015",
  "Count": 2
}, {
  "Atitle": "Stability of bovine coronavirus on lettuce surfaces under household refrigeration conditions",
  "DOI": "10.1016/j.fm.2011.12.009",
  "Count": 2
}, {
  "Atitle": "First Cases of COVID-19 in Heart Transplantation From China",
  "DOI": "10.1016/j.healun.2020.03.006",
  "Count": 2
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-CoV  Surveillance and testing in North England from 2012 to 2019",
  "DOI": "10.1016/j.ijid.2020.01.043",
  "Count": 2
}, {
  "Atitle": "Patients of COVID-19 may benefit from sustained lopinavir-combined regimen and the increase of eosinophil may predict the outcome of COVID-19 progression",
  "DOI": "10.1016/j.ijid.2020.03.013",
  "Count": 2
}, {
  "Atitle": "Skin damage among healthcare workers managing coronavirus disease-2019",
  "DOI": "10.1016/j.jaad.2020.03.014",
  "Count": 2
}, {
  "Atitle": "Should biologics for psoriasis be interrupted in the era of COVID-19?",
  "DOI": "10.1016/j.jaad.2020.03.031",
  "Count": 2
}, {
  "Atitle": "COVID-19 infection: origin, transmission, and characteristics of human coronaviruses",
  "DOI": "10.1016/j.jare.2020.03.005",
  "Count": 2
}, {
  "Atitle": "Emerging outbreaks associated with equine coronavirus in adult horses",
  "DOI": "10.1016/j.jevs.2012.08.088",
  "Count": 2
}, {
  "Atitle": "Understanding the emerging coronavirus: what it means for health security and infection prevention",
  "DOI": "10.1016/j.jhin.2020.02.023",
  "Count": 2
}, {
  "Atitle": "Reasons for healthcare workers becoming infected with novel coronavirus disease 2019 (COVID-19 in China",
  "DOI": "10.1016/j.jhin.2020.03.002",
  "Count": 2
}, {
  "Atitle": "Epidemiological characteristics and transmission model of Corona Virus Disease 2019 in China",
  "DOI": "10.1016/j.jinf.2020.03.008",
  "Count": 2
}, {
  "Atitle": "Wuhan and Hubei COVID-19 mortality analysis reveals the critical role of timely supply of medical resources",
  "DOI": "10.1016/j.jinf.2020.03.018",
  "Count": 2
}, {
  "Atitle": "Herd immunity - estimating the level required to halt the COVID-19 epidemics in affected countries",
  "DOI": "10.1016/j.jinf.2020.03.027",
  "Count": 2
}, {
  "Atitle": "The emergence of a new corona virusMERS-CoV: Hind sight is always 20/20",
  "DOI": "10.1016/j.jiph.2013.06.002",
  "Count": 2
}, {
  "Atitle": "A case of COVID-19 and pneumonia returning from Macau in Taiwan: Clinical course and anti-SARS-CoV-2 IgG dynamic",
  "DOI": "10.1016/j.jmii.2020.03.003",
  "Count": 2
}, {
  "Atitle": "Molecular immune pathogenesis and diagnosis of COVID-19",
  "DOI": "10.1016/j.jpha.2020.03.001",
  "Count": 2
}, {
  "Atitle": "Template-based coiled-coil antigens elicit neutralizing antibodies to the SARS-coronavirus",
  "DOI": "10.1016/j.jsb.2006.03.019",
  "Count": 2
}, {
  "Atitle": "Characterization of novel monoclonal antibodies against the MERS-coronavirus spike protein and their application in species-independent antibody detection by competitive ELISA",
  "DOI": "10.1016/j.jviromet.2017.10.008",
  "Count": 2
}, {
  "Atitle": "Analysis of preferred codon usage in the coronavirus N genes and their implications for genome evolution and vaccine design",
  "DOI": "10.1016/j.jviromet.2019.113806",
  "Count": 2
}, {
  "Atitle": "One world, one health: The novel coronavirus COVID-19 epidemic",
  "DOI": "10.1016/j.medcli.2020.02.002",
  "Count": 2
}, {
  "Atitle": "Focus on Middle East respiratory syndrome coronavirus (MERS-CoV",
  "DOI": "10.1016/j.medmal.2019.10.004",
  "Count": 2
}, {
  "Atitle": "Extraordinary GU-rich single-strand RNA identified from SARS coronavirus contributes an excessive innate immune response.(Report",
  "DOI": "10.1016/j.micinf.2012.10.008",
  "Count": 2
}, {
  "Atitle": "Porcine deltacoronavirus nsp15 antagonizes interferon-? production independently of its endoribonuclease activity",
  "DOI": "10.1016/j.molimm.2019.07.003",
  "Count": 2
}, {
  "Atitle": "Biopolymeric nano/microspheres for selective and reversible adsorption of coronaviruses",
  "DOI": "10.1016/j.msec.2017.03.047",
  "Count": 2
}, {
  "Atitle": "Effectiveness of an education health programme about Middle East respiratory syndrome coronavirus tested during travel consultations",
  "DOI": "10.1016/j.puhe.2019.05.017",
  "Count": 2
}, {
  "Atitle": "And now for something completely different: from 2019-nCoV and COVID-19 to 2020-nMan",
  "DOI": "10.1016/j.pulmoe.2020.02.010",
  "Count": 2
}, {
  "Atitle": "Inhibitory effects of glycopyrronium, formoterol, and budesonide on coronavirus HCoV-229E replication and cytokine production by primary cultures of human nasal and tracheal epithelial cells",
  "DOI": "10.1016/j.resinv.2019.12.005",
  "Count": 2
}, {
  "Atitle": "Cellular entry of the SARS coronavirus",
  "DOI": "10.1016/j.tim.2004.08.008",
  "Count": 2
}, {
  "Atitle": "Epidemiology, Genetic Recombination, and Pathogenesis of Coronaviruses",
  "DOI": "10.1016/j.tim.2016.03.003",
  "Count": 2
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-CoV: Prevention in travelers",
  "DOI": "10.1016/j.tmaid.2014.10.006",
  "Count": 2
}, {
  "Atitle": "A Systematic Review of therapeutic agents for the treatment of the Middle East Respiratory Syndrome Coronavirus (MERS-CoV",
  "DOI": "10.1016/j.tmaid.2019.06.012",
  "Count": 2
}, {
  "Atitle": "A double-inactivated whole virus candidate SARS coronavirus vaccine stimulates neutralising and protective antibody responses",
  "DOI": "10.1016/j.vaccine.2005.08.055",
  "Count": 2
}, {
  "Atitle": "Induction of T-cell response by a DNA vaccine encoding a novel HLA-A*0201 severe acute respiratory syndrome coronavirus epitope",
  "DOI": "10.1016/j.vaccine.2007.05.025",
  "Count": 2
}, {
  "Atitle": "Long-term protection from SARS coronavirus infection conferred by a single immunization with an attenuated VSV-based vaccine",
  "DOI": "10.1016/j.virol.2005.06.016",
  "Count": 2
}, {
  "Atitle": "Rhesus angiotensin converting enzyme 2 supports entry of severe acute respiratory syndrome coronavirus in Chinese macaques",
  "DOI": "10.1016/j.virol.2008.08.016",
  "Count": 2
}, {
  "Atitle": "Avian coronavirus infectious bronchitis virus susceptibility to botanical oleoresins and essential oils in vitro and in vivo",
  "DOI": "10.1016/j.virusres.2010.01.006",
  "Count": 2
}, {
  "Atitle": "Human coronaviruses: viral and cellular factors involved in neuroinvasiveness and neuropathogenesis",
  "DOI": "10.1016/j.virusres.2014.09.011",
  "Count": 2
}, {
  "Atitle": "Coronavirus as a possible cause of severe acute respiratory syndrome",
  "DOI": "10.1016/S0140-6736(03)13077-2",
  "Count": 2
}, {
  "Atitle": "Newly discovered coronavirus as the primary cause of severe acute respiratory syndrome",
  "DOI": "10.1016/S0140-6736(03)13967-0",
  "Count": 2
}, {
  "Atitle": "Mucosal immunisation of African green monkeys ( Cercopithecus aethiops  with an attenuated parainfluenza virus expressing the SARS coronavirus spike protein for the prevention of SARS",
  "DOI": "10.1016/S0140-6736(04)16501-X",
  "Count": 2
}, {
  "Atitle": "Full spectrum of COVID-19 severity still being depicted",
  "DOI": "10.1016/S0140-6736(20)30308-1",
  "Count": 2
}, {
  "Atitle": "Africa prepares for coronavirus",
  "DOI": "10.1016/S0140-6736(20)30355-X",
  "Count": 2
}, {
  "Atitle": "First imported case of 2019 novel coronavirus in Canada, presenting as mild pneumonia",
  "DOI": "10.1016/S0140-6736(20)30370-6",
  "Count": 2
}, {
  "Atitle": "The response of Milan's Emergency Medical System to the COVID-19 outbreak in Italy",
  "DOI": "10.1016/S0140-6736(20)30493-1",
  "Count": 2
}, {
  "Atitle": "Mitigate the effects of home confinement on children during the COVID-19 outbreak",
  "DOI": "10.1016/S0140-6736(20)30547-X",
  "Count": 2
}, {
  "Atitle": "COVID-19: the medium is the message",
  "DOI": "10.1016/S0140-6736(20)30600-0",
  "Count": 2
}, {
  "Atitle": "First known person-to-person transmission of severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2 in the USA",
  "DOI": "10.1016/S0140-6736(20)30607-3",
  "Count": 2
}, {
  "Atitle": "COVID-19 battle during the toughest sanctions against Iran",
  "DOI": "10.1016/s0140-6736(20)30668-1",
  "Count": 2
}, {
  "Atitle": "COVID-19: towards controlling of a pandemic",
  "DOI": "10.1016/S0140-6736(20)30673-5",
  "Count": 2
}, {
  "Atitle": "COVID-19 cacophony: is there any orchestra conductor?",
  "DOI": "10.1016/S0140-6736(20)30675-9",
  "Count": 2
}, {
  "Atitle": "Diagnosis of canine coronavirus infection using nested-PCR",
  "DOI": "10.1016/S0166-0934(99)00134-2",
  "Count": 2
}, {
  "Atitle": "Coronavirus spreads",
  "DOI": "10.1016/S0262-4079(20)30188-3",
  "Count": 2
}, {
  "Atitle": "Risk of COVID-19 for patients with cancer",
  "DOI": "10.1016/S1470-2045(20)30149-2",
  "Count": 2
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus in dromedary camels: an outbreak investigation",
  "DOI": "10.1016/S1473-3099(13)70690-X",
  "Count": 2
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: risk factors and determinants of primary, household, and nosocomial transmission",
  "DOI": "10.1016/S1473-3099(18)30127-0",
  "Count": 2
}, {
  "Atitle": "Outbreak of coronavirus disease 2019",
  "DOI": "10.1016/S1473-3099(20)30076-1",
  "Count": 2
}, {
  "Atitle": "Open access epidemiological data from the COVID-19 outbreak",
  "DOI": "10.1016/S1473-3099(20)30119-5",
  "Count": 2
}, {
  "Atitle": "Adoption of COVID-19 triage strategies for low-income settings",
  "DOI": "10.1016/S2213-2600(20)30114-4",
  "Count": 2
}, {
  "Atitle": "COVID-19: delay, mitigate, and communicate",
  "DOI": "10.1016/S2213-2600(20)30128-4",
  "Count": 2
}, {
  "Atitle": "Potential association between COVID-19 mortality and health-care resource availability",
  "DOI": "10.1016/S2214-109X(20)30068-1",
  "Count": 2
}, {
  "Atitle": "COVID-19: mitigating transmission via wastewater plumbing systems",
  "DOI": "10.1016/S2214-109X(20)30112-1",
  "Count": 2
}, {
  "Atitle": "Prisons and custodial settings are part of a comprehensive response to COVID-19",
  "DOI": "10.1016/S2468-2667(20)30058-X",
  "Count": 2
}, {
  "Atitle": "Identification of COVID-19 Can be Quicker through Artificial Intelligence framework using a Mobile Phone-Based Survey in the Populations when Cities/Towns Are Under Quarantine",
  "DOI": "10.1017/ice.2020.61",
  "Count": 2
}, {
  "Atitle": "The time-varying serial interval of the coronavirus disease (COVID-19 and its gender-specific difference: A data-driven analysis using public surveillance data in Hong Kong and Shenzhen, China from January 10 to February 15, 2020",
  "DOI": "10.1017/ice.2020.64",
  "Count": 2
}, {
  "Atitle": "Extension of the known distribution of a novel clade C betacoronavirus in a wildlife host",
  "DOI": "10.1017/S0950268819000207",
  "Count": 2
}, {
  "Atitle": "Identification of novel inhibitors of the SARS coronavirus main protease 3CL(super pro",
  "DOI": "10.1021/bi0361766",
  "Count": 2
}, {
  "Atitle": "Screening and identification of linear B-cell epitopes and entry-blocking peptide of severe acute respiratory syndrome (SARS-associated coronavirus using synthetic overlapping peptide library",
  "DOI": "10.1021/cc0500607",
  "Count": 2
}, {
  "Atitle": "Clusters of coronavirus cases put scientists on alert",
  "DOI": "10.1038/492166a",
  "Count": 2
}, {
  "Atitle": "Receptor for new coronavirus found: virus might have many animal reservoirs",
  "DOI": "10.1038/495149a",
  "Count": 2
}, {
  "Atitle": "Coronavirus latest: China eases restrictions in outbreak epicentre",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 2
}, {
  "Atitle": "Coronavirus latest: The outbreak in Italy went undetected for weeks",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 2
}, {
  "Atitle": "Coronavirus latest: UK joins worldwide lockdowns",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 2
}, {
  "Atitle": "WHAT SCIENTISTS WANT TO KNOW ABOUT THE CORONAVIRUS OUTBREAK",
  "DOI": "10.1038/d41586-020-00166-6",
  "Count": 2
}, {
  "Atitle": "Coronavirus: hospitals must learn from past pandemics",
  "DOI": "10.1038/d41586-020-00354-4",
  "Count": 2
}, {
  "Atitle": "Open peer-review platform for COVID-19 preprints",
  "DOI": "10.1038/d41586-020-00613-4",
  "Count": 2
}, {
  "Atitle": "COVID-19: don't forget deaf people",
  "DOI": "10.1038/d41586-020-00782-2",
  "Count": 2
}, {
  "Atitle": "COVID-19: ban �orientalism� by critics of wildlife trade",
  "DOI": "10.1038/d41586-020-00870-3",
  "Count": 2
}, {
  "Atitle": "Coronavirus pandemic: Nature�s pledge to you",
  "DOI": "10.1038/d41586-020-00882-z",
  "Count": 2
}, {
  "Atitle": "How blood from coronavirus survivors might save lives",
  "DOI": "10.1038/d41586-020-00895-8",
  "Count": 2
}, {
  "Atitle": "Five tips for moving teaching online as COVID-19 takes hold",
  "DOI": "10.1038/d41586-020-00896-7",
  "Count": 2
}, {
  "Atitle": "Coronavirus and the race to distribute reliable diagnostics",
  "DOI": "10.1038/d41587-020-00002-2",
  "Count": 2
}, {
  "Atitle": "COVID-19 Research in Brief: 20 March to 27 March, 2020",
  "DOI": "10.1038/d41591-020-00006-0",
  "Count": 2
}, {
  "Atitle": "Molecular basis of binding between novel human coronavirus MERS-CoV and its receptor CD26",
  "DOI": "10.1038/nature12328",
  "Count": 2
}, {
  "Atitle": "Cryo-electron microscopy structure of a coronavirus spike glycoprotein trimer",
  "DOI": "10.1038/nature16988",
  "Count": 2
}, {
  "Atitle": "Rapid detection of MERS coronavirus-like viruses in bats: pote1ntial for tracking MERS coronavirus transmission and animal origin",
  "DOI": "10.1038/s41426-017-0016-7",
  "Count": 2
}, {
  "Atitle": "Rapid detection of MERS coronavirus-like viruses in bats: potential for tracking MERS coronavirus transmission and animal origin",
  "DOI": "10.1038/s41426-017-0016-7",
  "Count": 2
}, {
  "Atitle": "Enhanced protection in mice induced by immunization with inactivated whole viruses compare to spike protein of middle east respiratory syndrome coronavirus",
  "DOI": "10.1038/s41426-018-0056-7",
  "Count": 2
}, {
  "Atitle": "Communication, collaboration and cooperation can stop the 2019 coronavirus",
  "DOI": "10.1038/s41591-020-0775-x",
  "Count": 2
}, {
  "Atitle": "Author Correction: China�s response to a novel coronavirus stands in stark contrast to the 2002 SARS outbreak response",
  "DOI": "10.1038/s41591-020-0816-5",
  "Count": 2
}, {
  "Atitle": "Structural basis for human coronavirus attachment to sialic acid receptors",
  "DOI": "10.1038/s41594-019-0233-y",
  "Count": 2
}, {
  "Atitle": "Attenuation of replication by a 29 nucleotide deletion in SARS-coronavirus acquired during the early stages of human-to-human transmission",
  "DOI": "10.1038/s41598-018-33487-8",
  "Count": 2
}, {
  "Atitle": "A high ATP concentration enhances the cooperative translocation of the SARS coronavirus helicase nsP13 in the unwinding of duplex RNA",
  "DOI": "10.1038/s41598-020-61432-1",
  "Count": 2
}, {
  "Atitle": "Audio Interview: Practical Measures to Help Prevent Covid-19",
  "DOI": "10.1056/NEJMe2006742",
  "Count": 2
}, {
  "Atitle": "Remdesivir: A Promising Antiviral Against Coronaviruses",
  "DOI": "10.1056/nejm-jw.NA50889",
  "Count": 2
}, {
  "Atitle": "COVID-19 Infection: More Epidemiologic Data from Outside Wuhan",
  "DOI": "10.1056/nejm-jw.NA50970",
  "Count": 2
}, {
  "Atitle": "Isolation of a Novel Coronavirus from a Man with Pneumonia in Saudi Arabia",
  "DOI": "10.1056/NEJMoa1211721",
  "Count": 2
}, {
  "Atitle": "Family cluster of Middle East respiratory syndrome coronavirus infections",
  "DOI": "10.1056/NEJMoa1303729",
  "Count": 2
}, {
  "Atitle": "Middle East Respiratory Syndrome Corona Virus (MERS CoV: The next steps",
  "DOI": "10.1057/jphp.2015.9",
  "Count": 2
}, {
  "Atitle": "Structural characterization of the fusion-active complex of severe acute respiratory syndrome (SARS coronavirus.(Author Abstract",
  "DOI": "10.1073/pnas.0402753101",
  "Count": 2
}, {
  "Atitle": "Crystal structure of NL63 respiratory coronavirus receptor-binding domain complexed with its human receptor",
  "DOI": "10.1073/pnas.0908837106",
  "Count": 2
}, {
  "Atitle": "p53 down-regulates SARS coronavirus replication and is targeted by the SARS-unique domain and PLpro via E3 ubiquitin ligase RCHY1",
  "DOI": "10.1073/pnas.1603435113",
  "Count": 2
}, {
  "Atitle": "Tectonic conformational changes of a coronavirus spike glycoprotein promote membrane fusion",
  "DOI": "10.1073/pnas.1708727114",
  "Count": 2
}, {
  "Atitle": "Broad receptor engagement of an emerging global coronavirus may potentiate its diverse cross-species transmissibility",
  "DOI": "10.1073/pnas.1802879115",
  "Count": 2
}, {
  "Atitle": "Human coronaviruses OC43 and HKU1 bind to 9--acetylated sialic acids via a conserved receptor-binding site in spike protein domain A",
  "DOI": "10.1073/pnas.1809667116",
  "Count": 2
}, {
  "Atitle": "Cryo-EM analysis of a feline coronavirus spike protein reveals a unique structure and camouflaging glycans",
  "DOI": "10.1073/pnas.1908898117",
  "Count": 2
}, {
  "Atitle": "Coronavirus endoribonuclease targets viral polyuridine sequences to evade activating host sensors",
  "DOI": "10.1073/pnas.1921485117",
  "Count": 2
}, {
  "Atitle": "One Health approach and Coronavirus Disease 2019",
  "DOI": "10.1080/21645515.2020.1732168",
  "Count": 2
}, {
  "Atitle": "RNA based mNGS approach identifies a novel human coronavirus from two individual pneumonia cases in 2019 Wuhan outbreak",
  "DOI": "10.1080/22221751.2020.1725399",
  "Count": 2
}, {
  "Atitle": "Public's early response to the novel coronavirus-infected pneumonia",
  "DOI": "10.1080/22221751.2020.1732232",
  "Count": 2
}, {
  "Atitle": "Development and characterization of a severe acute respiratory syndrome-associated coronavirus-neutralizing human monoclonal antibody that provides effective immunoprophylaxis in mice",
  "DOI": "10.1086/427242",
  "Count": 2
}, {
  "Atitle": "Detection of airborne severe acute respiratory syndrome (SARS coronavirus and environmental contamination in SARS outbreak units",
  "DOI": "10.1086/429634",
  "Count": 2
}, {
  "Atitle": "Survival of severe acute respiratory syndrome coronavirus",
  "DOI": "10.1086/433186",
  "Count": 2
}, {
  "Atitle": "A Prospective Hospital?Based Study of the Clinical Impact of Non�Severe Acute Respiratory Syndrome (Non?SARS�Related Human Coronavirus Infection",
  "DOI": "10.1086/507898",
  "Count": 2
}, {
  "Atitle": "Pathology of guinea pigs experimentally infected with a novel reovirus and coronavirus isolated from SARS patients",
  "DOI": "10.1089/dna.2005.24.485",
  "Count": 2
}, {
  "Atitle": "Anesthesia Procedure of Emergency Operation for Patients with Suspected or Confirmed COVID-19",
  "DOI": "10.1089/sur.2020.040",
  "Count": 2
}, {
  "Atitle": "Safety Considerations in the Laboratory Testing of Specimens Suspected or Known to Contain the Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2",
  "DOI": "10.1093/ajcp/aqaa047",
  "Count": 2
}, {
  "Atitle": "Object-oriented biological system integration: a SARS coronavirus example",
  "DOI": "10.1093/bioinformatics/bti344",
  "Count": 2
}, {
  "Atitle": "A case of 2019 Novel Coronavirus in a pregnant woman with preterm delivery",
  "DOI": "10.1093/cid/ciaa200",
  "Count": 2
}, {
  "Atitle": "The Art of War in the Era of Coronavirus Disease 2019 (COVID-19",
  "DOI": "10.1093/cid/ciaa229",
  "Count": 2
}, {
  "Atitle": "Viral Shedding and Antibody Response in 37 Patients With Middle East Respiratory Syndrome Coronavirus Infection",
  "DOI": "10.1093/cid/civ951",
  "Count": 2
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus Infection During Pregnancy: A Report of 5 Cases From Saudi Arabia",
  "DOI": "10.1093/cid/ciw412",
  "Count": 2
}, {
  "Atitle": "Identification of information types and sources by the public for promoting awareness of Middle East respiratory syndrome coronavirus in Saudi Arabia",
  "DOI": "10.1093/her/cyv061",
  "Count": 2
}, {
  "Atitle": "Prevention of Experimental Coronavirus Colds with Intranasal ?-2b Interferon",
  "DOI": "10.1093/infdis/154.3.443",
  "Count": 2
}, {
  "Atitle": "An experimental model for dilated cardiomyopathy after rabbit coronavirus infection",
  "DOI": "10.1093/infdis/166.5.978",
  "Count": 2
}, {
  "Atitle": "Clinical outcome of 55 asymptomatic cases at the time of hospital admission infected with SARS-Coronavirus-2 in Shenzhen, China",
  "DOI": "10.1093/infdis/jiaa119",
  "Count": 2
}, {
  "Atitle": "Human Coronavirus in Hospitalized Children With Respiratory Tract Infections: A 9-Year Population-Based Study From Norway",
  "DOI": "10.1093/infdis/jiy646",
  "Count": 2
}, {
  "Atitle": "Characteristics and Outcomes of Coronavirus Infection in Children: The Role of Viral Factors and an Immunocompromised State",
  "DOI": "10.1093/jpids/pix093",
  "Count": 2
}, {
  "Atitle": "Nepal's First Case of COVID-19 and public health response",
  "DOI": "10.1093/jtm/taaa024",
  "Count": 2
}, {
  "Atitle": "Severe acute respiratory syndrome Coronavirus ORF3a protein activates the NLRP3 inflammasome by promoting TRAF3?dependent ubiquitination of ASC",
  "DOI": "10.1096/fj.201802418R",
  "Count": 2
}, {
  "Atitle": "History and recent advances in coronavirus discovery",
  "DOI": "10.1097/01.inf.0000188166.17324.60",
  "Count": 2
}, {
  "Atitle": "Perioperative Management of Patients Infected with the Novel Coronavirus",
  "DOI": "10.1097/ALN.0000000000003301",
  "Count": 2
}, {
  "Atitle": "Identification of a novel coronavirus causing severe pneumonia in human: a descriptive study",
  "DOI": "10.1097/CM9.0000000000000722",
  "Count": 2
}, {
  "Atitle": "Distribution of the COVID-19 epidemic and correlation with population emigration from wuhan, China",
  "DOI": "10.1097/CM9.0000000000000782",
  "Count": 2
}, {
  "Atitle": "Effectiveness of glucocorticoid therapy in patients with severe novel coronavirus pneumonia: protocol of a randomized controlled trial",
  "DOI": "10.1097/CM9.0000000000000791",
  "Count": 2
}, {
  "Atitle": "A confirmed asymptomatic carrier of 2019 novel coronavirus (SARS-CoV-2",
  "DOI": "10.1097/CM9.0000000000000798",
  "Count": 2
}, {
  "Atitle": "Potential therapeutic options for coronavirus disease 2019: using knowledge of past outbreaks to guide future treatment",
  "DOI": "10.1097/CM9.0000000000000816",
  "Count": 2
}, {
  "Atitle": "Effectiveness of the Middle East respiratory syndrome-coronavirus protocol in enhancing the function of an Emergency Department in Qatar",
  "DOI": "10.1097/MEJ.0000000000000285",
  "Count": 2
}, {
  "Atitle": "The challenge of emergency medicine facing the COVID-19 outbreak",
  "DOI": "10.1097/MEJ.0000000000000699",
  "Count": 2
}, {
  "Atitle": "A real-time PCR assay for bat SARS-like coronavirus detection and its application to Italian greater horseshoe bat faecal sample surveys",
  "DOI": "10.1100/2012/989514",
  "Count": 2
}, {
  "Atitle": "A mathematical model for simulating the transmission of Wuhan novel Coronavirus",
  "DOI": "10.1101/2020.01.19.911669",
  "Count": 2
}, {
  "Atitle": "Severe acute respiratory syndrome-related coronavirus � The species and its viruses, a statement of the Coronavirus Study Group",
  "DOI": "10.1101/2020.02.07.937862",
  "Count": 2
}, {
  "Atitle": "Isolation and Characterization of 2019-nCoV-like Coronavirus from Malayan Pangolins",
  "DOI": "10.1101/2020.02.17.951335",
  "Count": 2
}, {
  "Atitle": "Generation of antibodies against COVID-19 virus for development of diagnostic tools",
  "DOI": "10.1101/2020.02.20.20025999",
  "Count": 2
}, {
  "Atitle": "Vulnerabilities in coronavirus glycan shields despite extensive glycosylation",
  "DOI": "10.1101/2020.02.20.957472",
  "Count": 2
}, {
  "Atitle": "Structure of Mpro from COVID-19 virus and discovery of its inhibitors",
  "DOI": "10.1101/2020.02.26.964882",
  "Count": 2
}, {
  "Atitle": "Genome-wide data inferring the evolution and population demography of the novel pneumonia coronavirus (SARS-CoV-2",
  "DOI": "10.1101/2020.03.04.976662",
  "Count": 2
}, {
  "Atitle": "Substrate specificity profiling of SARS-CoV-2 Mpro protease provides basis for anti-COVID-19 drug design",
  "DOI": "10.1101/2020.03.07.981928",
  "Count": 2
}, {
  "Atitle": "In silico approach to accelerate the development of mass spectrometry-based proteomics methods for detection of viral proteins: Application to COVID-19",
  "DOI": "10.1101/2020.03.08.980383",
  "Count": 2
}, {
  "Atitle": "The inhaled corticosteroid ciclesonide blocks coronavirus RNA replication by targeting viral NSP15",
  "DOI": "10.1101/2020.03.11.987016",
  "Count": 2
}, {
  "Atitle": "Japan�s response to COVID-19 could get more disruptive",
  "DOI": "10.1108/OXAN-ES251304",
  "Count": 2
}, {
  "Atitle": "Has Hajj-associated Middle East Respiratory Syndrome Coronavirus transmission occurred? The case for effective post-Hajj surveillance for infection",
  "DOI": "10.1111/1469-0691.12492",
  "Count": 2
}, {
  "Atitle": "Coronavirus disease 2019: Implications of emerging infections for transplantation",
  "DOI": "10.1111/ajt.15832",
  "Count": 2
}, {
  "Atitle": "Coronavirus Disease 2019 and Transplantation: a view from the inside",
  "DOI": "10.1111/ajt.15853",
  "Count": 2
}, {
  "Atitle": "Novel findings from a beta coronavirus outbreak on an American Miniature Horse breeding farm in upstate New York",
  "DOI": "10.1111/eve.12938",
  "Count": 2
}, {
  "Atitle": "Human coronaviruses and other respiratory infections in young adults on a university campus: Prevalence, symptoms, and shedding",
  "DOI": "10.1111/irv.12563",
  "Count": 2
}, {
  "Atitle": "Coronavirus as an Agent of Neonatal Calf Diarrhea in a Chinese Dairy Cattle Farm",
  "DOI": "10.1111/j.1439-0450.1991.tb00898.x",
  "Count": 2
}, {
  "Atitle": "The �Common Cold� in Frail Older Persons: Impact of Rhinovirus and Coronavirus in a Senior Daycare Center",
  "DOI": "10.1111/j.1532-5415.1997.tb01474.x",
  "Count": 2
}, {
  "Atitle": "Development of a Dose?Response Model for SARS Coronavirus",
  "DOI": "10.1111/j.1539-6924.2010.01427.x",
  "Count": 2
}, {
  "Atitle": "Coronaviruses in spinal fluid of patients with acute monosymptomatic optic neuritis",
  "DOI": "10.1111/j.1600-0404.1999.tb01043.x",
  "Count": 2
}, {
  "Atitle": "Nursing and the Novel Coronavirus: Risks and Responsibilities in a Global Outbreak",
  "DOI": "10.1111/jan.14369",
  "Count": 2
}, {
  "Atitle": "Dermatology staff participate in fight against Covid-19 in China",
  "DOI": "10.1111/jdv.16390",
  "Count": 2
}, {
  "Atitle": "Gastrointestinal endoscopy during COVID-19 pandemic",
  "DOI": "10.1111/jgh.15048",
  "Count": 2
}, {
  "Atitle": "COVID-19: Emerging compassion, courage and resilience in the face of misinformation and adversity",
  "DOI": "10.1111/jocn.15231",
  "Count": 2
}, {
  "Atitle": "Questions raised by COVID-19 case descriptions",
  "DOI": "10.1111/jpc.14872",
  "Count": 2
}, {
  "Atitle": "Disease features of equine coronavirus and enteric salmonellosis are similar in horses",
  "DOI": "10.1111/jvim.15386",
  "Count": 2
}, {
  "Atitle": "Application of a Risk Analysis Tool to Middle East Respiratory Syndrome Coronavirus (MERS-CoV Outbreak in Saudi Arabia",
  "DOI": "10.1111/risa.13472",
  "Count": 2
}, {
  "Atitle": "Inactivation of Middle East respiratory syndrome-coronavirus in human plasma using amotosalen and ultraviolet A light",
  "DOI": "10.1111/trf.14422",
  "Count": 2
}, {
  "Atitle": "Isolation and characterization of viruses related to the SARS coronavirus from animals in Southern China.(Reports",
  "DOI": "10.1126/science.1087139",
  "Count": 2
}, {
  "Atitle": "Strategies shift as coronavirus pandemic looms: The virus seems unstoppable, but mitigating its speed and impact is possible",
  "DOI": "10.1126/science.367.6481.962",
  "Count": 2
}, {
  "Atitle": "Countries test tactics in 'war' against COVID-19",
  "DOI": "10.1126/science.367.6484.1287",
  "Count": 2
}, {
  "Atitle": "Co-circulation of three camel coronavirus species and recombination of MERS-CoVs in Saudi Arabia",
  "DOI": "10.1126/science.aac8608",
  "Count": 2
}, {
  "Atitle": "�This beast is moving very fast.� Will the new coronavirus be containedor go pandemic?",
  "DOI": "10.1126/science.abb1701",
  "Count": 2
}, {
  "Atitle": "COVID-19 drives new threat to bats in China",
  "DOI": "10.1126/science.abb3088",
  "Count": 2
}, {
  "Atitle": "The effect of human mobility and control measures on the COVID-19 epidemic in China",
  "DOI": "10.1126/science.abb4218",
  "Count": 2
}, {
  "Atitle": "COVID-19 needs a Manhattan Project",
  "DOI": "10.1126/science.abb8654",
  "Count": 2
}, {
  "Atitle": "New coronavirus outbreak: Framing questions for pandemic prevention",
  "DOI": "10.1126/scitranslmed.abb1469",
  "Count": 2
}, {
  "Atitle": "Screening of an FDA-approved compound library identifies four small-molecule Inhibitors of Middle East respiratory syndrome coronavirus replication in cell culture",
  "DOI": "10.1128/AAC.03011-14",
  "Count": 2
}, {
  "Atitle": "European Surveillance for Pantropic Canine Coronavirus",
  "DOI": "10.1128/JCM.02466-12",
  "Count": 2
}, {
  "Atitle": "Real-Time Reverse Transcription-PCR Assay Panel for Middle East Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/JCM.02533-13",
  "Count": 2
}, {
  "Atitle": "Detection of Severe Acute Respiratory Syndrome (SARS Coronavirus Nucleocapsid Protein in SARS Patients by Enzyme-Linked Immunosorbent Assay",
  "DOI": "10.1128/JCM.42.7.2884-2889.2004",
  "Count": 2
}, {
  "Atitle": "Development and evaluation of a multitarget real-time Taqman reverse transcription-PCR assay for detection of the severe acute respiratory syndrome-associated coronavirus and surveillance for an apparently related coronavirus found in masked palm civets",
  "DOI": "10.1128/JCM.43.5.2041-2046.2005",
  "Count": 2
}, {
  "Atitle": "Differential Sensitivities of Severe Acute Respiratory Syndrome (SARS Coronavirus Spike Polypeptide Enzyme-Linked Immunosorbent Assay (ELISA and SARS Coronavirus Nucleocapsid Protein ELISA for Serodiagnosis of SARS Coronavirus Pneumonia",
  "DOI": "10.1128/JCM.43.7.3054-3058.2005",
  "Count": 2
}, {
  "Atitle": "Simultaneous treatment of human bronchial epithelial cells with serine and cysteine protease inhibitors prevents severe acute respiratory syndrome coronavirus entry",
  "DOI": "10.1128/JVI.00094-12",
  "Count": 2
}, {
  "Atitle": "Species-Specific Colocalization of Middle East Respiratory Syndrome Coronavirus Attachment and Entry Receptors",
  "DOI": "10.1128/JVI.00107-19",
  "Count": 2
}, {
  "Atitle": "Discovery of Novel Bat Coronaviruses in South China That Use the Same Receptor as Middle East Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/JVI.00116-18",
  "Count": 2
}, {
  "Atitle": "Development and RNA-Synthesizing Activity of Coronavirus Replication Structures in the Absence of Protein Synthesis",
  "DOI": "10.1128/JVI.00403-11",
  "Count": 2
}, {
  "Atitle": "Receptor Usage and Cell Entry of Porcine Epidemic Diarrhea Coronavirus",
  "DOI": "10.1128/jvi.00430-15",
  "Count": 2
}, {
  "Atitle": "Combination Attenuation Offers Strategy for Live Attenuated Coronavirus Vaccines",
  "DOI": "10.1128/JVI.00710-18",
  "Count": 2
}, {
  "Atitle": "Severe Acute Respiratory Syndrome Coronavirus Infection Causes Neuronal Death in the Absence of Encephalitis in Mice Transgenic for Human ACE2",
  "DOI": "10.1128/JVI.00737-08",
  "Count": 2
}, {
  "Atitle": "Novel Inhibitors of Severe Acute Respiratory Syndrome Coronavirus Entry That Act by Three Distinct Mechanisms",
  "DOI": "10.1128/JVI.00998-13",
  "Count": 2
}, {
  "Atitle": "A Coronavirus E Protein Is Present in Two Distinct Pools with Different Effects on Assembly and the Secretory Pathway",
  "DOI": "10.1128/JVI.01237-15",
  "Count": 2
}, {
  "Atitle": "Small-Molecule Antiviral ?-d-N4-Hydroxycytidine Inhibits a Proofreading-Intact Coronavirus with a High Genetic Barrier to Resistance",
  "DOI": "10.1128/JVI.01348-19",
  "Count": 2
}, {
  "Atitle": "Coronaviruses resistant to a 3C-like protease inhibitor are attenuated for replication and pathogenesis, revealing a low genetic barrier but high fitness cost of resistance",
  "DOI": "10.1128/JVI.01528-14",
  "Count": 2
}, {
  "Atitle": "Trypsin treatment unlocks barrier for zoonotic bat coronavirus infection",
  "DOI": "10.1128/JVI.01774-19",
  "Count": 2
}, {
  "Atitle": "Molecular Mechanism for Antibody-Dependent Enhancement of Coronavirus Entry",
  "DOI": "10.1128/JVI.02015-19",
  "Count": 2
}, {
  "Atitle": "Isolation and Characterization of Current Human Coronavirus Strains in Primary Human Epithelial Cell Cultures Reveal Differences in Target Cell Tropism",
  "DOI": "10.1128/JVI.03368-12",
  "Count": 2
}, {
  "Atitle": "Human coronavirus-induced neuronal programmed cell death is cyclophilin d dependent and potentially caspase dispensable",
  "DOI": "10.1128/JVI.06062-11",
  "Count": 2
}, {
  "Atitle": "Molecular Determinants of Species Specificity in the Coronavirus Receptor Aminopeptidase N (CD13: Influence of N-Linked Glycosylation",
  "DOI": "10.1128/jvi.75.20.9741-9752.2001",
  "Count": 2
}, {
  "Atitle": "Coronavirus Spike Glycoprotein, Extended at the Carboxy Terminus with Green Fluorescent Protein, Is Assembly Competent",
  "DOI": "10.1128/JVI.78.14.7369-7378.2004",
  "Count": 2
}, {
  "Atitle": "Retroviruses Pseudotyped with the Severe Acute Respiratory Syndrome Coronavirus Spike Protein Efficiently Infect Cells Expressing Angiotensin-Converting Enzyme 2",
  "DOI": "10.1128/jvi.78.19.10628-10635.2004",
  "Count": 2
}, {
  "Atitle": "Characterization and complete genome sequence of a novel coronavirus, coronavirus HKU1, from patients with pneumonia",
  "DOI": "10.1128/JVI.79.2.884-895.2005",
  "Count": 2
}, {
  "Atitle": "Severe Acute Respiratory Syndrome Coronavirus Infection of Human Ciliated Airway Epithelia: Role of Ciliated Cells in Viral Spread in the Conducting Airways of the Lungs",
  "DOI": "10.1128/jvi.79.24.15511-15524.2005",
  "Count": 2
}, {
  "Atitle": "Complete genomic sequence of human coronavirus OC43: molecular clock analysis suggests a relatively recent zoonotic coronavirus transmission event",
  "DOI": "10.1128/JVI.79.3.1595-1604.2005",
  "Count": 2
}, {
  "Atitle": "Evaluation of the serologic cross-reactivity between transmissible gastroenteritis coronavirus and porcine respiratory coronavirus using commercial blocking enzyme-linked immunosorbent assay kits",
  "DOI": "10.1128/msphere.00017-19",
  "Count": 2
}, {
  "Atitle": "Tears and conjunctival scrapings for coronavirus in patients with SARS",
  "DOI": "10.1136/bjo.2003.039461",
  "Count": 2
}, {
  "Atitle": "Covid-19: medical schools are urged to fast-track final year students",
  "DOI": "10.1136/bmj.m1064",
  "Count": 2
}, {
  "Atitle": "Covid-19: Highest risk patients are asked to stay at home for 12 weeks",
  "DOI": "10.1136/bmj.m1170",
  "Count": 2
}, {
  "Atitle": "Covid-19 and long term conditions: what if you have cancer, diabetes, or chronic kidney disease?",
  "DOI": "10.1136/bmj.m1174",
  "Count": 2
}, {
  "Atitle": "China coronavirus: Hong Kong health staff strike to demand border closure as city records first death",
  "DOI": "10.1136/bmj.m454",
  "Count": 2
}, {
  "Atitle": "Coronavirus: NHS staff get power to keep patients in isolation as UK declares �serious threat�",
  "DOI": "10.1136/bmj.m550",
  "Count": 2
}, {
  "Atitle": "Covid-19: US health department staff sent to meet citizens returning from China weren�t protected, claims whistleblower",
  "DOI": "10.1136/bmj.m833",
  "Count": 2
}, {
  "Atitle": "Covid-19: UK could delay non-urgent care and call doctors back from leave and retirement",
  "DOI": "10.1136/bmj.m854",
  "Count": 2
}, {
  "Atitle": "Covid-19: China�s president Xi visits Wuhan amid confidence that virus is under control",
  "DOI": "10.1136/bmj.m995",
  "Count": 2
}, {
  "Atitle": "Houston we have a problem: coronavirus!",
  "DOI": "10.1136/ejhpharm-2020-002240",
  "Count": 2
}, {
  "Atitle": "Silent circulation of coronaviruses in pigs",
  "DOI": "10.1136/vr.m932",
  "Count": 2
}, {
  "Atitle": "Effect of pH and temperature on the infectivity of human coronavirus 229E",
  "DOI": "10.1139/m89-160",
  "Count": 2
}, {
  "Atitle": "Human Coronavirus: Host-Pathogen Interaction",
  "DOI": "10.1146/annurev-micro-020518-115759",
  "Count": 2
}, {
  "Atitle": "Structure, Function, and Evolution of Coronavirus Spike Proteins",
  "DOI": "10.1146/annurev-virology-110615-042301",
  "Count": 2
}, {
  "Atitle": "2019 Novel Coronavirus (2019-nCoV Pneumonia",
  "DOI": "10.1148/radiol.2020200257",
  "Count": 2
}, {
  "Atitle": "Evolution of CT Manifestations in a Patient Recovered from 2019 Novel Coronavirus (2019-nCoV Pneumonia in Wuhan, China",
  "DOI": "10.1148/radiol.2020200269",
  "Count": 2
}, {
  "Atitle": "Use of Chest CT in Combination with Negative RT-PCR Assay for the 2019 Novel Coronavirus but High Clinical Suspicion",
  "DOI": "10.1148/radiol.2020200330",
  "Count": 2
}, {
  "Atitle": "Time Course of Lung Changes On Chest CT During Recovery From 2019 Novel Coronavirus (COVID-19 Pneumonia",
  "DOI": "10.1148/radiol.2020200370",
  "Count": 2
}, {
  "Atitle": "Sensitivity of Chest CT for COVID-19: Comparison to                     RT-PCR",
  "DOI": "10.1148/radiol.2020200432",
  "Count": 2
}, {
  "Atitle": "Coronavirus NL63-induced Adult Respiratory Distress Syndrome",
  "DOI": "10.1164/rccm.201506-1239LE",
  "Count": 2
}, {
  "Atitle": "Innate Immune Response of Human Alveolar Type II Cells Infected with Severe Acute Respiratory Syndrome-Coronavirus",
  "DOI": "10.1165/rcmb.2012-0339OC",
  "Count": 2
}, {
  "Atitle": "CDC�s early response to a novel viral disease, middle east respiratory syndrome coronavirus (MERS-CoV, September 2012�May 2014",
  "DOI": "10.1177/003335491513000407",
  "Count": 2
}, {
  "Atitle": "Tracing Airline Travelers for a Public Health Investigation: Middle East Respiratory Syndrome Coronavirus (MERS-CoV Infection in the United States, 2014",
  "DOI": "10.1177/0033354916662213",
  "Count": 2
}, {
  "Atitle": "Coronavirus Infection in Ferrets: Antigen Distribution and Inflammatory Response",
  "DOI": "10.1177/0300985816634809",
  "Count": 2
}, {
  "Atitle": "TNF-? inhibition for potential therapeutic modulation of SARS coronavirus infection",
  "DOI": "10.1185/030079903125002757",
  "Count": 2
}, {
  "Atitle": "The SARS coronavirus S glycoprotein receptor binding domain: fine mapping and functional characterization",
  "DOI": "10.1186/1743-422X-2-73",
  "Count": 2
}, {
  "Atitle": "An educational programme for nursing college staff and students during a MERS- coronavirus outbreak in Saudi Arabia",
  "DOI": "10.1186/s12912-015-0065-y",
  "Count": 2
}, {
  "Atitle": "Nucleocapsid protein-dependent assembly of the RNA packaging signal of Middle East respiratory syndrome coronavirus",
  "DOI": "10.1186/s12929-018-0449-x",
  "Count": 2
}, {
  "Atitle": "Coronavirus: just imagine�",
  "DOI": "10.1186/s13054-020-2824-8",
  "Count": 2
}, {
  "Atitle": "COVID-19 infection epidemic: the medical management strategies in Heilongjiang Province, China",
  "DOI": "10.1186/s13054-020-2832-8",
  "Count": 2
}, {
  "Atitle": "Extracorporeal membrane oxygenation for severe Middle East respiratory syndrome coronavirus",
  "DOI": "10.1186/s13613-017-0350-x",
  "Count": 2
}, {
  "Atitle": "The novel coronavirus outbreak in Wuhan, China",
  "DOI": "10.1186/s41256-020-00135-6",
  "Count": 2
}, {
  "Atitle": "Guide to the Forensic Pathology Practice on Death Cases Related to Corona Virus Disease 2019 ?08COVID-19?09 ?08Trial Draft?09",
  "DOI": "10.12116/j.issn.1004-5619.2020.01.003",
  "Count": 2
}, {
  "Atitle": "Estimation of MERS-Coronavirus Reproductive Number and Case Fatality Rate for the Spring 2014 Saudi Arabia Outbreak: Insights from Publicly Available Data",
  "DOI": "10.1371/currents.outbreaks.98d2f8f3382d84f390736cd5f5fe133c",
  "Count": 2
}, {
  "Atitle": "Design of wide-spectrum inhibitors targeting Coronavirus main proteases. Erratum to document cited in CA144:427824]",
  "DOI": "10.1371/journal.pbio.0030324",
  "Count": 2
}, {
  "Atitle": "Human monoclonal antibody combination against SARS coronavirus: synergy and coverage of escape mutants",
  "DOI": "10.1371/journal.pmed.0030237",
  "Count": 2
}, {
  "Atitle": "Immunization with SARS Coronavirus Vaccines Leads to Pulmonary Immunopathology on Challenge with the SARS Virus (SARS Vaccine Pre-Clinical Evaluations",
  "DOI": "10.1371/journal.pone.0035421",
  "Count": 2
}, {
  "Atitle": "Human coronavirus HKU1 infection of primary human type II alveolar epithelial cells: cytopathic effects and innate immune response",
  "DOI": "10.1371/journal.pone.0070129",
  "Count": 2
}, {
  "Atitle": "Genomic Analysis and Surveillance of the Coronavirus Dominant in Ducks in China",
  "DOI": "10.1371/journal.pone.0129256",
  "Count": 2
}, {
  "Atitle": "Infectious bronchitis corona virus establishes productive infection in avian macrophages interfering with selected antimicrobial functions",
  "DOI": "10.1371/journal.pone.0181801",
  "Count": 2
}, {
  "Atitle": "The Murine Coronavirus Hemagglutinin-esterase Receptor-binding Site: A Major Shift in Ligand Specificity through Modest Changes in Architecture",
  "DOI": "10.1371/journal.ppat.1002492",
  "Count": 2
}, {
  "Atitle": "Cryo-EM structure of the SARS coronavirus spike glycoprotein in complex with its host cell receptor ACE2",
  "DOI": "10.1371/journal.ppat.1007236",
  "Count": 2
}, {
  "Atitle": "COVID-19 Disease With Positive Fecal and Negative Pharyngeal and Sputum Viral Tests",
  "DOI": "10.14309/ajg.0000000000000610",
  "Count": 2
}, {
  "Atitle": "What can early Canadian experience screening for COVID-19 teach us about how to prepare for a pandemic?",
  "DOI": "10.1503/cmaj.200305",
  "Count": 2
}, {
  "Atitle": "Working together to contain and manage COVID-19",
  "DOI": "10.1503/cmaj.200428",
  "Count": 2
}, {
  "Atitle": "Unraveling the Packaging Mechanism of Coronavirus Ribonucleocapsid",
  "DOI": "10.15406/jhvrv.2017.05.00148",
  "Count": 2
}, {
  "Atitle": "On the possibility of interrupting the coronavirus (COVID-19 epidemic based on the best available scientific evidence",
  "DOI": "10.1590/1980-549720200021",
  "Count": 2
}, {
  "Atitle": "Unrevealing sequence and structural features of novel coronavirus using in silico approaches: The main protease as molecular target",
  "DOI": "10.17179/excli2020-1189",
  "Count": 2
}, {
  "Atitle": "Protocol for the development of a rapid advice guideline for prevention, management and care of children with 2019 novel coronavirus infection",
  "DOI": "10.21037/apm.2020.02.33",
  "Count": 2
}, {
  "Atitle": "Which lessons shall we learn from the 2019 novel coronavirus outbreak?",
  "DOI": "10.21037/atm.2020.02.06",
  "Count": 2
}, {
  "Atitle": "Early estimation of the case fatality rate of COVID-19 in mainland China: a data-driven analysis",
  "DOI": "10.21037/atm.2020.02.66",
  "Count": 2
}, {
  "Atitle": "Novel Coronavirus and Orthopaedic Surgery: Early Experiences from Singapore",
  "DOI": "10.2106/JBJS.20.00236",
  "Count": 2
}, {
  "Atitle": "PANDEMIC HUMAN CORONAVIRUS - CHARACTERIZATION AND COMPARISON OF SELECTED PROPERTIES OF HCOV-SARS AND HCOV-MERS",
  "DOI": "10.21307/PM-2018.57.1.022",
  "Count": 2
}, {
  "Atitle": "Effects of Corona Virus on the World Community",
  "DOI": "10.2139/ssrn.3532001",
  "Count": 2
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: epidemiology and disease control measures",
  "DOI": "10.2147/IDR.S51283",
  "Count": 2
}, {
  "Atitle": "An Overall Picture of SARS Coronavirus (SARS-CoV Genome-Encoded Major Proteins: Structures, Functions and Drug Development",
  "DOI": "10.2174/138161206779010459",
  "Count": 2
}, {
  "Atitle": "Rapid Response Research - SARS Coronavirus Vaccines and Application of Processes to Other Emerging Infectious Diseases",
  "DOI": "10.2174/1573395054065106",
  "Count": 2
}, {
  "Atitle": "Recent Developments on Coronavirus Main Protease/3C Like Protease Inhibitors",
  "DOI": "10.2174/1574891X113089990017",
  "Count": 2
}, {
  "Atitle": "Zoonotic emergence of coronavirus: a potential public risk for Latin America",
  "DOI": "10.21897/rmvz.1408",
  "Count": 2
}, {
  "Atitle": "Digital Mental Health and COVID-19: Using Technology Today to Accelerate the Curve on Access and Quality Tomorrow",
  "DOI": "10.2196/18848",
  "Count": 2
}, {
  "Atitle": "CT Features of Coronavirus Disease 2019 (COVID-19 Pneumonia in 62 Patients in Wuhan, China",
  "DOI": "10.2214/AJR.20.22975",
  "Count": 2
}, {
  "Atitle": "Coronaviruses: Molecular and Cellular Biology",
  "DOI": "10.2217/17460794.3.2.119",
  "Count": 2
}, {
  "Atitle": "Induction of pro-inflammatory cytokines (IL-1 and IL-6 and lung inflammation by COVID-19: anti-inflammatory strategies",
  "DOI": "10.23812/CONTI-E.",
  "Count": 2
}, {
  "Atitle": "Role of GS-5734 (Remdesivir in inhibiting SARS-CoV and MERS-CoV: The expected role of GS-5734 (Remdesivir in COVID-19 (2019-nCoV - VYTR hypothesis",
  "DOI": "10.26452/ijrps.v11iSPL1.1973",
  "Count": 2
}, {
  "Atitle": "Emergence of novel human coronavirus: public health implications in the Eastern Mediterranean Region",
  "DOI": "10.26719/2012.18.11.1084",
  "Count": 2
}, {
  "Atitle": "Novel coronavirus infections in Jordan, April 2012: epidemiological findings from a retrospective investigation/Infections par le nouveau coronavirus en Jordanie, avril 2012: resultats epidemiologiques d'une etude retrospective.(Country experience(Report",
  "DOI": "10.26719/2013.19.supp1.S12",
  "Count": 2
}, {
  "Atitle": "Emerging respiratory and novel coronavirus 2012 infections and mass gatherings/Infections respiratoires emergentes, nouveau coronavirus 2012 et rassemblements de masse",
  "DOI": "10.26719/2013.19.supp1.S48",
  "Count": 2
}, {
  "Atitle": "Retrospective analysis of the possibility of predicting the COVID-19 outbreak from Internet searches and social media data, China, 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.10.2000199",
  "Count": 2
}, {
  "Atitle": "Coronavirus disease (COVID-19 in a paucisymptomatic patient: epidemiological and clinical challenge in settings with limited community transmission, Italy, February 2020",
  "DOI": "10.2807/1560-7917.ES.2020.25.11.2000230",
  "Count": 2
}, {
  "Atitle": "Latest updates on COVID-19 from the European Centre for Disease Prevention and Control",
  "DOI": "10.2807/1560-7917.ES.2020.25.6.2002131",
  "Count": 2
}, {
  "Atitle": "Latest assessment on COVID-19 from the European Centre for Disease Prevention and Control (ECDC",
  "DOI": "10.2807/1560-7917.ES.2020.25.8.2002271",
  "Count": 2
}, {
  "Atitle": "LABORATORY CAPABILITY AND SURVEILLANCE TESTING FOR MIDDLE EAST RESPIRATORY SYNDROME CORONAVIRUS INFECTION IN THE WHO EUROPEAN REGION, JUNE 2013",
  "DOI": "10.2807/1560-7917.ES2014.19.40.20923",
  "Count": 2
}, {
  "Atitle": "Novel coronavirus associated with severe respiratory disease: Case definition and public health measures",
  "DOI": "10.2807/ese.17.39.20282-en",
  "Count": 2
}, {
  "Atitle": "Wuhan novel coronavirus 2019nCoV � update January 27th 2020",
  "DOI": "10.31646/gbio.51",
  "Count": 2
}, {
  "Atitle": "Molecular Epidemiology of SARS-associated Coronavirus, Beijing",
  "DOI": "10.3201/eid1109.040773",
  "Count": 2
}, {
  "Atitle": "Bat coronaviruses and experimental infection of bats, the Philippines.(RESEARCH(Report",
  "DOI": "10.3201/eid1608.100208",
  "Count": 2
}, {
  "Atitle": "Surveillance and testing for Middle East respiratory syndrome Coronavirus, Saudi Arabia, April 2015-February 2016",
  "DOI": "10.3201/eid2304.161793",
  "Count": 2
}, {
  "Atitle": "Porcine Deltacoronavirus Infection and Transmission in Poultry, United States1",
  "DOI": "10.3201/eid2602.190346",
  "Count": 2
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus Transmission",
  "DOI": "10.3201/eid2602.190697",
  "Count": 2
}, {
  "Atitle": "Case of the Index Patient Who Caused Tertiary Transmission of COVID-19 Infection in Korea: the Application of Lopinavir/Ritonavir for the Treatment of COVID-19 Infected Pneumonia Monitored by Quantitative RT-PCR",
  "DOI": "10.3346/jkms.2020.35.e79",
  "Count": 2
}, {
  "Atitle": "Letter to the Editor: Case of the Index Patient Who Caused Tertiary Transmission of Coronavirus Disease 2019 in Korea: the Application of Lopinavir/Ritonavir for the Treatment of COVID-19 Pneumonia Monitored by Quantitative RT-PCR",
  "DOI": "10.3346/jkms.2020.35.e88",
  "Count": 2
}, {
  "Atitle": "The Author's Response: Case of the Index Patient Who Caused Tertiary Transmission of Coronavirus Disease 2019 in Korea: the Application of Lopinavir/Ritonavir for the Treatment of COVID-19 Pneumonia Monitored by Quantitative RT-PCR",
  "DOI": "10.3346/jkms.2020.35.e89",
  "Count": 2
}, {
  "Atitle": "Mediastinal Emphysema, Giant Bulla, and Pneumothorax Developed during the Course of COVID-19 Pneumonia",
  "DOI": "10.3348/kjr.2020.0180",
  "Count": 2
}, {
  "Atitle": "Subunit Vaccines Against Emerging Pathogenic Human Coronaviruses",
  "DOI": "10.3389/fmicb.2020.00298",
  "Count": 2
}, {
  "Atitle": "The Impact of COVID-19 Epidemic Declaration on Psychological Consequences: A Study on Active Weibo Users",
  "DOI": "10.3390/ijerph17062032",
  "Count": 2
}, {
  "Atitle": "Smoking Upregulates Angiotensin-Converting Enzyme-2 Receptor: A Potential Adhesion Site for Novel Coronavirus SARS-CoV-2 (Covid-19",
  "DOI": "10.3390/jcm9030841",
  "Count": 2
}, {
  "Atitle": "Evolutionary Trajectory for the Emergence of Novel Coronavirus SARS-CoV-2",
  "DOI": "10.3390/pathogens9030240",
  "Count": 2
}, {
  "Atitle": "Human Coronavirus Infections in Israel: Epidemiology, Clinical Symptoms and Summer Seasonality of HCoV-HKU1",
  "DOI": "10.3390/v10100515",
  "Count": 2
}, {
  "Atitle": "Bats and Coronaviruses",
  "DOI": "10.3390/v11010041",
  "Count": 2
}, {
  "Atitle": "Emerging Viruses without Borders: The Wuhan Coronavirus",
  "DOI": "10.3390/v12020130",
  "Count": 2
}, {
  "Atitle": "The coronavirus outbreak: the central role of primary care in emergency preparedness and response",
  "DOI": "10.3399/bjgpopen20X101041",
  "Count": 2
}, {
  "Atitle": "Excretion and detection of SARS coronavirus and its nucleic acid from digestive system",
  "DOI": "10.3748/wjg.v11.i28.4390",
  "Count": 2
}, {
  "Atitle": "Standardized diagnosis and treatment of colorectal cancer during the outbreak of corona virus disease 2019 in Renji hospital]",
  "DOI": "10.3760/cma.j.cn.441530-20200217-00057",
  "Count": 2
}, {
  "Atitle": "The differential diagnosis for novel coronavirus pneumonia and similar lung diseases in general hospitals",
  "DOI": "10.3760/cma.j.cn112147-20200221-00136",
  "Count": 2
}, {
  "Atitle": "Expert recommendations on the management of patients with advanced non-small cell lung cancer during epidemic of COVID-19 (Trial version]",
  "DOI": "10.3760/cma.j.cn112147-20200221-00138",
  "Count": 2
}, {
  "Atitle": "Expert consensus on Pulmonary Function Testing during the epidemic of Corona Virus Disease 2019]",
  "DOI": "10.3760/cma.j.cn112147-20200225-00175",
  "Count": 2
}, {
  "Atitle": "Medical management and prevention instruction of chronic obstructive pulmonary disease during the coronavirus disease 2019 epidemic",
  "DOI": "10.3760/cma.j.cn112147-20200227-00201",
  "Count": 2
}, {
  "Atitle": "Health protection guideline of passenger transport stations and transportation facilities during novel coronavirus pneumonia (NCP outbreak]",
  "DOI": "10.3760/cma.j.cn112150-20200217-00130",
  "Count": 2
}, {
  "Atitle": "Provisional guidelines on autopsy practice for deaths associated with COVID-19",
  "DOI": "10.3760/cma.j.cn112151-20200309-00184",
  "Count": 2
}, {
  "Atitle": "A pathological report of three COVID-19 cases by minimally invasive autopsies]",
  "DOI": "10.3760/cma.j.cn112151-20200312-00193",
  "Count": 2
}, {
  "Atitle": "The pathological changes and related studies of novel coronavirus infected surgical specimen]",
  "DOI": "10.3760/cma.j.cn112151-20200315-00205",
  "Count": 2
}, {
  "Atitle": "Medical diagnosis and treatment strategies for malignant tumors of the digestive system during the outbreak of novel coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.cn112152-20200227-00141",
  "Count": 2
}, {
  "Atitle": "Individualized treatment recommendations for lung cancer patients at different stages of treatment during the outbreak of 2019 novel coronavirus disease epidemic]",
  "DOI": "10.3760/cma.j.cn112152-20200228-00146",
  "Count": 2
}, {
  "Atitle": "Using the big data ofinternet to understand coronavirus disease 2019's symptom characteristics: a big data study]",
  "DOI": "10.3760/cma.j.cn115330-20200225-00128",
  "Count": 2
}, {
  "Atitle": "COVID-19 complicated with DIC: 2 cases report and literatures review]",
  "DOI": "10.3760/cma.j.issn.0253-2727.2020.0001",
  "Count": 2
}, {
  "Atitle": "Characteristics, causes, diagnosis and treatment of coagulation dysfunction in patients with COVID-19]",
  "DOI": "10.3760/cma.j.issn.0253-2727.2020.0002",
  "Count": 2
}, {
  "Atitle": "2019-nCoV: new challenges from coronavirus",
  "DOI": "10.3760/cma.j.issn.0253-9624.2020.03.002",
  "Count": 2
}, {
  "Atitle": "SARS coronavirus without reservoir originated from an unnatural evolution, experienced the reverse evolution, and finally disappeared in the world",
  "DOI": "10.3760/cma.j.issn.0366-6999.20131328",
  "Count": 2
}, {
  "Atitle": "Retracted: Clinical and epidemiological characteristics of 34 children with 2019 novel coronavirus infection in Shenzhen]",
  "DOI": "10.3760/cma.j.issn.0578-1310.2020.0008",
  "Count": 2
}, {
  "Atitle": "Prevention and control program on 2019 novel coronavirus infection in children's digestive endoscopy center]",
  "DOI": "10.3760/cma.j.issn.0578-1310.2020.03.002",
  "Count": 2
}, {
  "Atitle": "Several suggestion of operation for colorectal cancer under the outbreak of Corona Virus Disease 19 in China]",
  "DOI": "10.3760/cma.j.issn.1671-0274.2020.03.002",
  "Count": 2
}, {
  "Atitle": "Cardiac manifestations of patients with COVID-19 pneumonia and related treatment recommendations]",
  "DOI": "10.3760/cma.j.issn.cn112148-20200213-00077",
  "Count": 2
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus epidemic impact on healthcare workers' risk perceptions, work and personal lives",
  "DOI": "10.3855/jidc.11753",
  "Count": 2
}, {
  "Atitle": "Sex-Based Differences in Susceptibility to Severe Acute Respiratory Syndrome Coronavirus Infection",
  "DOI": "10.4049/jimmunol.1601896",
  "Count": 2
}, {
  "Atitle": "A rare cause of acute flaccid paralysis: Human coronaviruses",
  "DOI": "10.4103/1817-1745.165716",
  "Count": 2
}, {
  "Atitle": "Need for integrated surveillance at human-animal interface for rapid detection & response to emerging coronavirus infections using One Health approach",
  "DOI": "10.4103/ijmr.IJMR_623_20",
  "Count": 2
}, {
  "Atitle": "All eyes on Coronavirus-What do we need to know as ophthalmologists",
  "DOI": "10.4103/ijo.IJO_516_20",
  "Count": 2
}, {
  "Atitle": "Chest CT Findings in a Pregnant Patient with 2019 Novel Coronavirus Disease",
  "DOI": "10.4274/balkanmedj.galenos.2020.2020.3.89",
  "Count": 2
}, {
  "Atitle": "Brief Communication: Update on virological, epidemiological and diagnostic aspects of Sars-Corona Virus (SARS-CoV: A newly emerging virus",
  "DOI": "10.4314/ejhd.v18i1.9867",
  "Count": 2
}, {
  "Atitle": "Mimics and chameleons of COVID-19",
  "DOI": "10.4414/smw.2020.20231",
  "Count": 2
}, {
  "Atitle": "COVID-19: decision making and palliative care",
  "DOI": "10.4414/smw.2020.20233",
  "Count": 2
}, {
  "Atitle": "Middle Eastern Respiratory Syndrome Corona Virus (MERS CoV: case reports from a tertiary care hospital in Saudi Arabia",
  "DOI": "10.5144/0256-4947.2014.396",
  "Count": 2
}, {
  "Atitle": "Detection of Corona virus antigen by ELISA from diarrhoeic cow calves in Mathura, India",
  "DOI": "10.5455/vetworld.2012.166-168",
  "Count": 2
}, {
  "Atitle": "Facts and reflections on COVID-19 and anti-hypertensives drugs",
  "DOI": "10.5582/ddt.2020.01017",
  "Count": 2
}, {
  "Atitle": "An outbreak of COVID-19 caused by a new coronavirus: what we know so far",
  "DOI": "10.5694/mja2.50530",
  "Count": 2
}, {
  "Atitle": "Lopinavir; a potent drug against coronavirus infection: Insight from molecular docking study",
  "DOI": "10.5812/archcid.13823",
  "Count": 2
}, {
  "Atitle": "COVID-19: what has been learned and to be learned about the novel coronavirus disease",
  "DOI": "10.7150/ijbs.45134",
  "Count": 2
}, {
  "Atitle": "Tribute to health workers in China: A group of respectable population during the outbreak of the COVID-19",
  "DOI": "10.7150/ijbs.45135.Availablefromhttp://www.ijbs.com/v16p1739.htmGoFileimportinstruction",
  "Count": 2
}, {
  "Atitle": "Evaluation of SARS-CoV-2 RNA shedding in clinical specimens and clinical characteristics of 10 patients with COVID-19 in Macau",
  "DOI": "10.7150/ijbs.45357.Availablefromhttp://www.ijbs.com/v16p1698.htmGoFileimportinstruction",
  "Count": 2
}, {
  "Atitle": "Knowledge and Perceptions of COVID-19 Among the General Public in the United States and the United Kingdom: A Cross-sectional Online Survey",
  "DOI": "10.7326/M20-0912",
  "Count": 2
}, {
  "Atitle": "Supporting Clinicians During the COVID-19 Pandemic",
  "DOI": "10.7326/M20-1033",
  "Count": 2
}, {
  "Atitle": "Development of Genetic Diagnostic Methods for Novel Coronavirus 2019 (nCoV-2019 in Japan",
  "DOI": "10.7883/yoken.JJID.2020.061",
  "Count": 2
}, {
  "Atitle": "Incorrect Location in: Lessons Learned From SARS Outbreak Prompt Rapid Response to New Coronavirus",
  "DOI": "10.1001/jama.2013.6326",
  "Count": 1
}, {
  "Atitle": "COVID-19 in SingaporeCurrent Experience",
  "DOI": "10.1001/jama.2020.2467",
  "Count": 1
}, {
  "Atitle": "Treatment of 5 Critically Ill Patients With COVID-19 With Convalescent Plasma",
  "DOI": "10.1001/jama.2020.4783",
  "Count": 1
}, {
  "Atitle": "The Importance of Addressing Advance Care Planning and Decisions About Do-Not-Resuscitate Orders During Novel Coronavirus 2019 (COVID-19",
  "DOI": "10.1001/jama.2020.4894",
  "Count": 1
}, {
  "Atitle": "Inhibition of SARS-Associated Coronavirus Infection and Replication by RNA Interference",
  "DOI": "10.1001/jama.290.20.2665",
  "Count": 1
}, {
  "Atitle": "Exercising Heart and Head in Managing Coronavirus Disease 2019 in Wuhan",
  "DOI": "10.1001/jamanetworkopen.2020.4006",
  "Count": 1
}, {
  "Atitle": "Alzheimer's Disease Research Enterprise in the Era of COVID-19/SARS-CoV-2",
  "DOI": "10.1002/alz.12093",
  "Count": 1
}, {
  "Atitle": "The characteristics of hDPP4 transgenic mice subjected to aerosol MERS coronavirus infection via an animal nose?only exposure device",
  "DOI": "10.1002/ame2.12088",
  "Count": 1
}, {
  "Atitle": "Myelin basic protein and human coronavirus 229E cross-reactive T cells in multiple sclerosis",
  "DOI": "10.1002/ana.410390213",
  "Count": 1
}, {
  "Atitle": "COVID-19 pandemic: perspectives on an unfolding crisis",
  "DOI": "10.1002/bjs.11627",
  "Count": 1
}, {
  "Atitle": "A Fluorogenic Peptide Containing the Processing Site of Human SARS Corona Virus S-Protein: Kinetic Evaluation and NMR Structure Elucidation",
  "DOI": "10.1002/cbic.200700007",
  "Count": 1
}, {
  "Atitle": "The Cholera Epidemics in Hamburg and What to Learn for COVID-19 (SARS-CoV-2",
  "DOI": "10.1002/cyto.a.23999",
  "Count": 1
}, {
  "Atitle": "Determination of SARS?coronavirus by a microfluidic chip system",
  "DOI": "10.1002/elps.200305966",
  "Count": 1
}, {
  "Atitle": "Antibody responses against SARS coronavirus are correlated with disease outcome of infected individuals",
  "DOI": "10.1002/jmv.20499",
  "Count": 1
}, {
  "Atitle": "Quantitative structure-activity relationship and molecular docking revealed a potency of anti-hepatitis C virus drugs against human corona viruses",
  "DOI": "10.1002/jmv.24736",
  "Count": 1
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus spike protein counteracts BST2?mediated restriction of virus?like particle release",
  "DOI": "10.1002/jmv.25518",
  "Count": 1
}, {
  "Atitle": "Evolving status of the 2019 novel coronavirus Infection: proposal of conventional serologic assays for disease diagnosis and infection monitoring Commentary/Review",
  "DOI": "10.1002/jmv.25702",
  "Count": 1
}, {
  "Atitle": "Antibodies to coronaviruses are higher in older compared with younger adults and binding antibodies are more sensitive than neutralizing antibodies in identifying coronavirus-associated illnesses",
  "DOI": "10.1002/jmv.25715",
  "Count": 1
}, {
  "Atitle": "Understanding Immunity to SARS Coronavirus",
  "DOI": "10.1002/jmv.25722",
  "Count": 1
}, {
  "Atitle": "Identification of Coronavirus Sequences in Carp cDNA from Wuhan, China",
  "DOI": "10.1002/jmv.25751",
  "Count": 1
}, {
  "Atitle": "A report of clinical diagnosis and treatment of nine cases of coronavirus disease 2019",
  "DOI": "10.1002/jmv.25755",
  "Count": 1
}, {
  "Atitle": "Is there a role for lung ultrasound during the COVID-19 pandemic?",
  "DOI": "10.1002/jum.15284",
  "Count": 1
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus entry into host cells: Opportunities for therapeutic intervention",
  "DOI": "10.1002/med.20055",
  "Count": 1
}, {
  "Atitle": "Clinical strategies for treating pediatric cancer during the outbreak of 2019 novel coronavirus infection",
  "DOI": "10.1002/pbc.28248",
  "Count": 1
}, {
  "Atitle": "Identification of host factors involved in coronavirus replication by quantitative proteomics analysis",
  "DOI": "10.1002/pmic.201000309",
  "Count": 1
}, {
  "Atitle": "SARS?unique fold in the Rousettus bat coronavirus HKU9",
  "DOI": "10.1002/pro.3208",
  "Count": 1
}, {
  "Atitle": "Vaccines against Middle East respiratory syndrome coronavirus for humans and camels",
  "DOI": "10.1002/rmv.1917",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus infection and pregnancy",
  "DOI": "10.1002/uog.22006",
  "Count": 1
}, {
  "Atitle": "ISUOG Interim Guidance on 2019 novel coronavirus infection during pregnancy and puerperium: information for healthcare professionals",
  "DOI": "10.1002/uog.22013",
  "Count": 1
}, {
  "Atitle": "Intracellular transport of the S proteins of coronaviruses",
  "DOI": "10.1007/978-0-387-33012-9_45",
  "Count": 1
}, {
  "Atitle": "Infection of human airway epithelia by SARS coronavirus is associated with ACE2 expression and localization",
  "DOI": "10.1007/978-0-387-33012-9_85",
  "Count": 1
}, {
  "Atitle": "Improved prediction of MHC class I binders/non-binders peptides through artificial neural network using variable learning rate: SARS corona virus, a case study",
  "DOI": "10.1007/978-1-4419-7046-6_22",
  "Count": 1
}, {
  "Atitle": "The use of nucleic acid hybridization to detect human coronaviruses",
  "DOI": "10.1007/BF01315554",
  "Count": 1
}, {
  "Atitle": "A two year serological surveillance of coronavirus infections in Hamburg",
  "DOI": "10.1007/BF01639150",
  "Count": 1
}, {
  "Atitle": "How to face the novel coronavirus infection during the 2019�2020 epidemic: the experience of Sichuan Provincial People�s Hospital",
  "DOI": "10.1007/s00134-020-05964-0",
  "Count": 1
}, {
  "Atitle": "The novel coronavirus (SARS-CoV-2 infections in China: prevention, control and challenges",
  "DOI": "10.1007/s00134-020-05977-9",
  "Count": 1
}, {
  "Atitle": "Correction to: COVID-19: a novel coronavirus and a novel challenge for critical care",
  "DOI": "10.1007/s00134-020-06009-2",
  "Count": 1
}, {
  "Atitle": "Coronaviruses Detected in Brazilian Wild Birds Reveal Close Evolutionary Relationships with Beta- and Deltacoronaviruses Isolated From Mammals",
  "DOI": "10.1007/s00239-015-9693-9",
  "Count": 1
}, {
  "Atitle": "Chest CT manifestations of new coronavirus disease 2019 (COVID-19: a pictorial review",
  "DOI": "10.1007/s00330-020-06801-0",
  "Count": 1
}, {
  "Atitle": "Modeling pathogenesis of emergent and pre-emergent human coronaviruses in mice",
  "DOI": "10.1007/s00335-018-9760-9",
  "Count": 1
}, {
  "Atitle": "The phylogeny of SARS coronavirus",
  "DOI": "10.1007/s00705-003-0244-0",
  "Count": 1
}, {
  "Atitle": "Differential effect of cholesterol on type I and II feline coronavirus infection",
  "DOI": "10.1007/s00705-015-2655-0",
  "Count": 1
}, {
  "Atitle": "Fatality risks for nosocomial outbreaks of Middle East respiratory syndrome coronavirus in the Middle East and South Korea",
  "DOI": "10.1007/s00705-016-3062-x",
  "Count": 1
}, {
  "Atitle": "Antibody-dependent enhancement of serotype II feline enteric coronavirus infection in primary feline monocytes",
  "DOI": "10.1007/s00705-017-3489-8",
  "Count": 1
}, {
  "Atitle": "Materno-fetal transmission of human coronaviruses: a prospective pilot study",
  "DOI": "10.1007/s10096-008-0505-7",
  "Count": 1
}, {
  "Atitle": "Evaluation of preparedness of healthcare student volunteers against Middle East respiratory syndrome coronavirus (MERS-CoV in Makkah, Saudi Arabia: a cross-sectional study",
  "DOI": "10.1007/s10389-018-0917-5",
  "Count": 1
}, {
  "Atitle": "Coronavirus Infection and Diversity in Bats in the Australasian Region",
  "DOI": "10.1007/s10393-016-1116-x",
  "Count": 1
}, {
  "Atitle": "Structural proteomics of the SARS coronavirus: a model response to emerging infectious diseases",
  "DOI": "10.1007/s10969-007-9024-5",
  "Count": 1
}, {
  "Atitle": "The effects of Nigella sativa (Ns, Anthemis hyalina (Ah and Citrus sinensis (Cs extracts on the replication of coronavirus and the expression of TRP genes family",
  "DOI": "10.1007/s11033-014-3019-7",
  "Count": 1
}, {
  "Atitle": "The first complete genome sequences of clinical isolates of human coronavirus 229E",
  "DOI": "10.1007/s11262-012-0807-9",
  "Count": 1
}, {
  "Atitle": "Detection of Alphacoronavirus in velvety free-tailed bats ( Molossus molossus  and Brazilian free-tailed bats ( Tadarida brasiliensis  from urban area of Southern Brazil",
  "DOI": "10.1007/s11262-013-0899-x",
  "Count": 1
}, {
  "Atitle": "Characterization of neutralizing monoclonal antibodies recognizing a 15-residues epitope on the spike protein HR2 region of severe acute respiratory syndrome coronavirus (SARS-CoV",
  "DOI": "10.1007/s11373-005-9004-3",
  "Count": 1
}, {
  "Atitle": "Evolution of the novel coronavirus from the ongoing Wuhan outbreak and modeling of its spike protein for risk of human transmission",
  "DOI": "10.1007/s11427-020-1637-5",
  "Count": 1
}, {
  "Atitle": "1: Giwa AL, Desai A, Duca A. Novel 2019 Coronavirus SARS-CoV-2 (COVID-19: An Updated Overview for Emergency Clinicians. Emerg Med Pract. 2020 May 1; 21 (5: 1-28. Epub 2020 Mar 24. PubMed PMID: 32207910",
  "DOI": "10.1007/s11596-020-2172-6.[Epubaheadofprint]",
  "Count": 1
}, {
  "Atitle": "CT image of novel coronavirus pneumonia: a case report",
  "DOI": "10.1007/s11604-020-00945-1",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus in pediatrics: a report of seven cases from Saudi Arabia",
  "DOI": "10.1007/s11684-017-0603-y",
  "Count": 1
}, {
  "Atitle": "2019 novel Coronavirus outbreak: a quiz or final exam?",
  "DOI": "10.1007/s11684-020-0753-1",
  "Count": 1
}, {
  "Atitle": "Serological Evidence of Bat SARS-Related Coronavirus Infection in Humans, China",
  "DOI": "10.1007/s12250-018-0012-7",
  "Count": 1
}, {
  "Atitle": "Countrywide Survey for MERS-Coronavirus Antibodies in Dromedaries and Humans in Pakistan",
  "DOI": "10.1007/s12250-018-0051-0",
  "Count": 1
}, {
  "Atitle": "Een nieuw type coronavirus: MERS-CoV",
  "DOI": "10.1007/s12498-013-0149-0",
  "Count": 1
}, {
  "Atitle": "New coronavirus: new challenges for pediatricians",
  "DOI": "10.1007/s12519-020-00346-4",
  "Count": 1
}, {
  "Atitle": "Management strategies of neonatal jaundice during the coronavirus disease 2019 outbreak",
  "DOI": "10.1007/s12519-020-00347-3",
  "Count": 1
}, {
  "Atitle": "Chest computed tomography images of early coronavirus disease (COVID-19",
  "DOI": "10.1007/s12630-020-01625-4",
  "Count": 1
}, {
  "Atitle": "S�curit� et efficacit� de diff�rents modes d�anesth�sie pour des parturientes infect�es par la COVID-19 accouchant par c�sarienne�: une s�rie de 17�cas",
  "DOI": "10.1007/s12630-020-01630-7",
  "Count": 1
}, {
  "Atitle": "Puzzle of highly pathogenic human coronaviruses (2019-nCoV",
  "DOI": "10.1007/s13238-020-00693-y",
  "Count": 1
}, {
  "Atitle": "A patient with severe respiratory failure caused by novel human coronavirus",
  "DOI": "10.1007/s15010-013-0509-9",
  "Count": 1
}, {
  "Atitle": "Successful containment of COVID-19: the WHO-Report on the COVID-19 outbreak in China",
  "DOI": "10.1007/s15010-020-01409-4",
  "Count": 1
}, {
  "Atitle": "Rapid and Effective Virucidal Activity of Povidone-Iodine Products Against Middle East Respiratory Syndrome Coronavirus (MERS-CoV and Modified Vaccinia Virus Ankara (MVA",
  "DOI": "10.1007/s40121-015-0091-9",
  "Count": 1
}, {
  "Atitle": "A competitive inhibition ELISA for the differentiation of serum antibodies from pigs infected with transmissible gastroenteritis virus (TGEV or with the TGEV-related porcine respiratory coronavirus",
  "DOI": "10.1016/0378-1135(89)90003-5",
  "Count": 1
}, {
  "Atitle": "Experimental demyelination induced by coronavirus JHM (MHV-4: molecular identification of a viral determinant of paralytic disease",
  "DOI": "10.1016/0882-4010(87)90033-7",
  "Count": 1
}, {
  "Atitle": "Coronavirus pathogenesis",
  "DOI": "10.1016/B978-0-12-385885-6.00009-2",
  "Count": 1
}, {
  "Atitle": "SARS coronavirus infections of the lower respiratory tract and their prevention",
  "DOI": "10.1016/b978-0-12-804543-5.00003-8",
  "Count": 1
}, {
  "Atitle": "Viral and Cellular mRNA Translation in Coronavirus-Infected Cells",
  "DOI": "10.1016/bs.aivir.2016.08.001",
  "Count": 1
}, {
  "Atitle": "Interaction of SARS and MERS Coronaviruses with the Antiviral Interferon Response",
  "DOI": "10.1016/bs.aivir.2016.08.006",
  "Count": 1
}, {
  "Atitle": "Hosts and Sources of Endemic Human Coronaviruses",
  "DOI": "10.1016/bs.aivir.2018.01.001",
  "Count": 1
}, {
  "Atitle": "Differential domain structure stability of the severe acute respiratory syndrome coronavirus papain-like protease",
  "DOI": "10.1016/j.abb.2012.02.015",
  "Count": 1
}, {
  "Atitle": "Imaging Features of Coronavirus disease 2019 (COVID-19: Evaluation on Thin-Section CT",
  "DOI": "10.1016/j.acra.2020.03.002",
  "Count": 1
}, {
  "Atitle": "Coronavirus et professionnels de sant� au travail",
  "DOI": "10.1016/j.admp.2020.02.002",
  "Count": 1
}, {
  "Atitle": "Emerging infectious diseases: Focus on infection control issues for novel coronaviruses (Severe Acute Respiratory Syndrome-CoV and Middle East Respiratory Syndrome-CoV, hemorrhagic fever viruses (Lassa and Ebola, and highly pathogenic avian influenza vi",
  "DOI": "10.1016/j.ajic.2015.11.018",
  "Count": 1
}, {
  "Atitle": "Recommendations on the clinical management of the COVID-19 infection by the �new coronavirus� SARS-CoV2. Spanish Paediatric Association working group]",
  "DOI": "10.1016/j.anpedi.2020.02.001",
  "Count": 1
}, {
  "Atitle": "Accessory proteins of SARS-CoV and other coronaviruses",
  "DOI": "10.1016/j.antiviral.2014.06.013",
  "Count": 1
}, {
  "Atitle": "A screen of the NIH Clinical Collection small molecule library identifies potential anti-coronavirus drugs",
  "DOI": "10.1016/j.antiviral.2014.11.010",
  "Count": 1
}, {
  "Atitle": "The SARS-coronavirus papain-like protease: Structure, function and inhibition by designed antiviral compounds",
  "DOI": "10.1016/j.antiviral.2014.12.015",
  "Count": 1
}, {
  "Atitle": "Protease inhibitors targeting coronavirus and filovirus entry",
  "DOI": "10.1016/j.antiviral.2015.01.011",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus infection is inhibited by griffithsin",
  "DOI": "10.1016/j.antiviral.2016.07.011",
  "Count": 1
}, {
  "Atitle": "Nsp3 of coronaviruses: Structures and functions of a large multi-domain protein",
  "DOI": "10.1016/j.antiviral.2017.11.001",
  "Count": 1
}, {
  "Atitle": "Are We Ready for the New Coronavirus?",
  "DOI": "10.1016/j.arbres.2020.02.009",
  "Count": 1
}, {
  "Atitle": "Structural insights of a self-assembling 9-residue peptide from the C-terminal tail of the SARS corona virus E-protein in DPC and SDS micelles: A combined high and low resolution spectroscopic study",
  "DOI": "10.1016/j.bbamem.2017.10.015",
  "Count": 1
}, {
  "Atitle": "One size does not fit all - patterns of vulnerability and resilience in the COVID-19 pandemic and why heterogeneity of disease matters",
  "DOI": "10.1016/j.bbi.2020.03.016",
  "Count": 1
}, {
  "Atitle": "Traumatization in medical staff helping with COVID-19 control",
  "DOI": "10.1016/j.bbi.2020.03.020",
  "Count": 1
}, {
  "Atitle": "Design and synthesis of a series of serine derivatives as small molecule inhibitors of the SARS coronavirus 3CL protease",
  "DOI": "10.1016/j.bmc.2016.01.052",
  "Count": 1
}, {
  "Atitle": "Identification of myricetin and scutellarein as novel chemical inhibitors of the SARS coronavirus helicase, nsP13",
  "DOI": "10.1016/j.bmcl.2012.04.081",
  "Count": 1
}, {
  "Atitle": "Cooperative Activity of SARS Coronavirus Nsp13 Helicase Characterized by Single Molecule FRET",
  "DOI": "10.1016/j.bpj.2014.11.426",
  "Count": 1
}, {
  "Atitle": "Human-animal interactions and bat coronavirus spillover potential among rural residents in Southern China",
  "DOI": "10.1016/j.bsheal.2019.10.004",
  "Count": 1
}, {
  "Atitle": "Dynamic change process of target genes by RT-PCR testing of SARS-Cov-2 during the course of a Coronavirus Disease 2019 patient",
  "DOI": "10.1016/j.cca.2020.03.032",
  "Count": 1
}, {
  "Atitle": "A structural view of the inactivation of the SARS coronavirus main proteinase by benzotriazole esters",
  "DOI": "10.1016/j.chembiol.2008.04.011",
  "Count": 1
}, {
  "Atitle": "A Novel Coronavirus (COVID-19 Outbreak",
  "DOI": "10.1016/j.chest.2020.02.014",
  "Count": 1
}, {
  "Atitle": "Nucleocapsid Phosphorylation and RNA Helicase DDX1 Recruitment Enables Coronavirus Transition from Discontinuous to Continuous Transcription",
  "DOI": "10.1016/j.chom.2014.09.009",
  "Count": 1
}, {
  "Atitle": "Genome Composition and Divergence of the Novel Coronavirus (2019-nCoV Originating in China",
  "DOI": "10.1016/j.chom.2020.02.001",
  "Count": 1
}, {
  "Atitle": "MERS: emergence of a novel human coronavirus",
  "DOI": "10.1016/j.coviro.2014.01.010",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus vaccines: current status and novel approaches",
  "DOI": "10.1016/j.coviro.2017.03.007",
  "Count": 1
}, {
  "Atitle": "Immune responses in influenza A virus and human coronavirus infections: an ongoing battle between the virus and host",
  "DOI": "10.1016/j.coviro.2017.11.002",
  "Count": 1
}, {
  "Atitle": "Emerging and re-emerging coronaviruses in pigs",
  "DOI": "10.1016/j.coviro.2018.12.001",
  "Count": 1
}, {
  "Atitle": "Nucleoside analogues for the treatment of coronavirus infections",
  "DOI": "10.1016/j.coviro.2019.04.002",
  "Count": 1
}, {
  "Atitle": "Ferret Coronavirus-Associated Diseases",
  "DOI": "10.1016/j.cvex.2010.05.010",
  "Count": 1
}, {
  "Atitle": "Recent discovery and development of inhibitors targeting coronaviruses",
  "DOI": "10.1016/j.drudis.2020.01.015",
  "Count": 1
}, {
  "Atitle": "Structure-guided design of potent and permeable inhibitors of MERS coronavirus 3CL protease that utilize a piperidine moiety as a novel design element",
  "DOI": "10.1016/j.ejmech.2018.03.004",
  "Count": 1
}, {
  "Atitle": "Quantitative comparison of the efficiency of antibodies against S1 and S2 subunit of SARS coronavirus spike protein in virus neutralization and blocking of receptor binding: Implications for the functional roles of S2 subunit",
  "DOI": "10.1016/j.febslet.2006.08.085",
  "Count": 1
}, {
  "Atitle": "Enteric involvement of severe acute respiratory syndrome-associated coronavirus infection1 1The authors thank Man-yee Yung, Sara Fung, Dr. Bonnie Kwan, and Dr. Thomas Li for their help in retrieving patient information",
  "DOI": "10.1016/j.gastro.2003.08.001",
  "Count": 1
}, {
  "Atitle": "Severe Acute Respiratory Syndrome and Coronavirus",
  "DOI": "10.1016/j.idc.2010.04.009",
  "Count": 1
}, {
  "Atitle": "Inhibition of SARS-coronavirus infection in vitro by S-nitroso-N-acetylpenicillamine, a nitric oxide donor compound",
  "DOI": "10.1016/j.ijid.2004.04.012",
  "Count": 1
}, {
  "Atitle": "Effects of severe acute respiratory syndrome (SARS coronavirus infection on peripheral blood lymphocytes and their subsets",
  "DOI": "10.1016/j.ijid.2004.07.014",
  "Count": 1
}, {
  "Atitle": "Mass gathering-related mask use during 2009 pandemic influenza A (H1N1 and Middle East respiratory syndrome coronavirus",
  "DOI": "10.1016/j.ijid.2013.12.001",
  "Count": 1
}, {
  "Atitle": "Clinical aspects and outcomes of 70 patients with Middle East respiratory syndrome coronavirus infection: a single-center experience in Saudi Arabia",
  "DOI": "10.1016/j.ijid.2014.09.003",
  "Count": 1
}, {
  "Atitle": "Health-care associate transmission of Middle East Respiratory Syndrome Corona virus, MERS-CoV, in the Kingdom of Saudi Arabia",
  "DOI": "10.1016/j.ijid.2014.10.001",
  "Count": 1
}, {
  "Atitle": "Probable transmission chains of Middle East respiratory syndrome coronavirus and the multiple generations of secondary infection in South Korea",
  "DOI": "10.1016/j.ijid.2015.07.014",
  "Count": 1
}, {
  "Atitle": "A synthetic consensus anti-Spike protein DNA vaccine induces protective immunity against Middle East Respiratory Syndrome Coronavirus in non-human primates",
  "DOI": "10.1016/j.ijid.2016.02.083",
  "Count": 1
}, {
  "Atitle": "A poxvirus-based vaccine reduces virus excretion after MERS coronavirus infection in dromedary camels",
  "DOI": "10.1016/j.ijid.2016.02.898",
  "Count": 1
}, {
  "Atitle": "Prevalence of comorbidities in the Middle East respiratory syndrome coronavirus (MERS-CoV: a systematic review and meta-analysis",
  "DOI": "10.1016/j.ijid.2016.06.015",
  "Count": 1
}, {
  "Atitle": "20.083 Middle East Respiratory Syndrome Coronavirus (MERS-CoV: A systematic literature review",
  "DOI": "10.1016/j.ijid.2016.11.310",
  "Count": 1
}, {
  "Atitle": "Comparison of different samples for 2019 novel coronavirus detection by nucleic acid amplification tests",
  "DOI": "10.1016/j.ijid.2020.02.050",
  "Count": 1
}, {
  "Atitle": "Li Wenliang, a face to the frontline healthcare worker. The first doctor to notify the emergence of the SARS-CoV-2, (COVID-19, outbreak",
  "DOI": "10.1016/j.ijid.2020.02.052",
  "Count": 1
}, {
  "Atitle": "Applications of google search trends for risk communication in infectious disease management: A case study of COVID-19 outbreak in Taiwan",
  "DOI": "10.1016/j.ijid.2020.03.021",
  "Count": 1
}, {
  "Atitle": "Radiotherapy in the time of the Coronavirus pandemic: when less is better",
  "DOI": "10.1016/j.ijrobp.2020.03.008",
  "Count": 1
}, {
  "Atitle": "The SARS coronavirus spike glycoprotein is selectively recognized by lung surfactant protein D and activates macrophages",
  "DOI": "10.1016/j.imbio.2006.12.001",
  "Count": 1
}, {
  "Atitle": "The COVID-19 pandemic: The �black swan� for mental health care and a turning point for e-health",
  "DOI": "10.1016/j.invent.2020.100317",
  "Count": 1
}, {
  "Atitle": "COVID-19 can present with a rash and be mistaken for Dengue",
  "DOI": "10.1016/j.jaad.2020.03.036",
  "Count": 1
}, {
  "Atitle": "Novel Screening and Triage Strategy in Iran During Deadly COVID-19 Epidemic; Value of Humanitarian Teleconsultation Service",
  "DOI": "10.1016/j.jacr.2020.03.015",
  "Count": 1
}, {
  "Atitle": "Long-Term Care Facilities and the Coronavirus Epidemic: Practical Guidelines for a Population at Highest Risk",
  "DOI": "10.1016/j.jamda.2020.03.004",
  "Count": 1
}, {
  "Atitle": "In vitro susceptibility of 10 clinical isolates of SARS coronavirus to selected antiviral compounds",
  "DOI": "10.1016/j.jcv.2004.03.003",
  "Count": 1
}, {
  "Atitle": "MERS coronavirus: Data gaps for laboratory preparedness",
  "DOI": "10.1016/j.jcv.2013.10.030",
  "Count": 1
}, {
  "Atitle": "Development of a new detection tool by real time PCR for the detection of Middle East Respiratory Syndrome human Coronavirus (MERS-HCoV combining specific primers, probe and a RNA internal control ready to use premix",
  "DOI": "10.1016/j.jcv.2015.07.140",
  "Count": 1
}, {
  "Atitle": "The impact of the COVID-19 epidemic on the utilization of emergency dental services",
  "DOI": "10.1016/j.jds.2020.02.002",
  "Count": 1
}, {
  "Atitle": "Preparedness and proactive infection control measures against the emerging Wuhan coronavirus pneumonia in China",
  "DOI": "10.1016/j.jhin.2020.01.010",
  "Count": 1
}, {
  "Atitle": "Persistence of coronaviruses on inanimate surfaces and its inactivation with biocidal agents",
  "DOI": "10.1016/j.jhin.2020.01.022",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus pneumonia emergency in Zhuhai: impact and challenges",
  "DOI": "10.1016/j.jhin.2020.02.005",
  "Count": 1
}, {
  "Atitle": "Integrated infection control strategy to minimize nosocomial infection of coronavirus disease 2019 among ENT healthcare workers",
  "DOI": "10.1016/j.jhin.2020.02.018",
  "Count": 1
}, {
  "Atitle": "Is the discovery of the novel human betacoronavirus 2c EMC/2012 (HCoV-EMC the beginning of another SARS-like pandemic?",
  "DOI": "10.1016/j.jinf.2012.10.002",
  "Count": 1
}, {
  "Atitle": "Antibody against nucleocapsid protein predicts susceptibility to human coronavirus infection",
  "DOI": "10.1016/j.jinf.2015.07.002",
  "Count": 1
}, {
  "Atitle": "Clinical and CT imaging features of 2019 novel coronavirus disease (COVID-19",
  "DOI": "10.1016/j.jinf.2020.02.022",
  "Count": 1
}, {
  "Atitle": "Clinical characteristics of severe acute respiratory syndrome coronavirus 2 reactivation",
  "DOI": "10.1016/j.jinf.2020.03.001",
  "Count": 1
}, {
  "Atitle": "Arbidol combined with LPV/r versus LPV/r alone against Corona Virus Disease 2019:a retrospective cohort study",
  "DOI": "10.1016/j.jinf.2020.03.002",
  "Count": 1
}, {
  "Atitle": "Clinical and CT imaging features of the COVID-19 pneumonia: Focus on pregnant women and children",
  "DOI": "10.1016/j.jinf.2020.03.007",
  "Count": 1
}, {
  "Atitle": "The evolution of CT characteristics in the patients with COVID-19 pneumonia",
  "DOI": "10.1016/j.jinf.2020.03.014",
  "Count": 1
}, {
  "Atitle": "The Clinical Characteristics of Myocardial injury 1 in Severe and Very Severe Patients with 2019 Novel Coronavirus Disease",
  "DOI": "10.1016/j.jinf.2020.03.021",
  "Count": 1
}, {
  "Atitle": "Structure of the SARS Coronavirus Nucleocapsid Protein RNA-binding Dimerization Domain Suggests a Mechanism for Helical Packaging of Viral RNA",
  "DOI": "10.1016/j.jmb.2007.02.069",
  "Count": 1
}, {
  "Atitle": "First Middle East respiratory syndrome coronavirus (MERS-CoV case in Southeast Asia (outside Middle East",
  "DOI": "10.1016/j.jmii.2015.02.466",
  "Count": 1
}, {
  "Atitle": "Epidemiology of human coronavirus NL63 infection among hospitalized patients with pneumonia in Taiwan",
  "DOI": "10.1016/j.jmii.2015.10.008",
  "Count": 1
}, {
  "Atitle": "Emerging threats from zoonotic coronaviruses-from SARS and MERS to 2019-nCoV",
  "DOI": "10.1016/j.jmii.2020.02.001",
  "Count": 1
}, {
  "Atitle": "2019 novel coronavirus disease (COVID-19 in Taiwan: Reports of two cases from Wuhan, China",
  "DOI": "10.1016/j.jmii.2020.02.009",
  "Count": 1
}, {
  "Atitle": "Should, and how can, exercise be done during a coronavirus outbreak? An interview with Dr. Jeffrey A. Woods",
  "DOI": "10.1016/j.jshs.2020.01.005",
  "Count": 1
}, {
  "Atitle": "Study on the resistance of severe acute respiratory syndrome-associated coronavirus",
  "DOI": "10.1016/j.jviromet.2005.02.005",
  "Count": 1
}, {
  "Atitle": "Detection of bovine coronavirus using a TaqMan-based real-time RT-PCR assay",
  "DOI": "10.1016/j.jviromet.2008.05.016",
  "Count": 1
}, {
  "Atitle": "Nouveau coronavirus (NcOV",
  "DOI": "10.1016/j.lpm.2013.05.001",
  "Count": 1
}, {
  "Atitle": "Intensive care admission for Coronavirus OC43 respiratory tract infections",
  "DOI": "10.1016/j.medmal.2018.01.001",
  "Count": 1
}, {
  "Atitle": "Phylogenetic analysis and sequence comparisons of structural and non-structural SARS coronavirus proteins in Taiwan",
  "DOI": "10.1016/j.meegid.2004.08.005",
  "Count": 1
}, {
  "Atitle": "A 15-year analysis of molecular epidemiology of avian infectious bronchitis coronavirus in China",
  "DOI": "10.1016/j.meegid.2010.09.002",
  "Count": 1
}, {
  "Atitle": "SARS-Coronavirus ancestor�s foot-prints in South-East Asian bat colonies and the refuge theory",
  "DOI": "10.1016/j.meegid.2011.06.021",
  "Count": 1
}, {
  "Atitle": "Factors influencing preventive behavior against Middle East Respiratory Syndrome-Coronavirus among nursing students in South Korea",
  "DOI": "10.1016/j.nedt.2016.03.006",
  "Count": 1
}, {
  "Atitle": "MERS-coronavirus: From discovery to intervention",
  "DOI": "10.1016/j.onehlt.2016.12.001",
  "Count": 1
}, {
  "Atitle": "Corrigendum to \"Middle East Respiratory Syndrome Coronavirus Outbreak in the Republic of Korea, 2015\" Volume 6, Issue 4, August 2015, 269-278]",
  "DOI": "10.1016/j.phrp.2016.03.002",
  "Count": 1
}, {
  "Atitle": "Herd level estimation of probability of disease freedom applied on the Norwegian control program for bovine respiratory syncytial virus and bovine coronavirus",
  "DOI": "10.1016/j.prevetmed.2018.07.002",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus �MERS-CoV�: Current Knowledge Gaps",
  "DOI": "10.1016/j.prrv.2015.04.002",
  "Count": 1
}, {
  "Atitle": "Prevalence and predictors of PTSS during COVID-19 Outbreak in China Hardest-hit Areas: Gender differences matter",
  "DOI": "10.1016/j.psychres.2020.112921",
  "Count": 1
}, {
  "Atitle": "Comparison of mono- and co-infection by swine influenza A viruses and porcine respiratory coronavirus in porcine precision-cut lung slices",
  "DOI": "10.1016/j.rvsc.2017.07.016",
  "Count": 1
}, {
  "Atitle": "The inflection point about COVID-19 may have passed",
  "DOI": "10.1016/j.scib.2020.02.025",
  "Count": 1
}, {
  "Atitle": "A pandemic risk assessment of middle east respiratory syndrome coronavirus (MERS-CoV in Saudi Arabia",
  "DOI": "10.1016/j.sjbs.2017.06.001",
  "Count": 1
}, {
  "Atitle": "Structural basis of severe acute respiratory syndrome coronavirus ADP-ribose-1''-phosphate dephosphorylation by a conserved domain of nsP3",
  "DOI": "10.1016/j.str.2005.07.022",
  "Count": 1
}, {
  "Atitle": "Bat-to-human: spike features determining 'host jump' of coronaviruses SARS-CoV, MERS-CoV, and beyond",
  "DOI": "10.1016/j.tim.2015.06.003",
  "Count": 1
}, {
  "Atitle": "Engineering Coronaviruses to Evaluate Emergence and Pathogenic Potential",
  "DOI": "10.1016/j.tim.2016.04.001",
  "Count": 1
}, {
  "Atitle": "The association between domestic train transportation and novel coronavirus (2019-nCoV outbreak in China from 2019 to 2020: A data-driven correlational report",
  "DOI": "10.1016/j.tmaid.2020.101568",
  "Count": 1
}, {
  "Atitle": "Coronavirus infections reported by ProMED, February 2000-January 2020",
  "DOI": "10.1016/j.tmaid.2020.101575",
  "Count": 1
}, {
  "Atitle": "COVID-19 in Latin America: The implications of the first confirmed case in Brazil",
  "DOI": "10.1016/j.tmaid.2020.101613",
  "Count": 1
}, {
  "Atitle": "Testing the repatriated for SARS-Cov2: Should laboratory-based quarantine replace traditional quarantine?",
  "DOI": "10.1016/j.tmaid.2020.101624",
  "Count": 1
}, {
  "Atitle": "Clinical diagnostic value of CT imaging in COVID-19 with multiple negative RT-PCR testing",
  "DOI": "10.1016/j.tmaid.2020.101627",
  "Count": 1
}, {
  "Atitle": "The holy week 2020 and the beginning of COVID-19 epidemics in Latin America",
  "DOI": "10.1016/j.tmaid.2020.101633",
  "Count": 1
}, {
  "Atitle": "Buffer areas in emergency department to handle potential COVID-19 community infection in Taiwan",
  "DOI": "10.1016/j.tmaid.2020.101635",
  "Count": 1
}, {
  "Atitle": "Coronavirus disease 2019: coronaviruses and blood safety published online February 21, 2020]",
  "DOI": "10.1016/j.tmrv.2020.02.003",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome (MERS coronavirus and dromedaries",
  "DOI": "10.1016/j.tvjl.2016.12.020",
  "Count": 1
}, {
  "Atitle": "Immunogenicity, safety, and protective efficacy of an inactivated SARS-associated coronavirus vaccine in rhesus monkeys",
  "DOI": "10.1016/j.vaccine.2004.11.075",
  "Count": 1
}, {
  "Atitle": "Development of vaccines and passive immunotherapy against SARS corona virus using SCID-PBL/hu mouse models",
  "DOI": "10.1016/j.vaccine.2007.01.032",
  "Count": 1
}, {
  "Atitle": "Adenovirus-based vaccine prevents pneumonia in ferrets challenged with the SARS coronavirus and stimulates robust immune responses in macaques",
  "DOI": "10.1016/j.vaccine.2007.04.065",
  "Count": 1
}, {
  "Atitle": "Synthetic peptides coupled to the surface of liposomes effectively induce SARS coronavirus-specific cytotoxic T lymphocytes and viral clearance in HLA-A0201 transgenic mice",
  "DOI": "10.1016/j.vaccine.2009.04.001",
  "Count": 1
}, {
  "Atitle": "Immunogenicity of an adenoviral-based Middle East Respiratory Syndrome coronavirus vaccine in BALB/c mice",
  "DOI": "10.1016/j.vaccine.2014.08.058",
  "Count": 1
}, {
  "Atitle": "Memory T cell responses targeting the SARS coronavirus persist up to 11 years post-infection",
  "DOI": "10.1016/j.vaccine.2016.02.063",
  "Count": 1
}, {
  "Atitle": "The recombinant N-terminal domain of spike proteins is a potential vaccine against Middle East respiratory syndrome coronavirus (MERS-CoV infection",
  "DOI": "10.1016/j.vaccine.2016.11.064",
  "Count": 1
}, {
  "Atitle": "DNA vaccine encoding Middle East respiratory syndrome coronavirus S1 protein induces protective immune responses in mice",
  "DOI": "10.1016/j.vaccine.2017.02.063",
  "Count": 1
}, {
  "Atitle": "Heterologous prime�boost vaccination with adenoviral vector and protein nanoparticles induces both Th1 and Th2 responses against Middle East respiratory syndrome coronavirus",
  "DOI": "10.1016/j.vaccine.2018.04.082",
  "Count": 1
}, {
  "Atitle": "Susceptibility of porcine IPEC-J2 intestinal epithelial cells to infection with porcine deltacoronavirus (PDCoV and serum cytokine responses of gnotobiotic pigs to acute infection with IPEC-J2 cell culture-passaged PDCoV",
  "DOI": "10.1016/j.vetmic.2018.05.019",
  "Count": 1
}, {
  "Atitle": "Genetic, antigenic and pathogenic characterization of avian coronaviruses isolated from pheasants (Phasianus colchicus in China",
  "DOI": "10.1016/j.vetmic.2019.108513",
  "Count": 1
}, {
  "Atitle": "SARS corona virus peptides recognized by antibodies in the sera of convalescent cases",
  "DOI": "10.1016/j.virol.2004.04.017",
  "Count": 1
}, {
  "Atitle": "Identification of a critical neutralization determinant of severe acute respiratory syndrome (SARS-associated coronavirus: importance for designing SARS vaccines",
  "DOI": "10.1016/j.virol.2005.01.034",
  "Count": 1
}, {
  "Atitle": "Identification of murine CD8 T cell epitopes in codon-optimized SARS-associated coronavirus spike protein",
  "DOI": "10.1016/j.virol.2005.01.050",
  "Count": 1
}, {
  "Atitle": "Expression, purification, and characterization of SARS coronavirus RNA polymerase",
  "DOI": "10.1016/j.virol.2005.02.017",
  "Count": 1
}, {
  "Atitle": "SARS coronavirus nucleocapsid immunodominant T-cell epitope cluster is common to both exogenous recombinant and endogenous DNA-encoded immunogens",
  "DOI": "10.1016/j.virol.2005.11.042",
  "Count": 1
}, {
  "Atitle": "Generation and characterization of human monoclonal neutralizing antibodies with distinct binding and sequence features against SARS coronavirus using XenoMouse �",
  "DOI": "10.1016/j.virol.2006.09.029",
  "Count": 1
}, {
  "Atitle": "Palmitoylation of the cysteine-rich endodomain of the SARS�coronavirus spike glycoprotein is important for spike-mediated cell fusion",
  "DOI": "10.1016/j.virol.2006.10.034",
  "Count": 1
}, {
  "Atitle": "Importance of cholesterol-rich membrane microdomains in the interaction of the S protein of SARS-coronavirus with the cellular receptor angiotensin-converting enzyme 2",
  "DOI": "10.1016/j.virol.2008.08.026",
  "Count": 1
}, {
  "Atitle": "Importance of cholesterol-rich membrane microdomains in the interaction of the S protein of SARS-coronavirus with the cellular receptor angiotensin-converting enzyme 2.(Report",
  "DOI": "10.1016/j.virol.2008.08.026",
  "Count": 1
}, {
  "Atitle": "Extensive diversity of coronaviruses in bats from China",
  "DOI": "10.1016/j.virol.2017.03.019",
  "Count": 1
}, {
  "Atitle": "MERS coronavirus nsp1 participates in an efficient propagation through a specific interaction with viral RNA",
  "DOI": "10.1016/j.virol.2017.08.026",
  "Count": 1
}, {
  "Atitle": "An �Old� protein with a new story: Coronavirus endoribonuclease is important for evading host antiviral defenses",
  "DOI": "10.1016/j.virol.2017.12.024",
  "Count": 1
}, {
  "Atitle": "Live-attenuated bivalent measles virus-derived vaccines targeting Middle East respiratory syndrome coronavirus induce robust and multifunctional T cell responses against both viruses in an appropriate mouse model",
  "DOI": "10.1016/j.virol.2018.05.028",
  "Count": 1
}, {
  "Atitle": "The SARS-Coronavirus PLnc domain of nsp3 as a replication/transcription scaffolding protein",
  "DOI": "10.1016/j.virusres.2007.11.017",
  "Count": 1
}, {
  "Atitle": "SARS coronavirus spike protein-induced innate immune response occurs via activation of the NF-?B pathway in human monocyte macrophages in vitro",
  "DOI": "10.1016/j.virusres.2009.01.005",
  "Count": 1
}, {
  "Atitle": "Short peptides derived from the interaction domain of SARS coronavirus nonstructural protein nsp10 can suppress the 2?-O-methyltransferase activity of nsp10/nsp16 complex",
  "DOI": "10.1016/j.virusres.2012.05.017",
  "Count": 1
}, {
  "Atitle": "The evolution of codon usage in structural and non-structural viral genes: The case of Avian coronavirus and its natural host Gallus gallus",
  "DOI": "10.1016/j.virusres.2013.09.033",
  "Count": 1
}, {
  "Atitle": "Host cell proteases: Critical determinants of coronavirus tropism and pathogenesis",
  "DOI": "10.1016/j.virusres.2014.11.021",
  "Count": 1
}, {
  "Atitle": "Discovery of a novel canine respiratory coronavirus support genetic recombination among betacoronavirus1",
  "DOI": "10.1016/j.virusres.2017.05.006",
  "Count": 1
}, {
  "Atitle": "Identification of the immunodominant neutralizing regions in the spike glycoprotein of porcine deltacoronavirus",
  "DOI": "10.1016/j.virusres.2019.197834",
  "Count": 1
}, {
  "Atitle": "Prediction of proteinase cleavage sites in polyproteins of coronaviruses and its applications in analyzing SARS-CoV genomes",
  "DOI": "10.1016/S0014-5793(03)01091-3",
  "Count": 1
}, {
  "Atitle": "Clinical progression and viral load in a community outbreak of coronavirus-associated SARS pneumonia: a prospective study",
  "DOI": "10.1016/S0140-6736(03)13412-5",
  "Count": 1
}, {
  "Atitle": "Clinical progression and viral load in a community outbreak of coronavirus-associated SARS pneumonia: a prospective study. (Articles.(severe acute respiratory syndrome",
  "DOI": "10.1016/S0140-6736(03)13412-5",
  "Count": 1
}, {
  "Atitle": "Comparative analysis of the SARS coronavirus genome: A good start to a long journey",
  "DOI": "10.1016/S0140-6736(03)13444-7",
  "Count": 1
}, {
  "Atitle": "Effects of a SARS-associated coronavirus vaccine in monkeys",
  "DOI": "10.1016/S0140-6736(03)14962-8",
  "Count": 1
}, {
  "Atitle": "Clinical features and viral diagnosis of two cases of infection with Middle East Respiratory Syndrome coronavirus: a report of nosocomial transmission",
  "DOI": "10.1016/S0140-6736(13)60982-4",
  "Count": 1
}, {
  "Atitle": "Research needed to prevent MERS coronavirus outbreaks",
  "DOI": "10.1016/S0140-6736(17)30998-4",
  "Count": 1
}, {
  "Atitle": "Department of Error: Clinical features of patients infected with 2019 novel coronavirus in Wuhan, China (The Lancet (2020 395(10223 (497�506, (S0140673620301835, (10.1016/S0140-6736(2030183-5",
  "DOI": "10.1016/S0140-6736(20)30252-X",
  "Count": 1
}, {
  "Atitle": "Lessons for managing high-consequence infections from first COVID-19 cases in the UK",
  "DOI": "10.1016/S0140-6736(20)30463-3",
  "Count": 1
}, {
  "Atitle": "Health security capacities in the context of COVID-19 outbreak: an analysis of International Health Regulations annual report data from 182 countries",
  "DOI": "10.1016/S0140-6736(20)30553-5",
  "Count": 1
}, {
  "Atitle": "Evidence informing the UK's COVID-19 public health response must be transparent",
  "DOI": "10.1016/S0140-6736(20)30667-X",
  "Count": 1
}, {
  "Atitle": "The global community needs to swiftly ramp up the response to contain COVID-19",
  "DOI": "10.1016/S0140-6736(20)30679-6",
  "Count": 1
}, {
  "Atitle": "COVID-19: learning from experience",
  "DOI": "10.1016/s0140-6736(20)30686-3",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: quantification of the extent of the epidemic, surveillance biases, and transmissibility",
  "DOI": "10.1016/S1473-3099(13)70304-9",
  "Count": 1
}, {
  "Atitle": "Presence of Middle East respiratory syndrome coronavirus antibodies in Saudi Arabia: a nationwide, cross-sectional, serological study",
  "DOI": "10.1016/S1473-3099(15)00029-8",
  "Count": 1
}, {
  "Atitle": "Safety and tolerability of a novel, polyclonal human anti-MERS coronavirus antibody produced from transchromosomic cattle: a phase 1 randomised, double-blind, single-dose-escalation study",
  "DOI": "10.1016/s1473-3099(18)30002-1",
  "Count": 1
}, {
  "Atitle": "Safety and immunogenicity of an anti-Middle East respiratory syndrome coronavirus DNA vaccine: a phase 1, open-label, single-arm, dose-escalation trial",
  "DOI": "10.1016/s1473-3099(19)30266-x",
  "Count": 1
}, {
  "Atitle": "Vaccine against Middle East respiratory syndrome coronavirus",
  "DOI": "10.1016/s1473-3099(19)30476-1",
  "Count": 1
}, {
  "Atitle": "The first Vietnamese case of COVID-19 acquired from China",
  "DOI": "10.1016/s1473-3099(20)30111-0",
  "Count": 1
}, {
  "Atitle": "Covert COVID-19 and false-positive dengue serology in Singapore",
  "DOI": "10.1016/S1473-3099(20)30158-4",
  "Count": 1
}, {
  "Atitle": "COVID-19 in pregnant women - Authors' reply",
  "DOI": "10.1016/S1473-3099(20)30192-4",
  "Count": 1
}, {
  "Atitle": "Les infections � coronavirus humains",
  "DOI": "10.1016/S1773-035X(16)30369-0",
  "Count": 1
}, {
  "Atitle": "Coronavirus epidemic: preparing for extracorporeal organ support in intensive care",
  "DOI": "10.1016/S2213-2600(20)30060-6",
  "Count": 1
}, {
  "Atitle": "Australian Government releases face masks to protect against coronavirus",
  "DOI": "10.1016/S2213-2600(20)30064-3",
  "Count": 1
}, {
  "Atitle": "Respiratory support for patients with COVID-19 infection",
  "DOI": "10.1016/S2213-2600(20)30110-7",
  "Count": 1
}, {
  "Atitle": "A contingency plan for the management of the 2019 novel coronavirus outbreak in neonatal intensive care units",
  "DOI": "10.1016/S2352-4642(20)30040-7",
  "Count": 1
}, {
  "Atitle": "Implications of COVID-19 for patients with pre-existing digestive diseases",
  "DOI": "10.1016/S2468-1253(20)30076-5",
  "Count": 1
}, {
  "Atitle": "Screening of faecal microbiota transplant donors during the COVID-19 outbreak: suggestions for urgent updates from an international expert panel",
  "DOI": "10.1016/S2468-1253(20)30082-0",
  "Count": 1
}, {
  "Atitle": "COVID-19: a potential public health problem for homeless populations",
  "DOI": "10.1016/S2468-2667(20)30053-0",
  "Count": 1
}, {
  "Atitle": "COVID-19 and artificial intelligence: protecting health-care workers and curbing the spread",
  "DOI": "10.1016/S2589-7500(20)30054-6",
  "Count": 1
}, {
  "Atitle": "The time course of the immune response to experimental coronavirus infection of man",
  "DOI": "10.1017/S0950268800048019",
  "Count": 1
}, {
  "Atitle": "Global status of Middle East respiratory syndrome coronavirus in dromedary camels: a systematic review",
  "DOI": "10.1017/S095026881800345X",
  "Count": 1
}, {
  "Atitle": "Risk of COVID-19 importation to the Pacific islands through global air travel",
  "DOI": "10.1017/S0950268820000710",
  "Count": 1
}, {
  "Atitle": "Bovine-like coronaviruses in domestic and wild ruminants",
  "DOI": "10.1017/S1466252318000117",
  "Count": 1
}, {
  "Atitle": "Self-assembly of a nine-residue amyloid-forming peptide fragment of SARS corona virus E-protein: mechanism of self aggregation and amyloid-inhibition of hIAPP",
  "DOI": "10.1021/acs.biochem.5b00061",
  "Count": 1
}, {
  "Atitle": "Can a Paper-Based Device Trace COVID-19 Sources with Wastewater-Based Epidemiology?",
  "DOI": "10.1021/acs.est.0c01174",
  "Count": 1
}, {
  "Atitle": "Glutathione-Capped AgS Nanoclusters Inhibit Coronavirus Proliferation through Blockage of Viral RNA Synthesis and Budding",
  "DOI": "10.1021/acsami.7b13811",
  "Count": 1
}, {
  "Atitle": "Novel Gold Nanorod-Based HR1 Peptide Inhibitor for Middle East Respiratory Syndrome Coronavirus",
  "DOI": "10.1021/acsami.9b04240",
  "Count": 1
}, {
  "Atitle": "Functional Carbon Quantum Dots as Medical Countermeasures to Human Coronavirus",
  "DOI": "10.1021/acsami.9b15032",
  "Count": 1
}, {
  "Atitle": "Immunodominant SARS Coronavirus Epitopes in Humans Elicited both Enhancing and Neutralizing Effects on Infection in Non-human Primates",
  "DOI": "10.1021/acsinfecdis.6b00006",
  "Count": 1
}, {
  "Atitle": "Identification of novel inhibitors of the SARS coronavirus main protease 3CLpro",
  "DOI": "10.1021/bi0361766",
  "Count": 1
}, {
  "Atitle": "Papain-like protease 2 (PLP2 for severe acute respiratory syndrome coronavirus (SARS-CoV: Expression, purification, characterization, and inhibition",
  "DOI": "10.1021/bi0504761",
  "Count": 1
}, {
  "Atitle": "Identification of RNA pseudoknot-binding ligand that inhibits the -1 ribosomal frameshifting of SARS-coronavirus by structure-based virtual screening",
  "DOI": "10.1021/ja1098325",
  "Count": 1
}, {
  "Atitle": "Identification of RNA Pseudoknot-Binding Ligand That Inhibits the -1 Ribosomal Frameshifting of SARS-Coronavirus by Structure-Based Virtual Screening (vol 133, pg 10094, 2011",
  "DOI": "10.1021/ja206172p",
  "Count": 1
}, {
  "Atitle": "Antiviral Activity of Glycyrrhizic Acid Derivatives against SARS?Coronavirus",
  "DOI": "10.1021/jm0493008",
  "Count": 1
}, {
  "Atitle": "Synthesis, crystal structure, structure-activity relationships, and antiviral activity of a potent SARS coronavirus 3CL protease inhibitor",
  "DOI": "10.1021/jm0603926",
  "Count": 1
}, {
  "Atitle": "Virology: Coronaviruses",
  "DOI": "10.1038/220650b0",
  "Count": 1
}, {
  "Atitle": "Virology: Molecular biology of the coronaviruses",
  "DOI": "10.1038/305474a0",
  "Count": 1
}, {
  "Atitle": "Human aminopeptidase N is a receptor for human coronavirus 229E",
  "DOI": "10.1038/357420a0",
  "Count": 1
}, {
  "Atitle": "Coronavirus latest: Global infections pass 300,000",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 1
}, {
  "Atitle": "Coronavirus latest: India begins nation-wide lockdown",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 1
}, {
  "Atitle": "Coronavirus latest: pandemic could have killed 40 million without any action",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 1
}, {
  "Atitle": "Coronavirus latest: Scientists call for an end to Trump ban on fetal-tissue research",
  "DOI": "10.1038/d41586-020-00154-w",
  "Count": 1
}, {
  "Atitle": "China coronavirus: labs worldwide scramble to analyse live samples",
  "DOI": "10.1038/d41586-020-00262-7",
  "Count": 1
}, {
  "Atitle": "CORONAVIRUS: LABS WORLDWIDE SCRAMBLE TO ANALYSE SAMPLES",
  "DOI": "10.1038/d41586-020-00262-7",
  "Count": 1
}, {
  "Atitle": "Coronavirus: keep sharing research",
  "DOI": "10.1038/d41586-020-00307-x",
  "Count": 1
}, {
  "Atitle": "'No one is allowed to go out': your stories from the coronavirus outbreak",
  "DOI": "10.1038/d41586-020-00478-7",
  "Count": 1
}, {
  "Atitle": "Coronavirus response: a focus on containment is still apt",
  "DOI": "10.1038/d41586-020-00623-2",
  "Count": 1
}, {
  "Atitle": "Coronavirus close-up, faded star and orchestral operation - February's best science images",
  "DOI": "10.1038/d41586-020-00639-8",
  "Count": 1
}, {
  "Atitle": "Covert coronavirus, chaos prize and the cost of contact-tracing",
  "DOI": "10.1038/d41586-020-00829-4",
  "Count": 1
}, {
  "Atitle": "Care for laboratory animals during COVID-19 crisis",
  "DOI": "10.1038/d41586-020-00869-w",
  "Count": 1
}, {
  "Atitle": "How to help the free market fight coronavirus",
  "DOI": "10.1038/d41586-020-00888-7",
  "Count": 1
}, {
  "Atitle": "A sensitive and specific antigen detection assay for Middle East respiratory syndrome coronavirus",
  "DOI": "10.1038/emi.2015.26",
  "Count": 1
}, {
  "Atitle": "Tensions linger over discovery of coronavirus",
  "DOI": "10.1038/nature.2012.12108",
  "Count": 1
}, {
  "Atitle": "Immunopathogenesis of coronavirus infections: implications for SARS",
  "DOI": "10.1038/nri1732",
  "Count": 1
}, {
  "Atitle": "Coronaviruses post-SARS: update on replication and pathogenesis",
  "DOI": "10.1038/nrmicro2147",
  "Count": 1
}, {
  "Atitle": "The impact of COVID-19 on the provision of donor hematopoietic stem cell products worldwide: collateral damage",
  "DOI": "10.1038/s41409-020-0873-x",
  "Count": 1
}, {
  "Atitle": "SARS-Coronavirus Open Reading Frame-3a drives multimodal necrotic cell death",
  "DOI": "10.1038/s41419-018-0917-y",
  "Count": 1
}, {
  "Atitle": "A novel coronavirus (2019-nCoV causing pneumonia-associated respiratory syndrome",
  "DOI": "10.1038/s41423-020-0372-4",
  "Count": 1
}, {
  "Atitle": "Revisiting the dangers of the coronavirus in the ophthalmology practice",
  "DOI": "10.1038/s41433-020-0790-7",
  "Count": 1
}, {
  "Atitle": "China's response to a novel coronavirus stands in stark contrast to the 2002 SARS outbreak response",
  "DOI": "10.1038/s41591-020-0771-1",
  "Count": 1
}, {
  "Atitle": "Estimating clinical severity of COVID-19 from the transmission dynamics in Wuhan, China",
  "DOI": "10.1038/s41591-020-0822-7",
  "Count": 1
}, {
  "Atitle": "Differential neurodegenerative phenotypes are associated with heterogeneous voiding dysfunction in a coronavirus-induced model of multiple sclerosis",
  "DOI": "10.1038/s41598-019-47407-x",
  "Count": 1
}, {
  "Atitle": "A second, non?canonical RNA?dependent RNA polymerase in SARS Coronavirus",
  "DOI": "10.1038/sj.emboj.7601368",
  "Count": 1
}, {
  "Atitle": "Inhibition of novel beta] coronavirus replication by a combination of interferon-alpha]2b and ribavirin",
  "DOI": "10.1038/srep01686",
  "Count": 1
}, {
  "Atitle": "SARS Coronavirus Fusion Peptide-Derived Sequence Suppresses Collagen-Induced Arthritis in DBA/1J Mice",
  "DOI": "10.1038/srep28672",
  "Count": 1
}, {
  "Atitle": "Bcl-xL inhibits T-cell apoptosis induced by expression of SARS coronavirus E protein in the absence of growth factors",
  "DOI": "10.1042/BJ20050698",
  "Count": 1
}, {
  "Atitle": "Coronavirus avian infectious bronchitis virus",
  "DOI": "10.1051/vetres:2006055",
  "Count": 1
}, {
  "Atitle": "Coronavirus-related nosocomial viral respiratory infections in a neonatal and paediatric intensive care unit: a prospective study",
  "DOI": "10.1053/jhin.2002.1179",
  "Count": 1
}, {
  "Atitle": "Novel Corona Virus (SARS-CoV-2",
  "DOI": "10.1055/a-1113-3096",
  "Count": 1
}, {
  "Atitle": "Novel Coronavirus in the Middle East: More Details",
  "DOI": "10.1056/ID201210310000004",
  "Count": 1
}, {
  "Atitle": "Novel Coronavirus Causes Lethal Respiratory Disease",
  "DOI": "10.1056/ID201303200000001",
  "Count": 1
}, {
  "Atitle": "A novel coronavirus and SARS",
  "DOI": "10.1056/NEJMc031427",
  "Count": 1
}, {
  "Atitle": "Disappearance of Antibodies to SARS-Associated Coronavirus after Recovery",
  "DOI": "10.1056/NEJMc070348",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus Infections in Health Care Workers",
  "DOI": "10.1056/NEJMc1308698",
  "Count": 1
}, {
  "Atitle": "Hospital-associated Middle East respiratory syndrome coronavirus infections",
  "DOI": "10.1056/NEJMc1311004",
  "Count": 1
}, {
  "Atitle": "Emerging Human Coronaviruses  Disease Potential and Preparedness",
  "DOI": "10.1056/NEJMe1212300",
  "Count": 1
}, {
  "Atitle": "Person-to-Person Spread of the MERS Coronavirus  An Evolving Picture",
  "DOI": "10.1056/NEJMe1308724",
  "Count": 1
}, {
  "Atitle": "Clinical Characteristics of 2019 Novel Coronavirus Infection",
  "DOI": "10.1056/nejm-jw.NA50821",
  "Count": 1
}, {
  "Atitle": "Hospital outbreak of Middle East respiratory syndrome coronavirus (New England Journal of Medicine (2013 369, (407-416",
  "DOI": "10.1056/NEJMoa1306742",
  "Count": 1
}, {
  "Atitle": "Am I Part of the Cure or Am I Part of the Disease? Keeping Coronavirus Out When a Doctor Comes Home",
  "DOI": "10.1056/NEJMp2004768",
  "Count": 1
}, {
  "Atitle": "Undocumented U.S. Immigrants and Covid-19",
  "DOI": "10.1056/nejmp2005953",
  "Count": 1
}, {
  "Atitle": "Characterization of severe acute respiratory syndrome-associated coronavirus (SARS-CoV spike glycoprotein-mediated viral entry",
  "DOI": "10.1073/pnas.0306446101",
  "Count": 1
}, {
  "Atitle": "Potent Neutralization of Severe Acute Respiratory Syndrome (SARS Coronavirus by a Human mAb to S1 Protein That Blocks Receptor Association",
  "DOI": "10.1073/pnas.0307140101",
  "Count": 1
}, {
  "Atitle": "The severe acute respiratory syndrome-coronavirus replicative protein nsp9 is a single-stranded RNA-binding subunit unique in the RNA virus world",
  "DOI": "10.1073/pnas.0307877101",
  "Count": 1
}, {
  "Atitle": "Severe Acute Respiratory Syndrome Coronavirus (SARS-CoV Infection Inhibition Using Spike Protein Heptad Repeat-Derived Peptides",
  "DOI": "10.1073/pnas.0400576101",
  "Count": 1
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus spike protein expressed by attenuated vaccinia virus protectively immunizes mice",
  "DOI": "10.1073/pnas.0401939101",
  "Count": 1
}, {
  "Atitle": "Evasion of antibody neutralization in emerging severe acute respiratory syndrome coronaviruses",
  "DOI": "10.1073/pnas.0409065102",
  "Count": 1
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus-like virus in Chinese horseshoe bats.(Author Abstract",
  "DOI": "10.1073/pnas.0506735102",
  "Count": 1
}, {
  "Atitle": "The structure of the endoribonuclease XendoU: From small nucleolar RNA processing to severe acute respiratory syndrome coronavirus replication",
  "DOI": "10.1073/pnas.0602426103",
  "Count": 1
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus nsp1 protein suppresses host gene expression by promoting host mRNA degradation",
  "DOI": "10.1073/pnas.0603144103",
  "Count": 1
}, {
  "Atitle": "Crystal structure of mouse coronavirus receptor-binding domain complexed with its murine receptor",
  "DOI": "10.1073/pnas.1104306108",
  "Count": 1
}, {
  "Atitle": "Interferon induction of IFITM proteins promotes infection by human coronavirus OC43",
  "DOI": "10.1073/pnas.1320856111",
  "Count": 1
}, {
  "Atitle": "Structural basis and functional analysis of the SARS coronavirus nsp14-nsp10 complex",
  "DOI": "10.1073/pnas.1508686112",
  "Count": 1
}, {
  "Atitle": "Prophylactic and postexposure efficacy of a potent human monoclonal antibody against MERS coronavirus",
  "DOI": "10.1073/pnas.1510199112",
  "Count": 1
}, {
  "Atitle": "MERS coronaviruses from camels in Africa exhibit region-dependent genetic diversity",
  "DOI": "10.1073/pnas.1718769115",
  "Count": 1
}, {
  "Atitle": "Human coronaviruses OC43 and HKU1 bind to 9-O-acetylated sialic acids via a conserved receptor-binding site in spike protein domain A",
  "DOI": "10.1073/pnas.1809667116",
  "Count": 1
}, {
  "Atitle": "Self-assembly of severe acute respiratory syndrome coronavirus membrane protein",
  "DOI": "10.1074/jbc.M109.030270",
  "Count": 1
}, {
  "Atitle": "Phosphatidylinositol 4-kinase III? is required for severe acute respiratory syndrome coronavirus spike-mediated cell entry",
  "DOI": "10.1074/jbc.M111.312561",
  "Count": 1
}, {
  "Atitle": "Glycopeptide Antibiotics Potently Inhibit Cathepsin L in the Late Endosome/Lysosome and Block the Entry of Ebola Virus, Middle East Respiratory Syndrome Coronavirus (MERS-CoV, and Severe Acute Respiratory Syndrome Coronavirus (SARS-CoV",
  "DOI": "10.1074/jbc.M116.716100",
  "Count": 1
}, {
  "Atitle": "Tumor Necrosis Factor-? Convertase (ADAM17 Mediates Regulated Ectodomain Shedding of the Severe-acute Respiratory Syndrome-Coronavirus (SARS-CoV Receptor, Angiotensin-converting Enzyme-2 (ACE2",
  "DOI": "10.1074/jbc.m505111200",
  "Count": 1
}, {
  "Atitle": "TMPRSS11A activates the influenza A virus hemagglutinin and the MERS coronavirus spike protein and is insensitive against blockade by HAI-1",
  "DOI": "10.1074/jbc.RA118.001273",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus and bat coronavirus HKU9 both can utilize GRP78 for attachment onto host cells",
  "DOI": "10.1074/jbc.RA118.001897",
  "Count": 1
}, {
  "Atitle": "Glycosylation of the viral attachment protein of avian coronavirus is essential for host cell and receptor binding",
  "DOI": "10.1074/jbc.RA119.007532",
  "Count": 1
}, {
  "Atitle": "A conserved region of nonstructural protein 1 from alphacoronaviruses inhibits host gene expression and is critical for viral virulence",
  "DOI": "10.1074/jbc.RA119.009713",
  "Count": 1
}, {
  "Atitle": "Molecular Dynamics Simulations of Various Coronavirus Main Proteinases",
  "DOI": "10.1080/07391102.2004.10506982",
  "Count": 1
}, {
  "Atitle": "Should patients stop their biologic treatment during the COVID-19 pandemic",
  "DOI": "10.1080/09546634.2020.1742438",
  "Count": 1
}, {
  "Atitle": "Progress of Middle East respiratory syndrome coronavirus vaccines: a patent review",
  "DOI": "10.1080/13543776.2017.1281248",
  "Count": 1
}, {
  "Atitle": "Studying COVID-19 in light of critical approaches to risk and uncertainty: research pathways, conceptual tools, and some magic from Mary Douglas",
  "DOI": "10.1080/13698575.2020.1745508",
  "Count": 1
}, {
  "Atitle": "Feline infectious peritonitis: answers to frequently asked questions concerning FIP and coronavirus",
  "DOI": "10.1080/17415349.2019.1629366",
  "Count": 1
}, {
  "Atitle": "Vaccines for emerging infectious diseases: Lessons from MERS coronavirus and Zika virus",
  "DOI": "10.1080/21645515.2017.1358325",
  "Count": 1
}, {
  "Atitle": "Development of Middle East Respiratory Syndrome Coronavirus vaccines � advances and challenges",
  "DOI": "10.1080/21645515.2017.1389362",
  "Count": 1
}, {
  "Atitle": "Antibodies and vaccines against Middle East respiratory syndrome coronavirus",
  "DOI": "10.1080/22221751.2019.1624482",
  "Count": 1
}, {
  "Atitle": "Blocking transmission of Middle East respiratory syndrome coronavirus (MERS-CoV in llamas by vaccination with a recombinant spike protein",
  "DOI": "10.1080/22221751.2019.1685912",
  "Count": 1
}, {
  "Atitle": "Swine acute diarrhea syndrome coronavirus-induced apoptosis is caspase- and cyclophilin D- dependent",
  "DOI": "10.1080/22221751.2020.1722758",
  "Count": 1
}, {
  "Atitle": "An emerging coronavirus causing pneumonia outbreak in Wuhan, China: calling for developing therapeutic and prophylactic strategies",
  "DOI": "10.1080/22221751.2020.1723441",
  "Count": 1
}, {
  "Atitle": "COVID-19: What implications for sexual and reproductive health and rights globally?",
  "DOI": "10.1080/26410397.2020.1746065",
  "Count": 1
}, {
  "Atitle": "Mild illness associated with severe acute respiratory syndrome coronavirus infection: lessons from a prospective seroepidemiologic study of health-care workers in a teaching hospital in Singapore",
  "DOI": "10.1086/381558",
  "Count": 1
}, {
  "Atitle": "Neutralizing antibodies in patients with severe acute respiratory syndrome-associated coronavirus infection",
  "DOI": "10.1086/423286",
  "Count": 1
}, {
  "Atitle": "Human coronavirus NL63 infection and other coronavirus infections in children hospitalized with acute respiratory disease in Hong Kong, China",
  "DOI": "10.1086/430301",
  "Count": 1
}, {
  "Atitle": "The Large 386?nt Deletion in SARS?Associated Coronavirus: Evidence for Quasispecies?",
  "DOI": "10.1086/507044",
  "Count": 1
}, {
  "Atitle": "Human Coronavirus and Acute Respiratory Illness in Older Adults with Chronic Obstructive Pulmonary Disease",
  "DOI": "10.1086/597122",
  "Count": 1
}, {
  "Atitle": "Significance of the Myxovirus Resistance A (MxA Gene-123C > A Single-Nucleotide Polymorphism in Suppressed Interferon beta Induction of Severe Acute Respiratory Syndrome Coronavirus Infection",
  "DOI": "10.1086/652799",
  "Count": 1
}, {
  "Atitle": "The membrane protein of severe acute respiratory syndrome coronavirus acts as a dominant immunogen revealed by a clustering region of novel functionally and structurally defined cytotoxic T-lymphocyte epitopes",
  "DOI": "10.1086/656315",
  "Count": 1
}, {
  "Atitle": "Application of Needleman-Wunch Algorithm to identify mutation in DNA sequences of Corona virus",
  "DOI": "10.1088/1742-6596/1218/1/012031",
  "Count": 1
}, {
  "Atitle": "Molecular Study and Phylogenetic Analysis of Middle East Respiratory Syndrome Corona Virus (MERSCoV in Camel and Human",
  "DOI": "10.1088/1742-6596/1294/6/062097",
  "Count": 1
}, {
  "Atitle": "Cell entry by enveloped viruses: Redox considerations for HIV and SARS-coronavirus",
  "DOI": "10.1089/ars.2007.1639",
  "Count": 1
}, {
  "Atitle": "Breastfeeding and Respiratory Antivirals: Coronavirus and Influenza",
  "DOI": "10.1089/bfm.2020.29149.poa",
  "Count": 1
}, {
  "Atitle": "BGI's Coronavirus Response?: Building a Lab in Wuhan, China",
  "DOI": "10.1089/gen.40.03.02",
  "Count": 1
}, {
  "Atitle": "COVID-19 (Coronavirus",
  "DOI": "10.1089/lrb.2020.29084.cov",
  "Count": 1
}, {
  "Atitle": "First Report of Coronaviruses in Northern European Bats",
  "DOI": "10.1089/vbz.2018.2367",
  "Count": 1
}, {
  "Atitle": "Vaccine Design for Severe Acute Respiratory Syndrome Coronavirus",
  "DOI": "10.1089/vim.2005.18.327",
  "Count": 1
}, {
  "Atitle": "Porcine Reproductive and Respiratory Syndrome Virus-Induced Immunosuppression Exacerbates the Inflammatory Response to Porcine Respiratory Coronavirus in Pigs",
  "DOI": "10.1089/vim.2010.0051",
  "Count": 1
}, {
  "Atitle": "Risks of Death and Severe Disease in Patients With Middle East Respiratory Syndrome Coronavirus, 2012�2015",
  "DOI": "10.1093/aje/kww013",
  "Count": 1
}, {
  "Atitle": "De-isolating COVID-19 Suspect Cases: A Continuing Challenge",
  "DOI": "10.1093/cid/ciaa179",
  "Count": 1
}, {
  "Atitle": "Simulation of the clinical and pathological manifestations of Coronavirus Disease 2019 (COVID-19 in golden Syrian hamster model: implications for disease pathogenesis and transmissibility",
  "DOI": "10.1093/cid/ciaa325",
  "Count": 1
}, {
  "Atitle": "Risk factors for transmission of Middle East respiratory syndrome coronavirus infection during the 2015 outbreak in South Korea",
  "DOI": "10.1093/cid/ciw768",
  "Count": 1
}, {
  "Atitle": "Clinical Significance of Human Coronavirus in Bronchoalveolar Lavage Samples From Hematopoietic Cell Transplant Recipients and Patients With Hematologic Malignancies",
  "DOI": "10.1093/cid/cix160",
  "Count": 1
}, {
  "Atitle": "Racing towards the development of diagnostics for a novel coronavirus (2019-nCoV",
  "DOI": "10.1093/clinchem/hvaa038",
  "Count": 1
}, {
  "Atitle": "Structure of coronavirus main proteinase reveals combination of a chymotrypsin fold with an extra ??helical domain",
  "DOI": "10.1093/emboj/cdf327",
  "Count": 1
}, {
  "Atitle": "Prevention of experimental coronavirus colds with intranasal alpha-2b interferon",
  "DOI": "10.1093/infdis/154.3.443",
  "Count": 1
}, {
  "Atitle": "An experimental model for myocarditis and congestive heart failure after rabbit coronavirus infection",
  "DOI": "10.1093/infdis/165.1.134",
  "Count": 1
}, {
  "Atitle": "A Familial Cluster of Infection Associated With the 2019 Novel Coronavirus Indicating Possible Person-to-Person Transmission During the Incubation Period",
  "DOI": "10.1093/infdis/jiaa077",
  "Count": 1
}, {
  "Atitle": "Public health measures to slow community spread of COVID-19",
  "DOI": "10.1093/infdis/jiaa123",
  "Count": 1
}, {
  "Atitle": "Differential cell line susceptibility to the emerging novel human betacoronavirus 2c EMC/2012: implications for disease pathogenesis and clinical manifestation",
  "DOI": "10.1093/infdis/jit123",
  "Count": 1
}, {
  "Atitle": "A new virulent human coronavirus: How much does tissue culture tropism tell us?",
  "DOI": "10.1093/infdis/jit125",
  "Count": 1
}, {
  "Atitle": "An animal model of MERS produced by infection of rhesus macaques with MERS coronavirus",
  "DOI": "10.1093/infdis/jit590",
  "Count": 1
}, {
  "Atitle": "Stillbirth during infection with Middle East respiratory syndrome coronavirus",
  "DOI": "10.1093/infdis/jiu068",
  "Count": 1
}, {
  "Atitle": "Ultrapotent Human Neutralizing Antibody Repertoires Against Middle East Respiratory Syndrome Coronavirus From a Recovered Patient",
  "DOI": "10.1093/infdis/jiy311",
  "Count": 1
}, {
  "Atitle": "The management of coronavirus infections with particular reference to SARS",
  "DOI": "10.1093/jac/dkn243",
  "Count": 1
}, {
  "Atitle": "IFN-?2a or IFN-?1a in combination with ribavirin to treat Middle East respiratory syndrome coronavirus pneumonia: a retrospective study",
  "DOI": "10.1093/jac/dkv085",
  "Count": 1
}, {
  "Atitle": "Potential for global spread of a novel coronavirus from China",
  "DOI": "10.1093/jtm/taaa011",
  "Count": 1
}, {
  "Atitle": "Travellers give wings to novel coronavirus (2019-nCoV",
  "DOI": "10.1093/jtm/taaa015",
  "Count": 1
}, {
  "Atitle": "Correlation between travellers departing from Wuhan before the Spring Festival and subsequent spread of COVID-19 to all provinces in China",
  "DOI": "10.1093/jtm/taaa036",
  "Count": 1
}, {
  "Atitle": "Definitive diagnosis in suspected Middle East Respiratory Syndrome Coronavirus cases",
  "DOI": "10.1093/jtm/tax084",
  "Count": 1
}, {
  "Atitle": "Molecular model of SARS coronavirus polymerase: implications for biochemical functions and drug design",
  "DOI": "10.1093/nar/gkg916",
  "Count": 1
}, {
  "Atitle": "The RNA polymerase activity of SARS-coronavirus nsp12 is primer dependent",
  "DOI": "10.1093/nar/gkp904",
  "Count": 1
}, {
  "Atitle": "Binding of the 5'-untranslated region of coronavirus RNA to zinc finger CCHC-type and RNA-binding motif 1 enhances viral replication and transcription",
  "DOI": "10.1093/nar/gks165",
  "Count": 1
}, {
  "Atitle": "Delicate structural coordination of the Severe Acute Respiratory Syndrome coronavirus Nsp13 upon ATP hydrolysis",
  "DOI": "10.1093/nar/gkz409",
  "Count": 1
}, {
  "Atitle": "Recommended psychological crisis intervention response to the 2019 novel coronavirus pneumonia outbreak in China: a model of West China Hospital",
  "DOI": "10.1093/pcmedi/pbaa006",
  "Count": 1
}, {
  "Atitle": "Changes of CT Findings in a 2019 Novel Coronavirus (2019-nCoV pneumonia patient",
  "DOI": "10.1093/qjmed/hcaa038",
  "Count": 1
}, {
  "Atitle": "Limiting spread of COVID-19 from cruise ships - lessons to be learnt from Japan",
  "DOI": "10.1093/qjmed/hcaa092",
  "Count": 1
}, {
  "Atitle": "Coronavirus infection in an AIDS patient",
  "DOI": "10.1097/00002030-200403260-00021",
  "Count": 1
}, {
  "Atitle": "ISOLATION AND PROPAGATION OF A HUMAN ENTERIC CORONA VIRUS",
  "DOI": "10.1097/00005176-198607000-00033",
  "Count": 1
}, {
  "Atitle": "The widening scope of coronaviruses",
  "DOI": "10.1097/01.mop.0000192520.48411.fa",
  "Count": 1
}, {
  "Atitle": "Intubation and Ventilation amid the COVID-19 Outbreak",
  "DOI": "10.1097/ALN.0000000000003296",
  "Count": 1
}, {
  "Atitle": "Establishing and Managing a Temporary Coronavirus Disease 2019 Specialty Hospital in Wuhan, China",
  "DOI": "10.1097/ALN.0000000000003299",
  "Count": 1
}, {
  "Atitle": "Coronavirus Disease 2019 (COVID-19 and Pregnancy: Responding to a Rapidly Evolving Situation",
  "DOI": "10.1097/AOG.0000000000003873",
  "Count": 1
}, {
  "Atitle": "Extracorporeal membrane oxygenation support in 2019 novel coronavirus disease",
  "DOI": "10.1097/CM9.0000000000000778",
  "Count": 1
}, {
  "Atitle": "Extracorporeal membrane oxygenation support in 2019 novel coronavirus disease: indications, timing, and implementation",
  "DOI": "10.1097/CM9.0000000000000778",
  "Count": 1
}, {
  "Atitle": "A case of 2019 novel coronavirus infected pneumonia with twice negative 2019-nCoV nucleic acid testing within 8 days",
  "DOI": "10.1097/CM9.0000000000000788",
  "Count": 1
}, {
  "Atitle": "Potential therapeutic options for coronavirus disease 2019",
  "DOI": "10.1097/CM9.0000000000000816",
  "Count": 1
}, {
  "Atitle": "Clinical characteristics of fatal and recovered cases of coronavirus disease 2019 (COVID-19 in Wuhan, China",
  "DOI": "10.1097/CM9.0000000000000824",
  "Count": 1
}, {
  "Atitle": "Brief Report: Incubation Period Duration and Severity of Clinical Disease Following Severe Acute Respiratory Syndrome Coronavirus Infection",
  "DOI": "10.1097/EDE.0000000000000339",
  "Count": 1
}, {
  "Atitle": "Severity and Outcome Associated With Human Coronavirus OC43 Infections Among Children",
  "DOI": "10.1097/INF.0b013e3182812787",
  "Count": 1
}, {
  "Atitle": "The explosive epidemic outbreak of novel coronavirus disease 2019 (COVID-19 and the persistent threat of respiratory tract infectious diseases to global health security",
  "DOI": "10.1097/MCP.0000000000000676",
  "Count": 1
}, {
  "Atitle": "Coronaviruses: severe acute respiratory syndrome coronavirus and Middle East respiratory syndrome coronavirus in travelers",
  "DOI": "10.1097/QCO.0000000000000089",
  "Count": 1
}, {
  "Atitle": "Deep Learning Localization of Pneumonia: 2019 Coronavirus (COVID-19 Outbreak",
  "DOI": "10.1097/RTI.0000000000000512",
  "Count": 1
}, {
  "Atitle": "Coronavirus IBV: Further evidence that the surface projections are associated with two glycopolypeptides",
  "DOI": "10.1099/0022-1317-64-8-1787",
  "Count": 1
}, {
  "Atitle": "Survival characteristics of airborne human coronavirus 229E",
  "DOI": "10.1099/0022-1317-66-12-2743",
  "Count": 1
}, {
  "Atitle": "The contribution of the cytoplasmic retrieval signal of severe acute respiratory syndrome coronavirus to intracellular accumulation of S proteins and incorporation of S protein into virus-like particles",
  "DOI": "10.1099/jgv.0.000494",
  "Count": 1
}, {
  "Atitle": "Discovery of a novel accessory protein NS7a encoded by porcine deltacoronavirus",
  "DOI": "10.1099/jgv.0.000690",
  "Count": 1
}, {
  "Atitle": "Antibody response and viraemia during the course of severe acute respiratory syndrome (SARS-associated coronavirus infection",
  "DOI": "10.1099/jmm.0.45561-0",
  "Count": 1
}, {
  "Atitle": "Detection of polyoma and corona viruses in bats of Canada",
  "DOI": "10.1099/vir.0.010694-0",
  "Count": 1
}, {
  "Atitle": "Mechanisms and enzymes involved in SARS coronavirus genome expression",
  "DOI": "10.1099/vir.0.19424-0",
  "Count": 1
}, {
  "Atitle": "Interaction of severe acute respiratory syndrome-coronavirus and NL63 coronavirus spike proteins with angiotensin converting enzyme-2",
  "DOI": "10.1099/vir.0.2008/003962-0",
  "Count": 1
}, {
  "Atitle": "Comparative evaluation of two severe acute respiratory syndrome (SARS vaccine candidates in mice challenged with SARS coronavirus",
  "DOI": "10.1099/vir.0.81579-0",
  "Count": 1
}, {
  "Atitle": "Analysis of ACE2 in polarized epithelial cells: surface expression and function as receptor for severe acute respiratory syndrome-associated coronavirus",
  "DOI": "10.1099/vir.0.81749-0",
  "Count": 1
}, {
  "Atitle": "Identification of residues in the receptor-binding domain (RBD of the spike protein of human coronavirus NL63 that are critical for the RBD-ACE2 receptor interaction",
  "DOI": "10.1099/vir.0.83331-0",
  "Count": 1
}, {
  "Atitle": "Severe acute respiratory syndrome coronavirus 3a protein activates the mitochondrial death pathway through p38 MAP kinase activation",
  "DOI": "10.1099/vir.0.83665-0",
  "Count": 1
}, {
  "Atitle": "Time-varying transmission dynamics of Novel Coronavirus Pneumonia in China",
  "DOI": "10.1101/2020.01.25.919787",
  "Count": 1
}, {
  "Atitle": "Breaking down of healthcare system: Mathematical modelling for controlling the novel coronavirus (2019-nCoV outbreak in Wuhan, China",
  "DOI": "10.1101/2020.01.27.922443",
  "Count": 1
}, {
  "Atitle": "Fast assessment of human receptor-binding capability of 2019 novel coronavirus (2019-nCoV",
  "DOI": "10.1101/2020.02.01.930537",
  "Count": 1
}, {
  "Atitle": "Identification of a pangolin niche for a 2019-nCoV-like coronavirus through an extensive meta-metagenomic search",
  "DOI": "10.1101/2020.02.08.939660",
  "Count": 1
}, {
  "Atitle": "Are pangolins the intermediate host of the 2019 novel coronavirus (2019-nCoV ?",
  "DOI": "10.1101/2020.02.18.954628",
  "Count": 1
}, {
  "Atitle": "Epitope-based peptide vaccines predicted against novel coronavirus disease caused by SARS-CoV-2",
  "DOI": "10.1101/2020.02.25.965434",
  "Count": 1
}, {
  "Atitle": "Molecular Dynamics Simulations Indicate the COVID-19 Mpro Is Not a Viable Target for Small-Molecule Inhibitors Design",
  "DOI": "10.1101/2020.02.27.968008",
  "Count": 1
}, {
  "Atitle": "Comparative genomic analysis revealed specific mutation pattern between human coronavirus SARS-CoV-2 and Bat-SARSr-CoV RaTG13",
  "DOI": "10.1101/2020.02.27.969006",
  "Count": 1
}, {
  "Atitle": "The 2019 coronavirus (SARS-CoV-2 surface protein (Spike S1 Receptor Binding Domain undergoes conformational change upon heparin binding",
  "DOI": "10.1101/2020.02.29.971093",
  "Count": 1
}, {
  "Atitle": "A novel bat coronavirus reveals natural insertions at the S1/S2 cleavage site of the Spike protein and a possible recombinant origin of HCoV-19",
  "DOI": "10.1101/2020.03.02.974139",
  "Count": 1
}, {
  "Atitle": "Cryo-electron microscopy structure of the SADS-CoV spike glycoprotein provides insights into an evolution of unique coronavirus spike proteins",
  "DOI": "10.1101/2020.03.04.976258",
  "Count": 1
}, {
  "Atitle": "A mathematical model for estimating the age-specific transmissibility of a novel coronavirus",
  "DOI": "10.1101/2020.03.05.20031849",
  "Count": 1
}, {
  "Atitle": "Inhibition of SARS-CoV-2 infection (previously 2019-nCoV by a highly potent pan-coronavirus fusion inhibitor targeting its spike protein that harbors a high capacity to mediate membrane fusion",
  "DOI": "10.1101/2020.03.09.983247",
  "Count": 1
}, {
  "Atitle": "In silico Design of novel Multi-epitope recombinant Vaccine based on Coronavirus surface glycoprotein",
  "DOI": "10.1101/2020.03.10.985499",
  "Count": 1
}, {
  "Atitle": "Development of CRISPR as a prophylactic strategy to combat novel coronavirus and influenza",
  "DOI": "10.1101/2020.03.13.991307",
  "Count": 1
}, {
  "Atitle": "An artificial intelligence based first-line defence against COVID-19: digitally screening citizens for risks via a chatbot",
  "DOI": "10.1101/2020.03.25.008805",
  "Count": 1
}, {
  "Atitle": "Tracking the evolution of the SARS coronavirus using high-throughput, high-density resequencing arrays",
  "DOI": "10.1101/gr.2141004",
  "Count": 1
}, {
  "Atitle": "Journal Flexibility in the Troubling Times of COVID-19",
  "DOI": "10.1105/tpc.20.00223",
  "Count": 1
}, {
  "Atitle": "Coronavirus may cut global growth to 2% in early 2020",
  "DOI": "10.1108/OXAN-DB250564",
  "Count": 1
}, {
  "Atitle": "China COVID-19 outbreak will weaken Xi",
  "DOI": "10.1108/OXAN-DB250966",
  "Count": 1
}, {
  "Atitle": "COVID-19 may hurt Singapore most in South-east Asia",
  "DOI": "10.1108/OXAN-DB251060",
  "Count": 1
}, {
  "Atitle": "COVID-19 will have severe impact on Hong Kong",
  "DOI": "10.1108/OXAN-DB251126",
  "Count": 1
}, {
  "Atitle": "Analysis of the Genome Sequence and Prediction of B-Cell Epitopes of the Envelope Protein of Middle East Respiratory Syndrome-Coronavirus",
  "DOI": "10.1109/tcbb.2017.2702588",
  "Count": 1
}, {
  "Atitle": "Development of a diagnostic system for detection of specific antibodies and antigens against Middle East respiratory syndrome coronavirus",
  "DOI": "10.1111/1348-0421.12643",
  "Count": 1
}, {
  "Atitle": "Lack of nasal carriage of novel corona virus (HCoV-EMC in French Hajj pilgrims returning from the Hajj 2012, despite a high rate of respiratory symptoms",
  "DOI": "10.1111/1469-0691.12174",
  "Count": 1
}, {
  "Atitle": "2019 Novel coronavirus infection and gastrointestinal tract",
  "DOI": "10.1111/1751-2980.12851",
  "Count": 1
}, {
  "Atitle": "The emergence of the Middle East Respiratory Syndrome coronavirus",
  "DOI": "10.1111/2049-632X.12166",
  "Count": 1
}, {
  "Atitle": "Senior Medical Students in the COVID-19 Response: An opportunity to be proactive",
  "DOI": "10.1111/acem.13972",
  "Count": 1
}, {
  "Atitle": "COVID-19 and psoriasis: is it time to limit treatment with immunosuppressants? A call for action",
  "DOI": "10.1111/dth.13298",
  "Count": 1
}, {
  "Atitle": "Assessment of synthetic peptides of severe acute respiratory syndrome coronavirus recognized by long-lasting immunity",
  "DOI": "10.1111/j.1399-0039.2004.00314.x",
  "Count": 1
}, {
  "Atitle": "Development of broad-spectrum halomethyl ketone inhibitors against coronavirus main protease 3CLpro",
  "DOI": "10.1111/j.1747-0285.2008.00679.x",
  "Count": 1
}, {
  "Atitle": "Coronavirus infection in intensively managed cattle with respiratory disease",
  "DOI": "10.1111/j.1751-0813.2012.00978.x",
  "Count": 1
}, {
  "Atitle": "Action of disinfectants on canine coronavirus replication in vitro",
  "DOI": "10.1111/j.1863-2378.2007.01079.x",
  "Count": 1
}, {
  "Atitle": "Hospital response to the COVID-19 outbreak: the experience in Shanghai, China",
  "DOI": "10.1111/jan.14364",
  "Count": 1
}, {
  "Atitle": "A Case Study Evaluating the Risk of Infection from Middle Eastern Respiratory Syndrome Coronavirus (MERS?CoV in a Hospital Setting Through Bioaerosols",
  "DOI": "10.1111/risa.13389",
  "Count": 1
}, {
  "Atitle": "Characterization and evolution of the coronavirus porcine epidemic diarrhoea virus HLJBY isolated in China",
  "DOI": "10.1111/tbed.13321",
  "Count": 1
}, {
  "Atitle": "Surveillance and Taxonomic Analysis of the Coronavirus Dominant in Pigeons in China",
  "DOI": "10.1111/tbed.13541",
  "Count": 1
}, {
  "Atitle": "Amotosalen and ultraviolet A light efficiently inactivate MERS-coronavirus in human platelet concentrates",
  "DOI": "10.1111/tme.12638",
  "Count": 1
}, {
  "Atitle": "The H ajj pilgrimage and surveillance for M iddle E ast Respiratory syndrome coronavirus in pilgrims from A frican countries",
  "DOI": "10.1111/tmi.12318",
  "Count": 1
}, {
  "Atitle": "Inactivation of Middle East respiratory syndrome coronavirus (MERS?CoV in plasma products using a riboflavin?based and ultraviolet light?based photochemical treatment",
  "DOI": "10.1111/trf.13860",
  "Count": 1
}, {
  "Atitle": "Inactivation of Ebola virus and Middle East respiratory syndrome coronavirus in platelet concentrates and plasma by ultraviolet C light and methylene blue plus visible light, respectively",
  "DOI": "10.1111/trf.14652",
  "Count": 1
}, {
  "Atitle": "The genome sequence of the SARS-associated coronavirus. (Research Articles",
  "DOI": "10.1126/science.1085953",
  "Count": 1
}, {
  "Atitle": "Adaptation of SARS coronavirus to humans",
  "DOI": "10.1126/science.1118817",
  "Count": 1
}, {
  "Atitle": "New Coronavirus Reveals Some of Its Secrets",
  "DOI": "10.1126/science.340.6128.17",
  "Count": 1
}, {
  "Atitle": "Amid Heightened Concerns, New Name for Novel Coronavirus Emerges",
  "DOI": "10.1126/science.340.6133.673",
  "Count": 1
}, {
  "Atitle": "Strategies shift as coronavirus pandemic looms",
  "DOI": "10.1126/science.367.6481.962",
  "Count": 1
}, {
  "Atitle": "Race to find COVID-19 treatments accelerates",
  "DOI": "10.1126/science.367.6485.1412",
  "Count": 1
}, {
  "Atitle": "China reports more than 200 infections with new coronavirus from Wuhan",
  "DOI": "10.1126/science.aba9913",
  "Count": 1
}, {
  "Atitle": "Scientists are moving at record speed to create new coronavirus vaccinesbut they may come too late",
  "DOI": "10.1126/science.abb0612",
  "Count": 1
}, {
  "Atitle": "Mining coronavirus genomes for clues to the outbreak�s origins",
  "DOI": "10.1126/science.abb1256",
  "Count": 1
}, {
  "Atitle": "Scientists are racing to model the next moves of a coronavirus that's still hard to predict",
  "DOI": "10.1126/science.abb2161",
  "Count": 1
}, {
  "Atitle": "Neutralizing the MERS coronavirus threat",
  "DOI": "10.1126/scitranslmed.3009132",
  "Count": 1
}, {
  "Atitle": "Evaluation of SSYA10-001 as a Replication Inhibitor of Severe Acute Respiratory Syndrome, Mouse Hepatitis, and Middle East Respiratory Syndrome Coronaviruses",
  "DOI": "10.1128/AAC.02994-14",
  "Count": 1
}, {
  "Atitle": "Inhibition of Severe Acute Respiratory Syndrome Coronavirus Replication by Niclosamide",
  "DOI": "10.1128/AAC.48.7.2693-2696.2004",
  "Count": 1
}, {
  "Atitle": "Specific immunoglobulin g antibody detected in umbilical blood and amniotic fluid from a pregnant woman infected by the coronavirus associated with severe acute respiratory syndrome",
  "DOI": "10.1128/CDLI.11.6.1182-1184.2004",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus: another zoonotic betacoronavirus causing SARS-like disease",
  "DOI": "10.1128/CMR.00102-14",
  "Count": 1
}, {
  "Atitle": "Development of an Enzyme-Linked Immunosorbent Assay-Based Test with a Cocktail of Nucleocapsid and Spike Proteins for Detection of Severe Acute Respiratory Syndrome-Associated Coronavirus-Specific Antibody",
  "DOI": "10.1128/CVI.00252-08",
  "Count": 1
}, {
  "Atitle": "Recombinant Truncated Nucleocapsid Protein as Antigen in a Novel Immunoglobulin M Capture Enzyme-Linked Immunosorbent Assay for Diagnosis of Severe Acute Respiratory Syndrome Coronavirus Infection",
  "DOI": "10.1128/CVI.00360-06",
  "Count": 1
}, {
  "Atitle": "Comparative Evaluation of Two Hemagglutinating Encephalomyelitis Coronavirus Vaccine Candidates in Mice",
  "DOI": "10.1128/CVI.05716-12",
  "Count": 1
}, {
  "Atitle": "Complete genome of Avian coronavirus vaccine strains Ma5 and BR-I",
  "DOI": "10.1128/genomeA.00201-17",
  "Count": 1
}, {
  "Atitle": "Preparation of Armored RNA as a Control for Multiplex Real-Time Reverse Transcription-PCR Detection of Influenza Virus and Severe Acute Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/JCM.01904-07",
  "Count": 1
}, {
  "Atitle": "Multicenter Comparison of Nucleic Acid Extraction Methods for Detection of Severe Acute Respiratory Syndrome Coronavirus RNA in Stool Specimens",
  "DOI": "10.1128/jcm.02460-05",
  "Count": 1
}, {
  "Atitle": "Detection of severe acute respiratory syndrome coronavirus in blood of infected patients",
  "DOI": "10.1128/JCM.42.1.347-350.2004",
  "Count": 1
}, {
  "Atitle": "Reverse transcriptase PCR diagnostic assay for the coronavirus associated with severe acute respiratory syndrome",
  "DOI": "10.1128/JCM.42.5.1994-1999.2004",
  "Count": 1
}, {
  "Atitle": "Guinea Fowl Coronavirus Diversity Has Phenotypic Consequences for Glycan and Tissue Binding",
  "DOI": "10.1128/JVI.00067-19",
  "Count": 1
}, {
  "Atitle": "Homology-Based Identification of a Mutation in the Coronavirus RNA-Dependent RNA Polymerase That Confers Resistance to Multiple Mutagens",
  "DOI": "10.1128/JVI.00080-16",
  "Count": 1
}, {
  "Atitle": "Evidence for ACE2-Utilizing Coronaviruses (CoVs Related to Severe Acute Respiratory Syndrome CoV in Bats",
  "DOI": "10.1128/jvi.00311-12",
  "Count": 1
}, {
  "Atitle": "The cellular interactome of the coronavirus infectious bronchitis virus nucleocapsid protein and functional implications for virus biology",
  "DOI": "10.1128/JVI.00321-13",
  "Count": 1
}, {
  "Atitle": "Crystal Structure of Nonstructural Protein 10 from the Severe Acute Respiratory Syndrome Coronavirus Reveals a Novel Fold with Two Zinc-Binding Motifs",
  "DOI": "10.1128/JVI.00467-06",
  "Count": 1
}, {
  "Atitle": "Coronavirus and influenza virus proteolytic priming takes place in tetraspanin-enriched membrane microdomains",
  "DOI": "10.1128/JVI.00543-15",
  "Count": 1
}, {
  "Atitle": "Genomic Characterization of Severe Acute Respiratory Syndrome-Related Coronavirus in European Bats and Classification of Coronaviruses Based on Partial RNA-Dependent RNA Polymerase Gene Sequences",
  "DOI": "10.1128/JVI.00650-10",
  "Count": 1
}, {
  "Atitle": "Prevalence and genetic diversity of coronaviruses in bats from China",
  "DOI": "10.1128/JVI.00697-06",
  "Count": 1
}, {
  "Atitle": "Dependence of coronavirus RNA replication on an NH2-terminal partial nonstructural protein 1 in cis",
  "DOI": "10.1128/JVI.00738-14",
  "Count": 1
}, {
  "Atitle": "Effects of Toll-like receptor stimulation on eosinophilic infiltration in lungs of BALB/c mice immunized with UV-inactivated severe acute respiratory syndrome-related coronavirus vaccine",
  "DOI": "10.1128/JVI.00983-14",
  "Count": 1
}, {
  "Atitle": "Severe Acute Respiratory Syndrome (SARS Coronavirus ORF8 Protein Is Acquired from SARS-Related Coronavirus from Greater Horseshoe Bats through Recombination",
  "DOI": "10.1128/JVI.01048-15",
  "Count": 1
}, {
  "Atitle": "The M, E, and N structural proteins of the severe acute respiratory syndrome coronavirus are required for efficient assembly, trafficking, and release of virus-like particles",
  "DOI": "10.1128/JVI.01052-08",
  "Count": 1
}, {
  "Atitle": "Recent transmission of a novel alphacoronavirus, bat coronavirus HKU10, from Leschenault's rousettes to pomona leaf-nosed bats: first evidence of interspecies transmission of coronavirus between bats of different suborders",
  "DOI": "10.1128/JVI.01305-12",
  "Count": 1
}, {
  "Atitle": "The Nucleocapsid Protein of Coronaviruses Acts as a Viral Suppressor of RNA Silencing in Mammalian Cells",
  "DOI": "10.1128/JVI.01331-15",
  "Count": 1
}, {
  "Atitle": "Recombination, Reservoirs, and the Modular Spike: Mechanisms of Coronavirus Cross-Species Transmission",
  "DOI": "10.1128/JVI.01394-09",
  "Count": 1
}, {
  "Atitle": "Characterization and complete genome sequence of human coronavirus NL63 isolated in China",
  "DOI": "10.1128/JVI.01457-12",
  "Count": 1
}, {
  "Atitle": "Role of the Coronavirus E Viroporin Protein Transmembrane Domain in Virus Assembly",
  "DOI": "10.1128/JVI.01472-06",
  "Count": 1
}, {
  "Atitle": "Efficient activation of the severe acute respiratory syndrome coronavirus spike protein by the transmembrane protease TMPRSS2",
  "DOI": "10.1128/JVI.01542-10",
  "Count": 1
}, {
  "Atitle": "Neurovirulent Murine Coronavirus JHM.SD Uses Cellular Zinc Metalloproteases for Virus Entry and Cell-Cell Fusion",
  "DOI": "10.1128/JVI.01564-16",
  "Count": 1
}, {
  "Atitle": "Evidence for an Ancestral Association of Human Coronavirus 229E with Bats",
  "DOI": "10.1128/JVI.01755-15",
  "Count": 1
}, {
  "Atitle": "Severe Acute Respiratory Syndrome Coronavirus Open Reading Frame (ORF 3b, ORF 6, and Nucleocapsid Proteins Function as Interferon Antagonists",
  "DOI": "10.1128/jvi.01782-06",
  "Count": 1
}, {
  "Atitle": "Acute Respiratory Infection in Human Dipeptidyl Peptidase 4-Transgenic Mice Infected with Middle East Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/JVI.01818-18",
  "Count": 1
}, {
  "Atitle": "The Severe Acute Respiratory Syndrome Coronavirus Nucleocapsid Inhibits Type I Interferon Production by Interfering with TRIM25-Mediated RIG-I Ubiquitination",
  "DOI": "10.1128/JVI.02143-16",
  "Count": 1
}, {
  "Atitle": "Evidence that TMPRSS2 Activates the Severe Acute Respiratory Syndrome Coronavirus Spike Protein for Membrane Fusion and Reduces Viral Control by the Humoral Immune Response",
  "DOI": "10.1128/JVI.02232-10",
  "Count": 1
}, {
  "Atitle": "Severe Acute Respiratory Syndrome Coronavirus ORF7a Inhibits Bone Marrow Stromal Antigen 2 Virion Tethering through a Novel Mechanism of Glycosylation Interference",
  "DOI": "10.1128/JVI.02274-15",
  "Count": 1
}, {
  "Atitle": "Epithelial cells lining salivary gland ducts are early target cells of severe acute respiratory syndrome coronavirus infection in the upper respiratory tracts of rhesus macaques",
  "DOI": "10.1128/JVI.02292-10",
  "Count": 1
}, {
  "Atitle": "Discovery of a novel coronavirus, China Rattus coronavirus HKU24, from Norway rats supports the murine origin of Betacoronavirus 1 and has implications for the ancestor of Betacoronavirus lineage A",
  "DOI": "10.1128/JVI.02420-14",
  "Count": 1
}, {
  "Atitle": "Structure of the fusion core and inhibition of fusion by a heptad repeat peptide derived from the S protein of Middle East respiratory syndrome coronavirus",
  "DOI": "10.1128/JVI.02433-13",
  "Count": 1
}, {
  "Atitle": "Structural Characterization of Human Coronavirus NL63 N Protein",
  "DOI": "10.1128/JVI.02503-16",
  "Count": 1
}, {
  "Atitle": "Evolutionary Insights into the Ecology of Coronaviruses",
  "DOI": "10.1128/JVI.02605-06",
  "Count": 1
}, {
  "Atitle": "Differential expression of the MERS-coronavirus receptor in the upper respiratory tract of humans and dromedary camels",
  "DOI": "10.1128/JVI.02994-15",
  "Count": 1
}, {
  "Atitle": "Differential Expression of the Middle East Respiratory Syndrome Coronavirus Receptor in the Upper Respiratory Tracts of Humans and Dromedary Camels",
  "DOI": "10.1128/JVI.02994-15",
  "Count": 1
}, {
  "Atitle": "Identification of a broad-spectrum antiviral small molecule against severe acute respiratory syndrome coronavirus and Ebola, Hendra, and Nipah viruses by using a novel high-throughput screening assay",
  "DOI": "10.1128/JVI.03050-13",
  "Count": 1
}, {
  "Atitle": "Transgenic CCL2 Expression in the Central Nervous System Results in a Dysregulated Immune Response and Enhanced Lethality after Coronavirus Infection",
  "DOI": "10.1128/JVI.03089-12",
  "Count": 1
}, {
  "Atitle": "Mutagenesis of Coronavirus nsp14 Reveals Its Potential Role in Modulation of the Innate Immune Response",
  "DOI": "10.1128/JVI.03259-15",
  "Count": 1
}, {
  "Atitle": "A Case for the Ancient Origin of Coronaviruses",
  "DOI": "10.1128/JVI.03273-12",
  "Count": 1
}, {
  "Atitle": "Coronaviruses: important emerging human pathogens",
  "DOI": "10.1128/JVI.03488-13",
  "Count": 1
}, {
  "Atitle": "Middle east respiratory syndrome coronavirus 4a protein is a double-stranded RNA-binding protein that suppresses PACT-induced activation of RIG-I and MDA5 in the innate antiviral response",
  "DOI": "10.1128/JVI.03649-13",
  "Count": 1
}, {
  "Atitle": "Binding of avian coronavirus spike proteins to host factors reflects virus tropism and pathogenicity",
  "DOI": "10.1128/JVI.05112-11",
  "Count": 1
}, {
  "Atitle": "Molecular Epidemiology of Human Coronavirus OC43 Reveals Evolution of Different Genotypes over Time and Recent Emergence of a Novel Genotype due to Natural Recombination",
  "DOI": "10.1128/JVI.05512-11",
  "Count": 1
}, {
  "Atitle": "A Double-Inactivated Severe Acute Respiratory Syndrome Coronavirus Vaccine Provides Incomplete Protection in Mice and Induces Increased Eosinophilic Proinflammatory Pulmonary Response upon Challenge",
  "DOI": "10.1128/JVI.06048-11",
  "Count": 1
}, {
  "Atitle": "Discovery of Seven Novel Mammalian and Avian Coronaviruses in the Genus Deltacoronavirus Supports Bat Coronaviruses as the Gene Source of Alphacoronavirus and Betacoronavirus and Avian Coronaviruses as the Gene Source of Gammacoronavirus and Deltacoronavi",
  "DOI": "10.1128/JVI.06540-11",
  "Count": 1
}, {
  "Atitle": "Murine Coronavirus-Induced Subacute Fatal Peritonitis in C57BL/6 Mice Deficient in Gamma Interferon",
  "DOI": "10.1128/JVI.72.11.9286-9290.1998",
  "Count": 1
}, {
  "Atitle": "Characterization of the coronavirus mouse hepatitis virus strain A59 small membrane protein E",
  "DOI": "10.1128/JVI.74.5.2333-2342.2000",
  "Count": 1
}, {
  "Atitle": "S Protein of Severe Acute Respiratory Syndrome-Associated Coronavirus Mediates Entry into Hepatoma Cell Lines and Is Targeted by Neutralizing Antibodies in Infected Patients",
  "DOI": "10.1128/JVI.78.12.6134-6142.2004",
  "Count": 1
}, {
  "Atitle": "Small Molecules Blocking the Entry of Severe Acute Respiratory Syndrome Coronavirus into Host Cells",
  "DOI": "10.1128/JVI.78.20.11334-11339.2004",
  "Count": 1
}, {
  "Atitle": "Generation of synthetic severe acute respiratory syndrome coronavirus pseudoparticles: implications for assembly and vaccine production",
  "DOI": "10.1128/JVI.78.22.12557-12565.2004",
  "Count": 1
}, {
  "Atitle": "Cinanserin Is an Inhibitor of the 3C-Like Proteinase of Severe Acute Respiratory Syndrome Coronavirus and Strongly Reduces Virus Replication In Vitro",
  "DOI": "10.1128/JVI.79.11.7095-7103.2005",
  "Count": 1
}, {
  "Atitle": "Apical Entry and Release of Severe Acute Respiratory Syndrome-Associated Coronavirus in Polarized Calu-3 Lung Epithelial Cells",
  "DOI": "10.1128/JVI.79.15.9470-9479.2005",
  "Count": 1
}, {
  "Atitle": "Murine coronavirus requires lipid rafts for virus entry and cell-cell fusion but not for virus release",
  "DOI": "10.1128/JVI.79.15.9862-9871.2005",
  "Count": 1
}, {
  "Atitle": "Nitric Oxide Inhibits the Replication Cycle of Severe Acute Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/JVI.79.3.1966-1969.2005",
  "Count": 1
}, {
  "Atitle": "Increased Epitope-Specific CD8+ T Cells Prevent Murine Coronavirus Spread to the Spinal Cord and Subsequent Demyelination",
  "DOI": "10.1128/JVI.79.6.3370-3381.2005",
  "Count": 1
}, {
  "Atitle": "Monoclonal Antibodies Targeting the HR2 Domain and the Region Immediately Upstream of the HR2 of the S Protein Neutralize In Vitro Infection of Severe Acute Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/JVI.80.2.941-950.2006",
  "Count": 1
}, {
  "Atitle": "Important Role for the Transmembrane Domain of Severe Acute Respiratory Syndrome Coronavirus Spike Protein during Entry",
  "DOI": "10.1128/jvi.80.3.1302-1310.2006",
  "Count": 1
}, {
  "Atitle": "Further Evidence for Bats as the Evolutionary Source of Middle East Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/mBio.00373-17",
  "Count": 1
}, {
  "Atitle": "Complement Activation Contributes to Severe Acute Respiratory Syndrome Coronavirus Pathogenesis",
  "DOI": "10.1128/mBio.01753-18",
  "Count": 1
}, {
  "Atitle": "Coronavirus Pathogenesis and the Emerging Pathogen Severe Acute Respiratory Syndrome Coronavirus",
  "DOI": "10.1128/MMBR.69.4.635-664.2005",
  "Count": 1
}, {
  "Atitle": "Patient with new strain of coronavirus is treated in intensive care at London hospital",
  "DOI": "10.1136/bmj.e6455",
  "Count": 1
}, {
  "Atitle": "Covid-19 and community mitigation strategies in a pandemic",
  "DOI": "10.1136/bmj.m1066",
  "Count": 1
}, {
  "Atitle": "Covid-19 exposes weaknesses in European response to outbreaks",
  "DOI": "10.1136/bmj.m1075",
  "Count": 1
}, {
  "Atitle": "Covid-19: BMA calls for rapid testing and appropriate protective equipment for doctors",
  "DOI": "10.1136/bmj.m1099",
  "Count": 1
}, {
  "Atitle": "Covid-19: Trump sought to buy vaccine developer exclusively for US, say German officials",
  "DOI": "10.1136/bmj.m1100",
  "Count": 1
}, {
  "Atitle": "Doctors&rsquo; wellbeing: self-care during the covid-19 pandemic",
  "DOI": "10.1136/bmj.m1150",
  "Count": 1
}, {
  "Atitle": "Covid-19: 15?000 deregistered doctors are told, \"Your NHS needs you",
  "DOI": "10.1136/bmj.m1152",
  "Count": 1
}, {
  "Atitle": "Covid-19: cases grow in US as Trump pushes promise of a malaria drug",
  "DOI": "10.1136/bmj.m1155",
  "Count": 1
}, {
  "Atitle": "Covid-19: GPs can stop health checks for over 75s and routine medicine reviews",
  "DOI": "10.1136/bmj.m1157",
  "Count": 1
}, {
  "Atitle": "Covid-19: US testing ramps up as early response draws harsh criticism",
  "DOI": "10.1136/bmj.m1167",
  "Count": 1
}, {
  "Atitle": "Clinical trials suspended in UK to prioritise covid-19 studies and free up staff",
  "DOI": "10.1136/bmj.m1172",
  "Count": 1
}, {
  "Atitle": "Covid-19: doctors are given new guidelines on when to admit patients to critical care",
  "DOI": "10.1136/bmj.m1189",
  "Count": 1
}, {
  "Atitle": "Covid-19: medical students should not work outside their competency, says BMA",
  "DOI": "10.1136/bmj.m1197",
  "Count": 1
}, {
  "Atitle": "China coronavirus: mild but infectious cases may make it hard to control outbreak, report warns",
  "DOI": "10.1136/bmj.m325",
  "Count": 1
}, {
  "Atitle": "China coronavirus: partial border closures into Hong Kong are not enough, say doctors",
  "DOI": "10.1136/bmj.m349",
  "Count": 1
}, {
  "Atitle": "Coronavirus shows how UK must act quickly before being shut out of Europe�s health protection systems",
  "DOI": "10.1136/bmj.m400",
  "Count": 1
}, {
  "Atitle": "China coronavirus should be on �everybody�s agenda,� says vaccine expert",
  "DOI": "10.1136/bmj.m476",
  "Count": 1
}, {
  "Atitle": "Coronavirus: global stocks of protective gear are depleted, with demand at �100 times� normal level, WHO warns",
  "DOI": "10.1136/bmj.m543",
  "Count": 1
}, {
  "Atitle": "Covid-19: GP surgeries close for two weeks after staff test positive",
  "DOI": "10.1136/bmj.m936",
  "Count": 1
}, {
  "Atitle": "Coronavirus-like particles present in simian faeces",
  "DOI": "10.1136/vr.104.8.168",
  "Count": 1
}, {
  "Atitle": "China bans sale of wildlife following coronavirus",
  "DOI": "10.1136/vr.m495",
  "Count": 1
}, {
  "Atitle": "Coronavirus not to blame for recent supply problems",
  "DOI": "10.1136/vr.m594",
  "Count": 1
}, {
  "Atitle": "SARS coronavirus protein nsp1 disrupts localization of Nup93 from the nuclear pore complex",
  "DOI": "10.1139/bcb-2018-0394",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome: Emergence of a Pathogenic Human Coronavirus",
  "DOI": "10.1146/annurev-med-051215-031152",
  "Count": 1
}, {
  "Atitle": "CT Imaging Features of 2019 Novel Coronavirus (2019-nCoV",
  "DOI": "10.1148/radiol.2020200230",
  "Count": 1
}, {
  "Atitle": "Essentials for Radiologists on COVID-19: An Update-Radiology Scientific Expert Panel",
  "DOI": "10.1148/radiol.2020200527",
  "Count": 1
}, {
  "Atitle": "Patients with RT-PCR Confirmed COVID-19 and Normal Chest CT",
  "DOI": "10.1148/radiol.2020200702",
  "Count": 1
}, {
  "Atitle": "Coronavirus-induced demyelination of neural pathways triggers neurogenic bladder overactivity in a mouse model of multiple sclerosis",
  "DOI": "10.1152/ajprenal.00151.2014",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus (MERS-CoV: Infection, Immunological Response, and Vaccine Development",
  "DOI": "10.1155/2019/6491738",
  "Count": 1
}, {
  "Atitle": "Coronavirus Infections in the Central Nervous System and Respiratory Tract Show Distinct Features in Hospitalized Children",
  "DOI": "10.1159/000453066",
  "Count": 1
}, {
  "Atitle": "Applying the Lessons of Influenza to Coronavirus During a Time of Uncertainty",
  "DOI": "10.1161/CIRCULATIONAHA.120.046837",
  "Count": 1
}, {
  "Atitle": "Critical Organizational Issues for Cardiologists in the COVID-19 Outbreak: A Frontline Experience From Milan, Italy",
  "DOI": "10.1161/CIRCULATIONAHA.120.047070",
  "Count": 1
}, {
  "Atitle": "Changing the editorial process at JCI and JCI Insight in response to the COVID-19 pandemic",
  "DOI": "10.1172/JCI138305",
  "Count": 1
}, {
  "Atitle": "Microglia are required for protection against lethal coronavirus encephalitis in mice",
  "DOI": "10.1172/JCI97229",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus and Children",
  "DOI": "10.1177/0009922816678820",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus and Children: What Pediatric Health Care Professionals Need to Know",
  "DOI": "10.1177/0009922816678820",
  "Count": 1
}, {
  "Atitle": "All roads lead to coronavirus",
  "DOI": "10.1177/0141076820911516",
  "Count": 1
}, {
  "Atitle": "COVID-19 Infection: Early Lessons",
  "DOI": "10.1177/0846537120914428",
  "Count": 1
}, {
  "Atitle": "Characteristics and Outcomes of Middle East Respiratory Syndrome Coronavirus Patients Admitted to an Intensive Care Unit in Jeddah, Saudi Arabia",
  "DOI": "10.1177/0885066615579858",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus Patients in the ICU",
  "DOI": "10.1177/0885066615598720",
  "Count": 1
}, {
  "Atitle": "Evaluation of the baculovirus-expressed S glycoprotein of transmissible gastroenteritis virus (TGEV as antigen in a competition ELISA to differentiate porcine respiratory coronavirus from TGEV antibodies in pigs",
  "DOI": "10.1177/104063879901100301",
  "Count": 1
}, {
  "Atitle": "Structure of the SARS-Unique Domain C From the Bat Coronavirus HKU4",
  "DOI": "10.1177/1934578X19849202",
  "Count": 1
}, {
  "Atitle": "Human rhinovirus and coronavirus detection among allogeneic hematopoietic stem cell transplantation recipients",
  "DOI": "10.1182/blood-2009-09-244152",
  "Count": 1
}, {
  "Atitle": "The effects of coronavirus on human nasal ciliated respiratory epithelium",
  "DOI": "10.1183/09031936.01.00093001",
  "Count": 1
}, {
  "Atitle": "Antibody-dependent infection of human macrophages by severe acute respiratory syndrome coronavirus",
  "DOI": "10.1186/1743-422X-11-82",
  "Count": 1
}, {
  "Atitle": "Mutagenesis of the transmembrane domain of the SARS coronavirus spike glycoprotein: refinement of the requirements for SARS coronavirus cell entry",
  "DOI": "10.1186/1743-422x-6-230",
  "Count": 1
}, {
  "Atitle": "Spatial patterns of Bovine Corona Virus and Bovine Respiratory Syncytial Virus in the Swedish beef cattle population",
  "DOI": "10.1186/1751-0147-52-33",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-Cov screening of exposed healthcare workers in a tertiary care hospital in Saudi Arabia",
  "DOI": "10.1186/2047-2994-4-S1-O57",
  "Count": 1
}, {
  "Atitle": "Impact of Middle East Respiratory Syndrome coronavirus (MERS-CoV on pregnancy and perinatal outcome",
  "DOI": "10.1186/s12879-016-1437-y",
  "Count": 1
}, {
  "Atitle": "Sensitivity and specificity of a real-time reverse transcriptase polymerase chain reaction detecting feline coronavirus mutations in effusion and serum/plasma of cats to diagnose feline infectious peritonitis",
  "DOI": "10.1186/s12917-017-1147-8",
  "Count": 1
}, {
  "Atitle": "Estimation of basic reproduction number of the Middle East respiratory syndrome coronavirus (MERS-CoV during the outbreak in South Korea, 2015",
  "DOI": "10.1186/s12938-017-0370-7",
  "Count": 1
}, {
  "Atitle": "Molecular epidemiology and evolutionary histories of human coronavirus OC43 and HKU1 among patients with upper respiratory tract infections in Kuala Lumpur, Malaysia",
  "DOI": "10.1186/s12985-016-0488-4",
  "Count": 1
}, {
  "Atitle": "Low prevalence of equine coronavirus in foals in the largest thoroughbred horse breeding region of Japan, 2012-2014",
  "DOI": "10.1186/s13028-015-0149-4",
  "Count": 1
}, {
  "Atitle": "Critically ill patients with Middle East respiratory syndrome coronavirus infection",
  "DOI": "10.1186/s13054-016-1234-4",
  "Count": 1
}, {
  "Atitle": "The critical care response to a hospital outbreak of Middle East respiratory syndrome coronavirus (MERS-CoV infection: an observational study",
  "DOI": "10.1186/s13613-016-0203-z",
  "Count": 1
}, {
  "Atitle": "Lack of transmission among healthcare workers in contact with a case of Middle East respiratory syndrome coronavirus infection in Thailand",
  "DOI": "10.1186/s13756-016-0120-9",
  "Count": 1
}, {
  "Atitle": "Reproduction of East-African bats may guide risk mitigation for coronavirus spillover",
  "DOI": "10.1186/s42522-019-0008-8",
  "Count": 1
}, {
  "Atitle": "The Molecular Biology of SARS Coronavirus",
  "DOI": "10.1196/annals.1408.002",
  "Count": 1
}, {
  "Atitle": "New Year and coronavirus",
  "DOI": "10.12965/jer.2040082.041",
  "Count": 1
}, {
  "Atitle": "Porcine deltacoronavirus induces mitochondrial apoptosis in ST cells",
  "DOI": "10.13345/j.cjb.180512",
  "Count": 1
}, {
  "Atitle": "Pathology of experimental SARS coronavirus infection in cats and ferrets",
  "DOI": "10.1354/vp.45-4-551",
  "Count": 1
}, {
  "Atitle": "State of Knowledge and Data Gaps of Middle East Respiratory Syndrome Coronavirus (MERS-CoV in Humans",
  "DOI": "10.1371/currents.outbreaks.0bf719e352e7478f8ad85fa30127ddb8",
  "Count": 1
}, {
  "Atitle": "Dynamic innate immune responses of human bronchial epithelial cells to severe acute respiratory syndrome-associated coronavirus infection",
  "DOI": "10.1371/journal.pone.0008729",
  "Count": 1
}, {
  "Atitle": "Dynamic Innate Immune Responses of Human Bronchial Epithelial Cells to Severe Acute Respiratory Syndrome-Associated Coronavirus Infection (Epithelial Response to SARS",
  "DOI": "10.1371/journal.pone.0008729",
  "Count": 1
}, {
  "Atitle": "Alphacoronaviruses in New World bats: prevalence, persistence, phylogeny, and potential for interaction with humans",
  "DOI": "10.1371/journal.pone.0019156",
  "Count": 1
}, {
  "Atitle": "Coronavirus Papain-like Proteases Negatively Regulate Antiviral Innate Immune Response through Disruption of STING-Mediated Signaling",
  "DOI": "10.1371/journal.pone.0030802",
  "Count": 1
}, {
  "Atitle": "Reverse Genetics of SARS-Related Coronavirus Using Vaccinia Virus-Based Recombination (SARS-Related Coronavirus Reverse Genetics",
  "DOI": "10.1371/journal.pone.0032857",
  "Count": 1
}, {
  "Atitle": "The Role of Viral Population Diversity in Adaptation of Bovine Coronavirus to New Host Environments",
  "DOI": "10.1371/journal.pone.0052752",
  "Count": 1
}, {
  "Atitle": "Differential sensitivity of bat cells to infection by enveloped RNA viruses: coronaviruses, paramyxoviruses, filoviruses, and influenza viruses",
  "DOI": "10.1371/journal.pone.0072942",
  "Count": 1
}, {
  "Atitle": "Role of the Spike Glycoprotein of Human Middle East Respiratory Syndrome Coronavirus (MERS-CoV in Virus Entry and Syncytia Formation",
  "DOI": "10.1371/journal.pone.0076469",
  "Count": 1
}, {
  "Atitle": "A Leaderless Genome Identified during Persistent Bovine Coronavirus Infection Is Associated with Attenuation of Gene Expression",
  "DOI": "10.1371/journal.pone.0082176",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus and astrovirus in Delaware Bay shorebirds",
  "DOI": "10.1371/journal.pone.0093395",
  "Count": 1
}, {
  "Atitle": "Alterations in nerve-evoked bladder contractions in a coronavirus-induced mouse model of multiple sclerosis",
  "DOI": "10.1371/journal.pone.0109314",
  "Count": 1
}, {
  "Atitle": "The Nucleocapsid Protein of Human Coronavirus NL63 (HCoV-NL63 N Protein",
  "DOI": "10.1371/journal.pone.0117833",
  "Count": 1
}, {
  "Atitle": "HTCC: Broad Range Inhibitor of Coronavirus Entry",
  "DOI": "10.1371/journal.pone.0156552",
  "Count": 1
}, {
  "Atitle": "A Comparative Study of Clinical Presentation and Risk Factors for Adverse Outcome in Patients Hospitalised with Acute Respiratory Disease Due to MERS Coronavirus or Other Causes",
  "DOI": "10.1371/journal.pone.0165978",
  "Count": 1
}, {
  "Atitle": "Environmental persistence of porcine coronaviruses in feed and feed ingredients",
  "DOI": "10.1371/journal.pone.0178094",
  "Count": 1
}, {
  "Atitle": "Epidemiology characteristics of human coronaviruses in patients with respiratory infection symptoms and phylogenetic analysis of HCoV-OC43 during 2010-2015 in Guangzhou",
  "DOI": "10.1371/journal.pone.0191789",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus-like particles targeting cells lining the respiratory tract",
  "DOI": "10.1371/journal.pone.0203489",
  "Count": 1
}, {
  "Atitle": "Increasing the translation of mouse models of MERS coronavirus pathogenesis through kinetic hematological analysis",
  "DOI": "10.1371/journal.pone.0220126",
  "Count": 1
}, {
  "Atitle": "A Mouse-Adapted SARS-Coronavirus Causes Disease and Mortality in BALB/c Mice (Mouse-Adapted SARS-CoV Lethal in BALB/c Mice",
  "DOI": "10.1371/journal.ppat.0030005",
  "Count": 1
}, {
  "Atitle": "Coronavirus Non-Structural Protein 1 Is a Major Pathogenicity Factor: Implications for the Rational Design of Coronavirus Vaccines (Generation of Attenuated Coronavirus Vaccines",
  "DOI": "10.1371/journal.ppat.0030109",
  "Count": 1
}, {
  "Atitle": "Crystal Structure and Functional Analysis of the SARS-Coronavirus RNA Cap 2?-O-Methyltransferase nsp10/nsp16 Complex",
  "DOI": "10.1371/journal.ppat.1002059",
  "Count": 1
}, {
  "Atitle": "Coronavirus Gene 7 Counteracts Host Defenses and Modulates Virus Virulence (Role of Gene 7 on Host Antiviral Response",
  "DOI": "10.1371/journal.ppat.1002090",
  "Count": 1
}, {
  "Atitle": "Biochemical and Structural Insights into the Mechanisms of SARS Coronavirus RNA Ribose 2?-O-Methylation by nsp16/nsp10 Protein Complex",
  "DOI": "10.1371/journal.ppat.1002294",
  "Count": 1
}, {
  "Atitle": "Coronaviruses Lacking Exoribonuclease Activity Are Susceptible to Lethal Mutagenesis: Evidence for Proofreading and Potential Therapeutics (Lethal Mutagenesis of Coronaviruses",
  "DOI": "10.1371/journal.ppat.1003565",
  "Count": 1
}, {
  "Atitle": "Reversal of the Progression of Fatal Coronavirus Infection in Cats by a Broad-Spectrum Coronavirus Protease Inhibitor",
  "DOI": "10.1371/journal.ppat.1005531",
  "Count": 1
}, {
  "Atitle": "Discovery of a rich gene pool of bat SARS-related coronaviruses provides new insights into the origin of SARS coronavirus",
  "DOI": "10.1371/journal.ppat.1006698",
  "Count": 1
}, {
  "Atitle": "The papain-like protease determines a virulence trait that varies among members of the SARS-coronavirus species",
  "DOI": "10.1371/journal.ppat.1007296",
  "Count": 1
}, {
  "Atitle": "Genomic Sequencing of a SARS Coronavirus Isolate That Predated the Metropole Hotel Case Cluster in Hong Kong",
  "DOI": "10.1373/clinchem.2003.025536",
  "Count": 1
}, {
  "Atitle": "Comprehensive antibody epitope mapping of the nucleocapsid protein of severe acute respiratory syndrome (SARS coronavirus: insight into the humoral immunity of SARS.(Molecular Diagnostic and Genetics",
  "DOI": "10.1373/clinchem.2005.051045",
  "Count": 1
}, {
  "Atitle": "Recombinant adenoviral vaccine encoding the spike 1 subunit of the Middle East Respiratory Syndrome Coronavirus elicits strong humoral and cellular immune responses in mice",
  "DOI": "10.14202/vetworld.2019.1554-1562",
  "Count": 1
}, {
  "Atitle": "Das SARS-assoziierte coronavirus - Die erste pandemie des 21. Jahrhunderts",
  "DOI": "10.1515/LabMed.2004.010",
  "Count": 1
}, {
  "Atitle": "Das SARS-assoziierte Coronavirus � Die erste Pandemie des 21. Jahrhunderts / The SARS-associated coronavirus � The first pandemic of the 21st century",
  "DOI": "10.1515/LabMed.2004.010",
  "Count": 1
}, {
  "Atitle": "Anti-SARS coronavirus agents: a patent review (2008 - present",
  "DOI": "10.1517/13543776.2013.823159",
  "Count": 1
}, {
  "Atitle": "The spread of the COVID ?19 coronavirus",
  "DOI": "10.15252/embr.202050334",
  "Count": 1
}, {
  "Atitle": "Spontaneous intracranial hemorrhage in a patient with Middle East respiratory syndrome corona virus",
  "DOI": "10.15537/smj.2017.2.16255",
  "Count": 1
}, {
  "Atitle": "Public Health Responses to COVID-19 Outbreaks on Cruise Ships - Worldwide, February-March 2020",
  "DOI": "10.15585/mmwr.mm6912e3",
  "Count": 1
}, {
  "Atitle": "The value of mitigating epidemic peaks of COVID-19 for more effective public health responses",
  "DOI": "10.1590/0037-8682-0135-2020",
  "Count": 1
}, {
  "Atitle": "Seroepidemiological study of feline coronavirus (FCoV infection in domiciled cats from Botucatu, S�o Paulo, Brazil",
  "DOI": "10.1590/1678-5150-pvb-5706",
  "Count": 1
}, {
  "Atitle": "Mechanical Transmission of Turkey Coronavirus by Domestic Houseflies (Musca domestica Linnaeaus",
  "DOI": "10.1637/0005-2086(2003)047[0149:MTOTCB]2.0.CO;2",
  "Count": 1
}, {
  "Atitle": "The nucleocapsid proteins of mouse hepatitis virus and severe acute respiratory syndrome coronavirus share the same IFN-&#x3B2; antagonizing mechanism: attenuation of PACT-mediated RIG-I/ MDA5 activation",
  "DOI": "10.18632/oncotarget.17912",
  "Count": 1
}, {
  "Atitle": "The nucleocapsid proteins of mouse hepatitis virus and severe acute respiratory syndrome coronavirus share the same IFN-? antagonizing mechanism: attenuation of PACT-mediated RIG-I/MDA5 activation",
  "DOI": "10.18632/oncotarget.17912",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-CoV: A review",
  "DOI": "10.18683/germs.2019.1155",
  "Count": 1
}, {
  "Atitle": "The 2019 Novel Coronavirus (2019-nCoV: Novel Virus, Old Challenges",
  "DOI": "10.20344/amp.13547",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome: making the case for surveillance of transboundary coronaviruses in the Middle East",
  "DOI": "10.20506/rst.38.1.2941",
  "Count": 1
}, {
  "Atitle": "The role of CT for Covid-19 patient's management remains poorly defined",
  "DOI": "10.21037/atm.2020.02.71",
  "Count": 1
}, {
  "Atitle": "Current understanding of middle east respiratory syndrome coronavirus infection in human and animal models",
  "DOI": "10.21037/jtd.2018.03.80",
  "Count": 1
}, {
  "Atitle": "Covid-19: la nueva enfermedad causada por un coronavirus",
  "DOI": "10.21149/11276",
  "Count": 1
}, {
  "Atitle": "Design of an epitope-based peptide vaccine against spike protein of human coronavirus: an in silico approach",
  "DOI": "10.2147/DDDT.S67861",
  "Count": 1
}, {
  "Atitle": "IFN-?-1b: potent antiviral activity against SARS coronavirus",
  "DOI": "10.2165/00128413-200313980-00044",
  "Count": 1
}, {
  "Atitle": "Effective Chemicals against Novel Coronavirus (COVID-19 in China",
  "DOI": "10.2174/1568026620999200305145032",
  "Count": 1
}, {
  "Atitle": "Drug Targets in Severe Acute Respiratory Syndrome (SARS Virus and other Coronavirus Infections",
  "DOI": "10.2174/187152609787847659",
  "Count": 1
}, {
  "Atitle": "Drug Targets for Rational Design against Emerging Coronaviruses",
  "DOI": "10.2174/18715265113139990024",
  "Count": 1
}, {
  "Atitle": "COVID-19, Urologists and Hospitals",
  "DOI": "10.22037/uj.v0i0.6064",
  "Count": 1
}, {
  "Atitle": "Clinical Features and Chest CT Manifestations of Coronavirus Disease 2019 (COVID-19 in a Single-Center Study in Shanghai, China",
  "DOI": "10.2214/AJR.20.22959",
  "Count": 1
}, {
  "Atitle": "Early Clinical and CT Manifestations of Coronavirus Disease 2019 (COVID-19 Pneumonia",
  "DOI": "10.2214/ajr.20.22961",
  "Count": 1
}, {
  "Atitle": "Host resilience to emerging coronaviruses",
  "DOI": "10.2217/fvl-2016-0060",
  "Count": 1
}, {
  "Atitle": "Post-translational modifications of coronavirus proteins: roles and function",
  "DOI": "10.2217/fvl-2018-0008",
  "Count": 1
}, {
  "Atitle": "Estudio de adenovirus, gripe y coronavirus en murcielagos ibericos",
  "DOI": "10.22507/rli.v11n2a8",
  "Count": 1
}, {
  "Atitle": "Estudio retrospectivo del nuevo coronavirus MERS-CoV 2012-2013",
  "DOI": "10.22507/rli.v11n2a8",
  "Count": 1
}, {
  "Atitle": "SARS corona virus: A new dilemma",
  "DOI": "10.2298/MPNS0502043K",
  "Count": 1
}, {
  "Atitle": "Effects of Timely Control Intervention on the Spread of Middle East Respiratory Syndrome Coronavirus Infection",
  "DOI": "10.24171/j.phrp.2017.8.6.03",
  "Count": 1
}, {
  "Atitle": "Data sharing for novel coronavirus (COVID-19",
  "DOI": "10.2471/BLT.20.251561",
  "Count": 1
}, {
  "Atitle": "Coronaviruses in Avian Species - Review with Focus on Epidemiology and Diagnosis in Wild Birds",
  "DOI": "10.2478/jvetres-2018-0035",
  "Count": 1
}, {
  "Atitle": "Novel Coronavirus 2019 (Sars-CoV2: a global emergency that needs new approaches?",
  "DOI": "10.26355/eurrev_202002_20396",
  "Count": 1
}, {
  "Atitle": "Molecular docking study of novel COVID-19 protease with low risk terpenoides compounds of plants",
  "DOI": "10.26434/chemrxiv.11935722.v1",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus infections in Jordan, April 2012: Epidemiological findings from a retrospective investigation",
  "DOI": "10.26719/2013.19.supp1.S12",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus: the challenge of communicating about a virus which one knows little about/Nouveau coronavirus: difficultes de communication sur un virus encore mal connu",
  "DOI": "10.26719/2013.19.supp1.S26",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus: the challenge of communicating about a virus which one knows little about/Nouveau coronavirus: difficultes de communication sur un virus encore mal connu.(Report",
  "DOI": "10.26719/2013.19.supp1.S26",
  "Count": 1
}, {
  "Atitle": "Enhanced surveillance and investigation of coronavirus: what is required?",
  "DOI": "10.26719/2013.19.supp1.S55",
  "Count": 1
}, {
  "Atitle": "Enhanced surveillance and investigation of coronavirus: what is required?/Surveillance et recherche renforcees pour le coronavirus: quels sont les besoins?",
  "DOI": "10.26719/2013.19.supp1.S55",
  "Count": 1
}, {
  "Atitle": "Enhanced surveillance and investigation of coronavirus: what is required?/Surveillance et recherche renforc�es pour le coronavirus : quels sont les besoins ?",
  "DOI": "10.26719/2013.19.supp1.S55",
  "Count": 1
}, {
  "Atitle": "Cross-sectional surveillance of Middle East respiratory syndrome coronavirus (MERS-CoV in dromedary camels and other mammals in Egypt, August 2015 to January 2016",
  "DOI": "10.2807/1560-7917.ES.2017.22.11.30487",
  "Count": 1
}, {
  "Atitle": "Epidemiological research priorities for public health control of the ongoing global novel coronavirus (2019-nCoV outbreak",
  "DOI": "10.2807/1560-7917.ES.2020.25.6.2000110",
  "Count": 1
}, {
  "Atitle": "Updated rapid risk assessment from ECDC on the outbreak of COVID-19: increased transmission globally; PMC7068166",
  "DOI": "10.2807/1560-7917.ES.2020.25.9.2003051",
  "Count": 1
}, {
  "Atitle": "Detection of a novel human coronavirus by real-time reverse-transcription polymerase chain reaction",
  "DOI": "10.2807/ese.17.39.20285-en",
  "Count": 1
}, {
  "Atitle": "Digital PCR Platform as a Tool to Determine the Canine Coronavirus (CCoV Genome in Clinical Samples",
  "DOI": "10.29011/2637-9988/100042",
  "Count": 1
}, {
  "Atitle": "Duty to Plan: Health Care, Crisis Standards of Care, and Novel Coronavirus SARS-CoV-2",
  "DOI": "10.31478/202003b",
  "Count": 1
}, {
  "Atitle": "Cancer Care Delivery Challenges Amidst Coronavirus Disease - 19 (COVID-19 Outbreak: Specific Precautions for Cancer Patients and Cancer Care Providers to Prevent Spread",
  "DOI": "10.31557/APJCP.2020.21.3.569",
  "Count": 1
}, {
  "Atitle": "Genetic variation of SARS coronavirus in Beijing hospital",
  "DOI": "10.3201/eid1005.030875",
  "Count": 1
}, {
  "Atitle": "SARS coronavirus detection.(Dispatches",
  "DOI": "10.3201/eid1007.030678",
  "Count": 1
}, {
  "Atitle": "SARS�associated Coronavirus Replication in Cell Lines",
  "DOI": "10.3201/eid1201.050496",
  "Count": 1
}, {
  "Atitle": "Coronavirus HKU1 in children, Brazil, 1995",
  "DOI": "10.3201/eid1706.101381",
  "Count": 1
}, {
  "Atitle": "Novel SARS-like betacoronaviruses in bats, China, 2011",
  "DOI": "10.3201/eid1906.121648",
  "Count": 1
}, {
  "Atitle": "Novel bat coronaviruses, Brazil and Mexico",
  "DOI": "10.3201/eid1910.130525",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus in bats, Saudi Arabia",
  "DOI": "10.3201/eid1911.131172",
  "Count": 1
}, {
  "Atitle": "Novel avian coronavirus and fulminating disease in guinea fowl, France",
  "DOI": "10.3201/eid2001.130774",
  "Count": 1
}, {
  "Atitle": "Infection, Replication, and Transmission of Middle East Respiratory Syndrome Coronavirus in Alpacas",
  "DOI": "10.3201/eid2206.160192",
  "Count": 1
}, {
  "Atitle": "Development of Medical Countermeasures to Middle East Respiratory Syndrome Coronavirus",
  "DOI": "10.3201/eid2207.160022",
  "Count": 1
}, {
  "Atitle": "New Chimeric Porcine Coronavirus in Swine Feces, Germany, 2012",
  "DOI": "10.3201/eid2207.160179",
  "Count": 1
}, {
  "Atitle": "Middle East Respiratory Syndrome Coronavirus Infection Dynamics and Antibody Responses among Clinically Diverse Patients, Saudi Arabia",
  "DOI": "10.3201/eid2504.181595",
  "Count": 1
}, {
  "Atitle": "COVID-19, Australia: Epidemiology Report 2 (Reporting week ending 19:00 AEDT 8 February 2020",
  "DOI": "10.33321/cdi.2020.44.14",
  "Count": 1
}, {
  "Atitle": "Isolation of Middle East Respiratory Syndrome Coronavirus from a Patient of the 2015 Korean Outbreak",
  "DOI": "10.3346/jkms.2016.31.2.315",
  "Count": 1
}, {
  "Atitle": "The Outbreak Cases with the Novel Coronavirus Suggest Upgraded Quarantine and Isolation in Korea",
  "DOI": "10.3346/jkms.2020.35.e62",
  "Count": 1
}, {
  "Atitle": "Pneumonia Associated with 2019 Novel Coronavirus: Can Computed Tomographic Findings Help Predict the Prognosis of the Disease?",
  "DOI": "10.3348/kjr.2020.0096",
  "Count": 1
}, {
  "Atitle": "2019 Novel Coronavirus (COVID-19 Pneumonia with Hemoptysis as the Initial Symptom: CT and Clinical Features",
  "DOI": "10.3348/kjr.2020.0181",
  "Count": 1
}, {
  "Atitle": "Development of Monoclonal Antibody and Diagnostic Test for Middle East Respiratory Syndrome Coronavirus Using Cell-Free Synthesized Nucleocapsid Antigen",
  "DOI": "10.3389/fmicb.2016.00509",
  "Count": 1
}, {
  "Atitle": "Establishment and Application of a Universal Coronavirus Screening Method Using MALDI-TOF Mass Spectrometry",
  "DOI": "10.3389/fmicb.2017.01510",
  "Count": 1
}, {
  "Atitle": "Overview of Current Therapeutics and Novel Candidates Against Influenza, Respiratory Syncytial Virus, and Middle East Respiratory Syndrome Coronavirus Infections",
  "DOI": "10.3389/fmicb.2019.01327",
  "Count": 1
}, {
  "Atitle": "Recent Advances in the Vaccine Development Against Middle East Respiratory Syndrome-Coronavirus",
  "DOI": "10.3389/fmicb.2019.01781",
  "Count": 1
}, {
  "Atitle": "A Mini Review of the Zoonotic Threat Potential of Influenza Viruses, Coronaviruses, Adenoviruses, and Enteroviruses",
  "DOI": "10.3389/fpubh.2018.00104",
  "Count": 1
}, {
  "Atitle": "Outbreak of Novel Coronavirus (SARS-Cov-2: First Evidences From International Scientific Literature and Pending Questions",
  "DOI": "10.3390/healthcare8010051",
  "Count": 1
}, {
  "Atitle": "Spatiotemporal Clustering of Middle East Respiratory Syndrome Coronavirus (MERS-CoV Incidence in Saudi Arabia, 2012�2019",
  "DOI": "10.3390/ijerph16142520",
  "Count": 1
}, {
  "Atitle": "Prediction of Epidemic Spread of the 2019 Novel Coronavirus Driven by Spring Festival Transportation in China: A Population-Based Study",
  "DOI": "10.3390/ijerph17051679",
  "Count": 1
}, {
  "Atitle": "Backcalculating the Incidence of Infection with COVID-19 on the Diamond Princess",
  "DOI": "10.3390/jcm9030657",
  "Count": 1
}, {
  "Atitle": "Entry of Scotophilus Bat Coronavirus-512 and Severe Acute Respiratory Syndrome Coronavirus in Human and Multiple Animal Cells",
  "DOI": "10.3390/pathogens8040259",
  "Count": 1
}, {
  "Atitle": "MERS-CoV: Understanding the Latest Human Coronavirus Threat",
  "DOI": "10.3390/v10020093",
  "Count": 1
}, {
  "Atitle": "Characterization of the Lipidomic Profile of Human Coronavirus-Infected Cells: Implications for Lipid Metabolism Remodeling upon Coronavirus Replication",
  "DOI": "10.3390/v11010073",
  "Count": 1
}, {
  "Atitle": "Global Epidemiology of Bat Coronaviruses",
  "DOI": "10.3390/v11020174",
  "Count": 1
}, {
  "Atitle": "Epidemiology of Deltacoronaviruses (?-CoV and Gammacoronaviruses (?-CoV in Wild Birds in the United States",
  "DOI": "10.3390/v11100897",
  "Count": 1
}, {
  "Atitle": "Viral Metagenomics Revealed Sendai Virus and Coronavirus Infection of Malayan Pangolins (",
  "DOI": "10.3390/v11110979",
  "Count": 1
}, {
  "Atitle": "Viral Metagenomics Revealed Sendai Virus and Coronavirus Infection of Malayan Pangolins ( Manis javanica",
  "DOI": "10.3390/v11110979",
  "Count": 1
}, {
  "Atitle": "Identification of a Novel Betacoronavirus ( Merbecovirus  in Amur Hedgehogs from China",
  "DOI": "10.3390/v11110980",
  "Count": 1
}, {
  "Atitle": "A Tale of Two Viruses: The Distinct Spike Glycoproteins of Feline Coronaviruses",
  "DOI": "10.3390/v12010083",
  "Count": 1
}, {
  "Atitle": "Ready, Set, Fuse! The Coronavirus Spike Protein and Acquisition of Fusion Competence",
  "DOI": "10.3390/v4040557",
  "Count": 1
}, {
  "Atitle": "Protective role of Toll-like Receptor 3-induced type I interferon in murine coronavirus infection of macrophages",
  "DOI": "10.3390/v4050901",
  "Count": 1
}, {
  "Atitle": "The Role of Severe Acute Respiratory Syndrome (SARS-Coronavirus Accessory Proteins in Virus Pathogenesis",
  "DOI": "10.3390/v4112902",
  "Count": 1
}, {
  "Atitle": "Biogenesis and Dynamics of the Coronavirus Replicative Structures",
  "DOI": "10.3390/v4113245",
  "Count": 1
}, {
  "Atitle": "Suppression of Coronavirus Replication by Cyclophilin Inhibitors",
  "DOI": "10.3390/v5051250",
  "Count": 1
}, {
  "Atitle": "Treatment strategies for colorectal cancer patients in tumor hospitals under the background of corona virus disease 2019]",
  "DOI": "10.3760/cma.j.cn.441530-20200217-00058",
  "Count": 1
}, {
  "Atitle": "Ten hot issues on diagnosis and treatment of breast cancer under the outbreak of novel coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.cn112137-20200207-00218",
  "Count": 1
}, {
  "Atitle": "Practice and Reflection on the Battle against COVID-19 by Guangdong Medical Aid Team in the city of Honghu",
  "DOI": "10.3760/cma.j.cn112137-20200228-00496",
  "Count": 1
}, {
  "Atitle": "Drug interaction monitoring of lopinavir / ritonavir in COVID-19 patients with cancer]",
  "DOI": "10.3760/cma.j.cn112138-20200219-00097",
  "Count": 1
}, {
  "Atitle": "Comparison of the clinical characteristics between RNA positive and negative patients clinically diagnosed with 2019 novel coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.cn112147-20200214-00095",
  "Count": 1
}, {
  "Atitle": "The keypoints in treatment of the critical novel coronavirus pneumonia patient]",
  "DOI": "10.3760/cma.j.cn112147-20200222-00151",
  "Count": 1
}, {
  "Atitle": "Thoughts and practice on the treatment of severe and critical new coronavirus pneumonia]",
  "DOI": "10.3760/cma.j.cn112147-20200312-00320",
  "Count": 1
}, {
  "Atitle": "2019 novel coronavirus, angiotensin converting enzyme 2 and cardiovascular drugs]",
  "DOI": "10.3760/cma.j.cn112148-20200308-00171",
  "Count": 1
}, {
  "Atitle": "Epidemic trend of corona virus disease 2019 (COVID-19 in mainland China]",
  "DOI": "10.3760/cma.j.cn112150-20200222-00163",
  "Count": 1
}, {
  "Atitle": "Pregnant women with new coronavirus infection: a clinical characteristics and placental pathological analysis of three cases]",
  "DOI": "10.3760/cma.j.cn112151-20200225-00138",
  "Count": 1
}, {
  "Atitle": "How to understand the histopathology of SARS and COVID-19 associated with acute respiratory distress syndrome",
  "DOI": "10.3760/cma.j.cn112151-20200309-00185",
  "Count": 1
}, {
  "Atitle": "Epidemiological investigation of a family clustering of COVID-19]",
  "DOI": "10.3760/cma.j.cn112338-20200223-00152",
  "Count": 1
}, {
  "Atitle": "Analysis on cluster cases of COVID-19 in Tianjin]",
  "DOI": "10.3760/cma.j.cn112338-20200225-00165",
  "Count": 1
}, {
  "Atitle": "Biological characters analysis of COVID-19 patient accompanied with aplastic anemia]",
  "DOI": "10.3760/cma.j.issn.0253-2727.2020.0003",
  "Count": 1
}, {
  "Atitle": "An update on the epidemiological characteristics of novel coronavirus pneumonia?COVID-19?]",
  "DOI": "10.3760/cma.j.issn.0254-6450.2020.02.002",
  "Count": 1
}, {
  "Atitle": "Facing the pandemic of 2019 novel coronavirus infections: the pediatric perspectives]",
  "DOI": "10.3760/cma.j.issn.0578-1310.2020.0001",
  "Count": 1
}, {
  "Atitle": "Analysis of CT features of 15 Children with 2019 novel coronavirus infection]",
  "DOI": "10.3760/cma.j.issn.0578-1310.2020.0007",
  "Count": 1
}, {
  "Atitle": "Noninvasive Respiratory Support for Novel Coronavirus Pneumonia: Enough is Enough]",
  "DOI": "10.3760/cma.j.issn.0578-1426.2020.0006",
  "Count": 1
}, {
  "Atitle": "Knowledge, Attitude and Practice (KAP Study about Middle East Respiratory Syndrome Coronavirus (MERS-CoV among Population in Saudi Arabia",
  "DOI": "10.3823/2524",
  "Count": 1
}, {
  "Atitle": "Challenges of convalescent plasma infusion therapy in Middle East respiratory coronavirus infection: a single centre experience",
  "DOI": "10.3851/IMP3243",
  "Count": 1
}, {
  "Atitle": "Coronavirus respiratory illness in Saudi Arabia",
  "DOI": "10.3855/jidc.3084",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome coronavirus (MERS-CoV outbreak perceptions of risk and stress evaluation in nurses",
  "DOI": "10.3855/jidc.6925",
  "Count": 1
}, {
  "Atitle": "Effect of delay in diagnosis on transmission of COVID-19",
  "DOI": "10.3934/mbe.2020149",
  "Count": 1
}, {
  "Atitle": "The Korean Middle East Respiratory Syndrome Coronavirus Outbreak and Our Responsibility to the Global Scientific Community",
  "DOI": "10.3947/ic.2016.48.2.145",
  "Count": 1
}, {
  "Atitle": "Structural Factors of the Middle East Respiratory Syndrome Coronavirus Outbreak as a Public Health Crisis in Korea and Future Response Strategies",
  "DOI": "10.3961/jpmph.15.066",
  "Count": 1
}, {
  "Atitle": "From SARS coronavirus to novel animal and human coronaviruses",
  "DOI": "10.3978/j.issn.2072-1439.2013.06.02",
  "Count": 1
}, {
  "Atitle": "Effect of Fc Fusion on Folding and Immunogenicity of Middle East Respiratory Syndrome Coronavirus Spike Protein",
  "DOI": "10.4014/jmb.1903.03043",
  "Count": 1
}, {
  "Atitle": "Middle East respiratory syndrome-coronavirus infection into established hDDP4-transgenic mice accelerates lung damage via activation of the pro-inflammatory response and pulmonary fibrosis",
  "DOI": "10.4014/jmb.1910.10055",
  "Count": 1
}, {
  "Atitle": "Covid-19: The right amount of wolf",
  "DOI": "10.4045/tidsskr.20.0190",
  "Count": 1
}, {
  "Atitle": "Highly activated cytotoxic CD8 T cells express protective IL-10 at the peak of coronavirus-induced encephalitis",
  "DOI": "10.4049/jimmunol.1003292",
  "Count": 1
}, {
  "Atitle": "SARS-coronavirus open reading frame-9b suppresses innate immunity by targeting mitochondria and the MAVS/TRAF3/TRAF6 signalosome",
  "DOI": "10.4049/jimmunol.1303196",
  "Count": 1
}, {
  "Atitle": "Mechanisms of host defense following severe acute respiratory syndrome-coronavirus (SARS-CoV pulmonary infection of mice",
  "DOI": "10.4049/jimmunol.173.6.4030",
  "Count": 1
}, {
  "Atitle": "Receptor-binding domain of severe acute respiratory syndrome coronavirus spike protein contains multiple conformation-dependent epitopes that induce highly potent neutralizing antibodies",
  "DOI": "10.4049/jimmunol.174.8.4908",
  "Count": 1
}, {
  "Atitle": "Prior immunization with severe acute respiratory syndrome (SARS-associated coronavirus (SARS-CoV nucleocapsid protein causes severe pneumonia in mice infected with SARS-CoV",
  "DOI": "10.4049/jimmunol.181.9.6337",
  "Count": 1
}, {
  "Atitle": "Coronavirus�associated enteritis in a quail farm",
  "DOI": "10.4081/ijas.2007.326",
  "Count": 1
}, {
  "Atitle": "Combating the spread of Middle East respiratory syndrome coronavirus: Indian perspective",
  "DOI": "10.4103/0255-0857.176851",
  "Count": 1
}, {
  "Atitle": "Winning together: Novel coronavirus (COVID-19 infographic",
  "DOI": "10.4103/0974-2700.281047",
  "Count": 1
}, {
  "Atitle": "Is secondary hemophagocytic lymphohistiocytosis behind the high fatality rate in Middle East respiratory syndrome corona virus&#x003F;",
  "DOI": "10.4103/1658-5127.155168",
  "Count": 1
}, {
  "Atitle": "Patient characteristics infected with Middle East respiratory syndrome coronavirus infection in a tertiary hospital",
  "DOI": "10.4103/1817-1737.180027",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus (2019-nCoV update: What we know and what is unknown",
  "DOI": "10.4103/1995-7645.277795",
  "Count": 1
}, {
  "Atitle": "Dose prediction of lopinavir/ritonavir for 2019-novel coronavirus (2019-nCoV infection based on mathematic modeling",
  "DOI": "10.4103/1995-7645.277815",
  "Count": 1
}, {
  "Atitle": "Characteristics and outcome of viral pneumonia caused by influenza and Middle East respiratory syndrome-coronavirus infections: A 4-year experience from a tertiary care center",
  "DOI": "10.4103/atm.ATM_179_18",
  "Count": 1
}, {
  "Atitle": "Drug for corona virus: A systematic review",
  "DOI": "10.4103/ijp.IJP_115_20",
  "Count": 1
}, {
  "Atitle": "Future treatment strategies for novel Middle East respiratory syndrome coronavirus infection",
  "DOI": "10.4155/fmc.13.183",
  "Count": 1
}, {
  "Atitle": "Sero-surveillance of transmissible gastroenteritis virus (TGEV and porcine respiratory coronavirus (PRCV in South Korea",
  "DOI": "10.4167/jbv.2011.41.3.189",
  "Count": 1
}, {
  "Atitle": "D, L-lysine acetylsalicylate + glycine Impairs Coronavirus Replication",
  "DOI": "10.4172/jaa.1000151",
  "Count": 1
}, {
  "Atitle": "Asymptomatic Middle East Respiratory Syndrome coronavirus infection using a serologic survey in Korea",
  "DOI": "10.4178/epih.e2018014",
  "Count": 1
}, {
  "Atitle": "Surveillance operation for the 141st confirmed case of Middle East Respiratory Syndrome coronavirus in response to the patient�s prior travel to Jeju Island",
  "DOI": "10.4178/epih/e2015035",
  "Count": 1
}, {
  "Atitle": "A meta-analysis to evaluate the effectiveness of real-time PCR for diagnosing novel coronavirus infections",
  "DOI": "10.4238/2015.December.1.15",
  "Count": 1
}, {
  "Atitle": "Prevenci�n y control de la infecci�n ante sujetos sospechosos de infecci�n por el nuevo coronavirus MERS-CoV en Unidades militares",
  "DOI": "10.4321/S1887-85712015000300007",
  "Count": 1
}, {
  "Atitle": "Immediate Health Surveillance Response to COVID-19 Epidemic",
  "DOI": "10.5123/S1679-49742020000100021",
  "Count": 1
}, {
  "Atitle": "Novel coronavirus SARS-CoV-2: familial spread resulting in COVID-19 pneumonia in a pediatric patient",
  "DOI": "10.5152/dir.2020.20157",
  "Count": 1
}, {
  "Atitle": "Management strategy of novel coronavirus (COVID-19 pneumonia in the radiology department: a Chinese experience",
  "DOI": "10.5152/dir.2020.20167",
  "Count": 1
}, {
  "Atitle": "Coronavirus (Covid-19 outbreak on the cruise ship Diamond Princess",
  "DOI": "10.5603/MH.2020.0003",
  "Count": 1
}, {
  "Atitle": "Seroprevalence of corona virus in dairy herds of Jabalpur region",
  "DOI": "10.5958/0974-0147.2014.00005.1",
  "Count": 1
}, {
  "Atitle": "The Border Quarantine Response to the Outbreak of Middle East Respiratory Syndrome Coronavirus at Taoyuan International Airport, Taiwan, 2015",
  "DOI": "10.6525/TEB.20170822.33(16).001",
  "Count": 1
}, {
  "Atitle": "Perspectives on therapeutic neutralizing antibodies against the Novel Coronavirus SARS-CoV-2",
  "DOI": "10.7150/ijbs.45123",
  "Count": 1
}, {
  "Atitle": "COVID-19 as an occupational disease?",
  "DOI": "10.7196/SAMJ.2020.v110i4.14712",
  "Count": 1
}, {
  "Atitle": "Reporting, Epidemic Growth, and Reproduction Numbers for the 2019 Novel Coronavirus (2019-nCoV Epidemic",
  "DOI": "10.7326/M20-0358",
  "Count": 1
}, {
  "Atitle": "All Feet On Deck-The Role of Podiatry During the COVID-19 Pandemic: Preventing hospitalizations in an overburdened healthcare system, reducing amputation and death in people with diabetes",
  "DOI": "10.7547/20-051",
  "Count": 1
}, {
  "Atitle": "Determination of host proteins composing the microenvironment of coronavirus replicase complexes by proximity-labeling",
  "DOI": "10.7554/eLife.42037",
  "Count": 1
}, {
  "Atitle": "The human coronavirus HCoV-229E S-protein structure and receptor binding",
  "DOI": "10.7554/eLife.51230",
  "Count": 1
}, {
  "Atitle": "Wuhan novel coronavirus",
  "DOI": "10.7748/ns.35.2.11.s7",
  "Count": 1
}, {
  "Atitle": "An Ounce of Prevention: Coronavirus (COVID-19 and Mass Gatherings",
  "DOI": "10.7759/cureus.7345",
  "Count": 1
}, {
  "Atitle": "Clinical Implications of 5 Cases of Middle East Respiratory Syndrome Coronavirus Infection in a South Korean Outbreak",
  "DOI": "10.7883/yoken.JJID.2015.445",
  "Count": 1
}, {
  "Atitle": "Clinical implications of five cases of Middle East respiratory syndrome coronavirus infection in South Korea Outbreak",
  "DOI": "10.7883/yoken.JJID.2015.445",
  "Count": 1
}, {
  "Atitle": "Characteristics of peripheral blood leukocyte differential counts in patients with COVID-19]",
  "DOI": "3760.10/cma.j.cn112138-20200221-00114",
  "Count": 1
}, {
  "Atitle": "COVID-19: Yet Another Coronavirus Challenge in Transplantation",
  "DOI": "https://doi.org/10.1016/j.healun.2020.03.007",
  "Count": 1
}];
})();