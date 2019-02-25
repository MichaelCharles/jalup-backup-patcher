const app = new Vue({
  el: "#app",
  data: {
    webText: "",
    webData: "",
    appText: "",
    appData: {},
    mergedText: "",
    mergedData: {}
  },
  methods: {
  	mergeFiles: function(){
        this.webData = this.csvToJson(this.webText);
    	this.appData = this.csvToJson(this.appText);
        this.mergedData = this.mergeJson(this.appData, this.webData);
        this.mergedText = this.jsonToCsv(this.mergedData);
    },
    csvToJson: function(csv) {
        let lines = csv.split("\n");
        let object = {};
        lines.forEach(function(line) {
            let lineArray = line.split(",");
            object[lineArray[1]] = lineArray;
        });
        return object;
    },
    mergeJson: function(baseData, overwriteData) {
        let mergedData = baseData;
        Object.keys(mergedData).forEach(function(key){
            if (overwriteData[key]) {
                mergedData[key] = overwriteData[key];
            }
        });
        let orderedData = {};
        Object.keys(mergedData).sort().forEach(function(key) {
          orderedData[key] = mergedData[key];
        });
        return orderedData;
    },
    jsonToCsv: function(json) {
        let dataArray = [];
        Object.keys(json).forEach(function(key) {
            let newLine = json[key];
            dataArray.push(newLine.join(","));
        });
        return test = dataArray.join("\n");
    },
    updateWebFromFile: function(target) {
        let webFileInput = document.querySelector('#webFileInput');
        let webFile = webFileInput.files[0];
        
        let webReader = new FileReader();
        webReader.onload = function(e) {
            app._data.webText = e.target.result;
        }
        webReader.readAsText(webFile);
    },
    updateAppFromFile: function(target) {
        let appFileInput = document.querySelector('#appFileInput');
        let appFile = appFileInput.files[0];
        
        let appReader = new FileReader();
        appReader.onload = function(e) {
            app._data.appText = e.target.result;
        }
        appReader.readAsText(appFile);
    },
    download: function() {
        saveTextAs(this.mergedText, "merged.csv");
    }
  }
})