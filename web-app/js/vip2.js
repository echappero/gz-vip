/*-------- IMPORT FROM ( Name [ dwr/util.js ], Type [ WebComponetFile  ] ) --------*/
function DWRUtil() { }


DWRUtil.onReturn = function(event, action) {
if (!event) {
event = window.event;
}
if (event && event.keyCode && event.keyCode == 13) {
action();
}
};


DWRUtil.selectRange = function(ele, start, end) {
var orig = ele;
ele = $(ele);
if (ele == null) {
DWRUtil.debug("selectRange() can't find an element with id: " + orig + ".");
return;
}
if (ele.setSelectionRange) {
ele.setSelectionRange(start, end);
}
else if (ele.createTextRange) {
var range = ele.createTextRange();
range.moveStart("character", start);
range.moveEnd("character", end - ele.value.length);
range.select();
}
ele.focus();
};


DWRUtil._getSelection = function(ele) {
var orig = ele;
ele = $(ele);
if (ele == null) {
DWRUtil.debug("selectRange() can't find an element with id: " + orig + ".");
return;
}
return ele.value.substring(ele.selectionStart, ele.selectionEnd);


}


var $;
if (!$ && document.getElementById) {
$ = function() {
var elements = new Array();
for (var i = 0; i < arguments.length; i++) {
var element = arguments[i];
if (typeof element == 'string') {
element = document.getElementById(element);
}
if (arguments.length == 1) {
return element;
}
elements.push(element);
}
return elements;
}
}
else if (!$ && document.all) {
$ = function() {
var elements = new Array();
for (var i = 0; i < arguments.length; i++) {
var element = arguments[i];
if (typeof element == 'string') {
element = document.all[element];
}
if (arguments.length == 1) {
return element;
}
elements.push(element);
}
return elements;
}
}





DWRUtil.toDescriptiveString = function(data, level, depth) {
var reply = "";
var i = 0;
var value;
var obj;
if (level == null) level = 0;
if (depth == null) depth = 0;
if (data == null) return "null";
if (DWRUtil._isArray(data)) {
if (data.length == 0) reply += "[]";
else {
if (level != 0) reply += "[\n";
else reply = "[";
for (i = 0; i < data.length; i++) {
try {
obj = data[i];
if (obj == null || typeof obj == "function") {
continue;
}
else if (typeof obj == "object") {
if (level > 0) value = DWRUtil.toDescriptiveString(obj, level - 1, depth + 1);
else value = DWRUtil._detailedTypeOf(obj);
}
else {
value = "" + obj;
value = value.replace(/\/n/g, "\\n");
value = value.replace(/\/t/g, "\\t");
}
}
catch (ex) {
value = "" + ex;
}
if (level != 0)  {
reply += DWRUtil._indent(level, depth + 2) + value + ", \n";
}
else {
if (value.length > 13) value = value.substring(0, 10) + "...";
reply += value + ", ";
if (i > 5) {
reply += "...";
break;
}
}
}
if (level != 0) reply += DWRUtil._indent(level, depth) + "]";
else reply += "]";
}
return reply;
}
if (typeof data == "string" || typeof data == "number" || DWRUtil._isDate(data)) {
return data.toString();
}
if (typeof data == "object") {
var typename = DWRUtil._detailedTypeOf(data);
if (typename != "Object")  reply = typename + " ";
if (level != 0) reply += "{\n";
else reply = "{";
var isHtml = DWRUtil._isHTMLElement(data);
for (var prop in data) {
if (isHtml) {

if (prop.toUpperCase() == prop || prop == "title" ||
prop == "lang" || prop == "dir" || prop == "className" ||
prop == "form" || prop == "name" || prop == "prefix" ||
prop == "namespaceURI" || prop == "nodeType" ||
prop == "firstChild" || prop == "lastChild" ||
prop.match(/^offset/)) {
continue;
}
}
value = "";
try {
obj = data[prop];
if (obj == null || typeof obj == "function") {
continue;
}
else if (typeof obj == "object") {
if (level > 0) {
value = "\n";
value += DWRUtil._indent(level, depth + 2);
value = DWRUtil.toDescriptiveString(obj, level - 1, depth + 1);
}
else {
value = DWRUtil._detailedTypeOf(obj);
}
}
else {
value = "" + obj;
value = value.replace(/\/n/g, "\\n");
value = value.replace(/\/t/g, "\\t");
}
}
catch (ex) {
value = "" + ex;
}
if (level == 0 && value.length > 13) value = value.substring(0, 10) + "...";
var propStr = prop;
if (propStr.length > 30) propStr = propStr.substring(0, 27) + "...";
if (level != 0) reply += DWRUtil._indent(level, depth + 1);
reply += prop + ":" + value + ", ";
if (level != 0) reply += "\n";
i++;
if (level == 0 && i > 5) {
reply += "...";
break;
}
}
reply += DWRUtil._indent(level, depth);
reply += "}";
return reply;
}
return data.toString();
};




DWRUtil._indent = function(level, depth) {
var reply = "";
if (level != 0) {
for (var j = 0; j < depth; j++) {
reply += "\u00A0\u00A0";
}
reply += " ";
}
return reply;
};





DWRUtil.useLoadingMessage = function(message) {
var loadingMessage;
if (message) loadingMessage = message;
else loadingMessage = "Loading";
DWREngine.setPreHook(function() {
var disabledZone = $('disabledZone');
if (!disabledZone) {
disabledZone = document.createElement('div');
disabledZone.setAttribute('id', 'disabledZone');
disabledZone.style.position = "absolute";
disabledZone.style.zIndex = "1000";
disabledZone.style.left = "0px";
disabledZone.style.top = "0px";
disabledZone.style.width = "100%";
disabledZone.style.height = "100%";
document.body.appendChild(disabledZone);
var messageZone = document.createElement('div');
messageZone.setAttribute('id', 'messageZone');
messageZone.style.position = "absolute";
messageZone.style.top = "0px";
messageZone.style.zIndex="3"; 
messageZone.style.right = "0px";
messageZone.style.background = "#fee600";
messageZone.style.color = "#0000FF";
messageZone.style.fontFamily = "Arial,Helvetica,sans-serif";
messageZone.style.padding = "4px";
disabledZone.appendChild(messageZone);
var text = document.createTextNode(loadingMessage);
messageZone.appendChild(text);
}
else {
$('messageZone').innerHTML = loadingMessage;
disabledZone.style.visibility = 'visible';
}
});
DWREngine.setPostHook(function() {
$('disabledZone').style.visibility = 'hidden';
});
}





DWRUtil.setValue = function(ele, val, options) {
if (val == null) val = "";
if (options != null) {
if (options.escapeHtml) {
val = val.replace(/&/, "&amp;");
val = val.replace(/'/, "&apos;");
val = val.replace(/</, "&lt;");
val = val.replace(/>/, "&gt;");
}
}

var orig = ele;
var nodes, node, i;

ele = $(ele);

if (ele == null) {
nodes = document.getElementsByName(orig);
if (nodes.length >= 1) {
ele = nodes.item(0);
}
}
if (ele == null) {
DWRUtil.debug("setValue() can't find an element with id/name: " + orig + ".");
return;
}

if (DWRUtil._isHTMLElement(ele, "select")) {
if (ele.type == "select-multiple" && DWRUtil._isArray(val)) {
DWRUtil._selectListItems(ele, val);
}
else {
DWRUtil._selectListItem(ele, val);
}
return;
}

if (DWRUtil._isHTMLElement(ele, "input")) {
if (ele.type == "radio") {

if (nodes == null) nodes = document.getElementsByName(orig);
if (nodes != null && nodes.length > 1) {
for (i = 0; i < nodes.length; i++) {
node = nodes.item(i);
if (node.type == "radio") {
node.checked = (node.value == val);
}
}
}
else {
ele.checked = (val == true);
}
}
else if (ele.type == "checkbox") {
ele.checked = val;
}
else {
ele.value = val;
}
return;
}

if (DWRUtil._isHTMLElement(ele, "textarea")) {
ele.value = val;
return;
}



if (val.nodeType) {
if (val.nodeType == 9  ) {
val = val.documentElement;
}

val = DWRUtil._importNode(ele.ownerDocument, val, true);
ele.appendChild(val);
return;
}


ele.innerHTML = val;
};






DWRUtil._selectListItems = function(ele, val) {


var found  = false;
var i;
var j;
for (i = 0; i < ele.options.length; i++) {
ele.options[i].selected = false;
for (j = 0; j < val.length; j++) {
if (ele.options[i].value == val[j]) {
ele.options[i].selected = true;
}
}
}

if (found) return;

for (i = 0; i < ele.options.length; i++) {
for (j = 0; j < val.length; j++) {
if (ele.options[i].text == val[j]) {
ele.options[i].selected = true;
}
}
}
};






DWRUtil._selectListItem = function(ele, val) {


var found  = false;
var i;
for (i = 0; i < ele.options.length; i++) {
if (ele.options[i].value == val) {
ele.options[i].selected = true;
found = true;
}
else {
ele.options[i].selected = false;
}
}


if (found) return;

for (i = 0; i < ele.options.length; i++) {
if (ele.options[i].text == val) {
ele.options[i].selected = true;
}
else {
ele.options[i].selected = false;
}
}
}





DWRUtil.getValue = function(ele, options) {
if (options == null) {
options = {};
}
var orig = ele;
ele = $(ele);


var nodes = document.getElementsByName(orig);
if (ele == null && nodes.length >= 1) {
ele = nodes.item(0);
}
if (ele == null) {
DWRUtil.debug("getValue() can't find an element with id/name: " + orig + ".");
return "";
}

if (DWRUtil._isHTMLElement(ele, "select")) {


var sel = ele.selectedIndex;
if (sel != -1) {
var reply = ele.options[sel].value;
if (reply == null || reply == "") {
reply = ele.options[sel].text;
}

return reply;
}
else {
return "";
}
}

if (DWRUtil._isHTMLElement(ele, "input")) {
if (ele.type == "radio") {
var node;
for (i = 0; i < nodes.length; i++) {
node = nodes.item(i);
if (node.type == "radio") {
if (node.checked) {
if (nodes.length > 1) return node.value;
else return true;
}
}
}
}
switch (ele.type) {
case "checkbox":
case "check-box":
case "radio":
return ele.checked;
default:
return ele.value;
}
}

if (DWRUtil._isHTMLElement(ele, "textarea")) {
return ele.value;
}

if (options.textContent) {
if (ele.textContent) return ele.textContent;
else if (ele.innerText) return ele.innerText;
}
return ele.innerHTML;
};





DWRUtil.getText = function(ele) {
var orig = ele;
ele = $(ele);
if (ele == null) {
DWRUtil.debug("getText() can't find an element with id: " + orig + ".");
return "";
}

if (!DWRUtil._isHTMLElement(ele, "select")) {
DWRUtil.debug("getText() can only be used with select elements. Attempt to use: " + DWRUtil._detailedTypeOf(ele) + " from  id: " + orig + ".");
return "";
}



var sel = ele.selectedIndex;
if (sel != -1) {
return ele.options[sel].text;
}
else {
return "";
}
};





DWRUtil.setValues = function(map) {
for (var property in map) {

if ($(property) != null || document.getElementsByName(property).length >= 1) {
DWRUtil.setValue(property, map[property]);
}
}
};






DWRUtil.getValues = function(data) {
var ele;
if (typeof data == "string") ele = $(data);
if (DWRUtil._isHTMLElement(data)) ele = data;
if (ele != null) {
if (ele.elements == null) {
alert("getValues() requires an object or reference to a form element.");
return null;
}
var reply = {};
var value;
for (var i = 0; i < ele.elements.length; i++) {
if (ele[i].id != null) value = ele[i].id;
else if (ele[i].value != null) value = ele[i].value;
else value = "element" + i;
reply[value] = DWRUtil.getValue(ele[i]);
}
return reply;
}
else {
for (var property in data) {

if ($(property) != null || document.getElementsByName(property).length >= 1) {
data[property] = DWRUtil.getValue(property);
}
}
return data;
}
};





DWRUtil.addOptions = function(ele, data) {
var orig = ele;
ele = $(ele);
if (ele == null) {
DWRUtil.debug("addOptions() can't find an element with id: " + orig + ".");
return;
}
var useOptions = DWRUtil._isHTMLElement(ele, "select");
var useLi = DWRUtil._isHTMLElement(ele, ["ul", "ol"]);
if (!useOptions && !useLi) {
DWRUtil.debug("addOptions() can only be used with select/ul/ol elements. Attempt to use: " + DWRUtil._detailedTypeOf(ele));
return;
}
if (data == null) return;

var text;
var value;
var opt;
var li;
if (DWRUtil._isArray(data)) {

for (var i = 0; i < data.length; i++) {
if (useOptions) {
if (arguments[2] != null) {
if (arguments[3] != null) {
text = DWRUtil._getValueFrom(data[i], arguments[3]);
value = DWRUtil._getValueFrom(data[i], arguments[2]);
}
else {
value = DWRUtil._getValueFrom(data[i], arguments[2]);
text = value;
}
}
else
{
text = DWRUtil._getValueFrom(data[i], arguments[3]);
value = text;
}
if (text || value) {
opt = new Option(text, value);
ele.options[ele.options.length] = opt;
}
}
else {
li = document.createElement("li");
value = DWRUtil._getValueFrom(data[i], arguments[2]);
if (value != null) {
li.innerHTML = value;
ele.appendChild(li);
}
}
}
}
else if (arguments[3] != null) {
for (var prop in data) {
if (!useOptions) {
alert("DWRUtil.addOptions can only create select lists from objects.");
return;
}
value = DWRUtil._getValueFrom(data[prop], arguments[2]);
text = DWRUtil._getValueFrom(data[prop], arguments[3]);
if (text || value) {
opt = new Option(text, value);
ele.options[ele.options.length] = opt;
}
}
}
else {
for (var prop in data) {
if (!useOptions) {
DWRUtil.debug("DWRUtil.addOptions can only create select lists from objects.");
return;
}
if (typeof data[prop] == "function") {

text = null;
value = null;
}
else if (arguments[2]) {
text = prop;
value = data[prop];
}
else {
text = data[prop];
value = prop;
}
if (text || value) {
opt = new Option(text, value);
ele.options[ele.options.length] = opt;
}
}
}
};




DWRUtil._getValueFrom = function(data, method) {
if (method == null) return data;
else if (typeof method == 'function') return method(data);
else return data[method];
}





DWRUtil.removeAllOptions = function(ele) {
var orig = ele;
ele = $(ele);
if (ele == null) {
DWRUtil.debug("removeAllOptions() can't find an element with id: " + orig + ".");
return;
}
var useOptions = DWRUtil._isHTMLElement(ele, "select");
var useLi = DWRUtil._isHTMLElement(ele, ["ul", "ol"]);
if (!useOptions && !useLi) {
DWRUtil.debug("removeAllOptions() can only be used with select, ol and ul elements. Attempt to use: " + DWRUtil._detailedTypeOf(ele));
return;
}
if (useOptions) {
ele.options.length = 0;
}
else {
while (ele.childNodes.length > 0) {
ele.removeChild(ele.firstChild);
}
}
};





DWRUtil.addRows = function(ele, data, cellFuncs, options) {
var orig = ele;
ele = $(ele);
if (ele == null) {
DWRUtil.debug("addRows() can't find an element with id: " + orig + ".");
return;
}
if (!DWRUtil._isHTMLElement(ele, ["table", "tbody", "thead", "tfoot"])) {
DWRUtil.debug("addRows() can only be used with table, tbody, thead and tfoot elements. Attempt to use: " + DWRUtil._detailedTypeOf(ele));
return;
}
if (!options) options = {};
if (!options.rowCreator) options.rowCreator = DWRUtil._defaultRowCreator;
if (!options.cellCreator) options.cellCreator = DWRUtil._defaultCellCreator;
var tr, rowNum;
if (DWRUtil._isArray(data)) {
for (rowNum = 0; rowNum < data.length; rowNum++) {
options.rowData = data[rowNum];
options.rowIndex = rowNum;
options.rowNum = rowNum;
options.data = null;
options.cellNum = -1;
tr = DWRUtil._addRowInner(cellFuncs, options);
if (tr != null) ele.appendChild(tr);
}
}
else if (typeof data == "object") {
rowNum = 0;
for (var rowIndex in data) {
options.rowData = data[rowIndex];
options.rowIndex = rowIndex;
options.rowNum = rowNum;
options.data = null;
options.cellNum = -1;
tr = DWRUtil._addRowInner(cellFuncs, options);
if (tr != null) ele.appendChild(tr);
rowNum++;
}
}
};




DWRUtil._addRowInner = function(cellFuncs, options) {
var tr = options.rowCreator(options);
if (tr == null) return null;
for (var cellNum = 0; cellNum < cellFuncs.length; cellNum++) {
var func = cellFuncs[cellNum];
var td;







var reply = func(options.rowData);
options.data = reply;
options.cellNum = cellNum;
td = options.cellCreator(options);
if (DWRUtil._isHTMLElement(reply, "td")) td = reply;
else if (DWRUtil._isHTMLElement(reply)) td.appendChild(reply);
else td.innerHTML = reply;

tr.appendChild(td);
}
return tr;
};




DWRUtil._defaultRowCreator = function(options) {
return document.createElement("tr");
};




DWRUtil._defaultCellCreator = function(options) {
return document.createElement("td");
};





DWRUtil.removeAllRows = function(ele) {
var orig = ele;
ele = $(ele);
if (ele == null) {
DWRUtil.debug("removeAllRows() can't find an element with id: " + orig + ".");
return;
}
if (!DWRUtil._isHTMLElement(ele, ["table", "tbody", "thead", "tfoot"])) {
DWRUtil.debug("removeAllRows() can only be used with table, tbody, thead and tfoot elements. Attempt to use: " + DWRUtil._detailedTypeOf(ele));
return;
}
while (ele.childNodes.length > 0) {
ele.removeChild(ele.firstChild);
}
};







DWRUtil._isHTMLElement = function(ele, nodeName) {
if (ele == null || typeof ele != "object" || ele.nodeName == null) {
return false;
}

if (nodeName != null) {
var test = ele.nodeName.toLowerCase();

if (typeof nodeName == "string") {
return test == nodeName.toLowerCase();
}

if (DWRUtil._isArray(nodeName)) {
var match = false;
for (var i = 0; i < nodeName.length && !match; i++) {
if (test == nodeName[i].toLowerCase()) {
match =  true;
}
}
return match;
}

DWRUtil.debug("DWRUtil._isHTMLElement was passed test node name that is neither a string or array of strings");
return false;
}

return true;
};




DWRUtil._detailedTypeOf = function(x) {
var reply = typeof x;
if (reply == "object") {
reply = Object.prototype.toString.apply(x);
reply = reply.substring(8, reply.length-1);
}
return reply;
};




DWRUtil._isArray = function(data) {
return (data && data.join) ? true : false;
};




DWRUtil._isDate = function(data) {
return (data && data.toUTCString) ? true : false;
};




DWRUtil._importNode = function(doc, importedNode, deep) {
var newNode;

if (importedNode.nodeType == 1  ) {
newNode = doc.createElement(importedNode.nodeName);

for (var i = 0; i < importedNode.attributes.length; i++) {
var attr = importedNode.attributes[i];
if (attr.nodeValue != null && attr.nodeValue != '') {
newNode.setAttribute(attr.name, attr.nodeValue);
}
}

if (typeof importedNode.style != "undefined") {
newNode.style.cssText = importedNode.style.cssText;
}
}
else if (importedNode.nodeType == 3  ) {
newNode = doc.createTextNode(importedNode.nodeValue);
}

if (deep && importedNode.hasChildNodes()) {
for (i = 0; i < importedNode.childNodes.length; i++) {
newNode.appendChild(DWRUtil._importNode(doc, importedNode.childNodes[i], true));
}
}

return newNode;
}


DWRUtil.debug = function(message) {
alert(message);
}


/*-------- IMPORT FROM ( Name [ dwr/engine.js ], Type [ WebComponetFile  ] ) --------*/
function hashCode(str) {
	var h = 0;
	if (str) {
	    for (var j=str.length-1; j>=0; j--) {
	        h ^= "w5Q2KkFts3deLIPg8Nynu_JAUBZ9YxmH1XW47oDpa6lcjMRfi0CrhbGSOTvqzEV".indexOf(str.charAt(j)) + 1;
	        for (var i=0; i<3; i++) {
	            var m = (h = h<<7 | h>>>25) & 150994944;
	            h ^= m ? (m == 150994944 ? 1 : 0) : 1;
	        }
	    }
	}
	return Math.abs(h);
}

function DWREngine() { }

DWREngine.setErrorHandler = function(handler) {
DWREngine._errorHandler = handler;
};

DWREngine.setWarningHandler = function(handler) {
DWREngine._warningHandler = handler;
};

DWREngine.setTimeout = function(timeout) {
DWREngine._timeout = timeout;
};





DWREngine.setPreHook = function(handler) {
DWREngine._preHook = handler;
};





DWREngine.setPostHook = function(handler) {
DWREngine._postHook = handler;
};


DWREngine.XMLHttpRequest = 1;


DWREngine.IFrame = 2;






DWREngine.setMethod = function(newmethod) {
if (newmethod != DWREngine.XMLHttpRequest && newmethod != DWREngine.IFrame) {
DWREngine._handleError("Remoting method must be one of DWREngine.XMLHttpRequest or DWREngine.IFrame");
return;
}
DWREngine._method = newmethod;
};





DWREngine.setVerb = function(verb) {
if (verb != "GET" && verb != "POST") {
DWREngine._handleError("Remoting verb must be one of GET or POST");
return;
}
DWREngine._verb = verb;
};





DWREngine.setOrdered = function(ordered) {
DWREngine._ordered = ordered;
};





DWREngine.setAsync = function(async) {
DWREngine._async = async;
};





DWREngine.defaultMessageHandler = function(message) {
if (typeof message == "object" && message.name == "Error" && message.description) {
alert("Error: " + message.description);
}
else {
alert(message);
}
};





DWREngine.beginBatch = function() {
if (DWREngine._batch) {
DWREngine._handleError("Batch already started.");
return;
}

DWREngine._batch = {};
DWREngine._batch.map = {};
DWREngine._batch.paramCount = 0;
DWREngine._batch.map.callCount = 0;
DWREngine._batch.ids = [];
DWREngine._batch.preHooks = [];
DWREngine._batch.postHooks = [];
};





DWREngine.endBatch = function(options) {
var batch = DWREngine._batch;
if (batch == null) {
DWREngine._handleError("No batch in progress.");
return;
}

if (options && options.preHook) batch.preHooks.unshift(options.preHook);
if (options && options.postHook) batch.postHooks.push(options.postHook);
if (DWREngine._preHook) batch.preHooks.unshift(DWREngine._preHook);
if (DWREngine._postHook) batch.postHooks.push(DWREngine._postHook);

if (batch.method == null) batch.method = DWREngine._method;
if (batch.verb == null) batch.verb = DWREngine._verb;
if (batch.async == null) batch.async = DWREngine._async;
if (batch.timeout == null) batch.timeout = DWREngine._timeout;

batch.completed = false;


DWREngine._batch = null;



if (!DWREngine._ordered) {
DWREngine._sendData(batch);
DWREngine._batches[DWREngine._batches.length] = batch;
}
else {
if (DWREngine._batches.length == 0) {

DWREngine._sendData(batch);
DWREngine._batches[DWREngine._batches.length] = batch;
}
else {

DWREngine._batchQueue[DWREngine._batchQueue.length] = batch;
}
}
};






DWREngine._errorHandler = DWREngine.defaultMessageHandler;


DWREngine._warningHandler = DWREngine.defaultMessageHandler;


DWREngine._preHook = null;


DWREngine._postHook = null;


DWREngine._batches = [];


DWREngine._batchQueue = [];


DWREngine._handlersMap = {};


DWREngine._method = DWREngine.XMLHttpRequest;


DWREngine._verb = "POST";


DWREngine._ordered = false;


DWREngine._async = true;


DWREngine._batch = null;


DWREngine._timeout = 0;


DWREngine._DOMDocument = ["Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"];


DWREngine._XMLHTTP = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];










DWREngine._execute = function(path, scriptName, methodName, vararg_params) {
var singleShot = false;
if (DWREngine._batch == null) {
DWREngine.beginBatch();
singleShot = true;
}

var args = [];
for (var i = 0; i < arguments.length - 3; i++) {
args[i] = arguments[i + 3];
}

if (DWREngine._batch.path == null) {
DWREngine._batch.path = path;
}
else {
if (DWREngine._batch.path != path) {
DWREngine._handleError("Can't batch requests to multiple DWR Servlets.");
return;
}
}


var params;
var callData;
var firstArg = args[0];
var lastArg = args[args.length - 1];

if (typeof firstArg == "function") {
callData = { callback:args.shift() };
params = args;
}
else if (typeof lastArg == "function") {
callData = { callback:args.pop() };
params = args;
}
else if (typeof lastArg == "object" && lastArg.callback != null && typeof lastArg.callback == "function") {
callData = args.pop();
params = args;
}
else if (firstArg == null) {



if (lastArg == null && args.length > 2) {
if (DWREngine._warningHandler) {
DWREngine._warningHandler("Ambiguous nulls at start and end of parameter list. Which is the callback function?");
}
}
callData = { callback:args.shift() };
params = args;
}
else if (lastArg == null) {
callData = { callback:args.pop() };
params = args;
}
else {
if (DWREngine._warningHandler) {
DWREngine._warningHandler("Missing callback function or metadata object.");
}
return;
}

/*
var random = Math.floor(Math.random() * 10001);
var id = (random + "_" + new Date().getTime()).toString();
*/

var qry = scriptName+methodName;
for (qryI=0; qryI<params.length; qryI++) qry+=params[qryI];
var id = hashCode(qry);

var prefix = "c" + DWREngine._batch.map.callCount + "-";
DWREngine._batch.ids.push(id);

if (callData.method != null) {
DWREngine._batch.method = callData.method;
delete callData.method;
}
if (callData.verb != null) {
DWREngine._batch.verb = callData.verb;
delete callData.verb;
}
if (callData.async != null) {
DWREngine._batch.async = callData.async;
delete callData.async;
}
if (callData.timeout != null) {
DWREngine._batch.timeout = callData.timeout;
delete callData.timeout;
}


if (callData.preHook != null) {
DWREngine._batch.preHooks.unshift(callData.preHook);
delete callData.preHook;
}
if (callData.postHook != null) {
DWREngine._batch.postHooks.push(callData.postHook);
delete callData.postHook;
}


if (callData.errorHandler == null) callData.errorHandler = DWREngine._errorHandler;
if (callData.warningHandler == null) callData.warningHandler = DWREngine._warningHandler;


DWREngine._handlersMap[id] = callData;

DWREngine._batch.map[prefix + "scriptName"] = scriptName;
DWREngine._batch.map[prefix + "methodName"] = methodName;
DWREngine._batch.map[prefix + "id"] = id;


DWREngine._addSerializeFunctions();
for (i = 0; i < params.length; i++) {
DWREngine._serializeAll(DWREngine._batch, [], params[i], prefix + "param" + i);
}
DWREngine._removeSerializeFunctions();


DWREngine._batch.map.callCount++;
if (singleShot) {
DWREngine.endBatch();
}
};




DWREngine._sendData = function(batch) {

if (batch.map.callCount == 0) return;

for (var i = 0; i < batch.preHooks.length; i++) {
batch.preHooks[i]();
}
batch.preHooks = null;

if (batch.timeout && batch.timeout != 0) {
batch.interval = setInterval(function() {
clearInterval(batch.interval);
DWREngine._abortRequest(batch);
}, batch.timeout);
}

var statsInfo;
if (batch.map.callCount == 1) {
statsInfo = batch.map["c0-scriptName"] + "." + batch.map["c0-methodName"] + ".dwr";
}
else {
statsInfo = "Multiple." + batch.map.callCount + ".dwr";
}


if (batch.method == DWREngine.XMLHttpRequest) {
if (window.XMLHttpRequest) {
batch.req = new XMLHttpRequest();
}

else if (window.ActiveXObject && !(navigator.userAgent.indexOf('Mac') >= 0 && navigator.userAgent.indexOf("MSIE") >= 0)) {
batch.req = DWREngine._newActiveXObject(DWREngine._XMLHTTP);
}
}

var query = "";
var prop;
if (batch.req) {
batch.map.xml = "true";

if (batch.async) {
batch.req.onreadystatechange = function() {
DWREngine._stateChange(batch);
};
}

var indexSafari = navigator.userAgent.indexOf('Safari/');
if (indexSafari >= 0) {

var version = navigator.userAgent.substring(indexSafari + 7);
var verNum = parseInt(version, 10);
if (verNum < 400) {
batch.verb == "GET";
}



}
if (batch.verb == "GET") {



batch.map.callCount = "" + batch.map.callCount;

for (prop in batch.map) {
var qkey = encodeURIComponent(prop);
var qval = encodeURIComponent(batch.map[prop]);
if (qval == "") {
if (DWREngine._warningHandler) {
DWREngine._warningHandler("Found empty qval for qkey=" + qkey);
}
}
query += qkey + "=" + qval + "&";
}
query = query.substring(0, query.length - 1);

try {
batch.req.open("GET", batch.path + "/exec/" + statsInfo + "?" + query, batch.async);
batch.req.send(null);
if (!batch.async) {
DWREngine._stateChange(batch);
}
}
catch (ex) {
DWREngine._handleMetaDataError(null, ex);
}
}
else {
for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
query += prop + "=" + batch.map[prop] + "\n";
}
}

try {




batch.req.open("POST", batch.path + "/exec/" + statsInfo, batch.async);
batch.req.setRequestHeader('Content-Type', 'text/plain');
batch.req.send(query);
if (!batch.async) {
DWREngine._stateChange(batch);
}
}
catch (ex) {
DWREngine._handleMetaDataError(null, ex);
}
}
}
else {
batch.map.xml = "false";
var idname = "dwr-if-" + batch.map["c0-id"];

batch.div = document.createElement('div');
batch.div.innerHTML = "<iframe frameborder='0' width='0' height='0' id='" + idname + "' name='" + idname + "'></iframe>";
document.body.appendChild(batch.div);
batch.iframe = document.getElementById(idname);
batch.iframe.setAttribute('style', 'width:0px; height:0px; border:0px;');

if (batch.verb == "GET") {
for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
query += encodeURIComponent(prop) + "=" + encodeURIComponent(batch.map[prop]) + "&";
}
}
query = query.substring(0, query.length - 1);

batch.iframe.setAttribute('src', batch.path + "/exec/" + statsInfo + "?" + query);
document.body.appendChild(batch.iframe);
}
else {
batch.form = document.createElement('form');
batch.form.setAttribute('id', 'dwr-form');
batch.form.setAttribute('action', batch.path + "/exec" + statsInfo);
batch.form.setAttribute('target', idname);
batch.form.target = idname;
batch.form.setAttribute('method', 'post');
for (prop in batch.map) {
var formInput = document.createElement('input');
formInput.setAttribute('type', 'hidden');
formInput.setAttribute('name', prop);
formInput.setAttribute('value', batch.map[prop]);
batch.form.appendChild(formInput);
}

document.body.appendChild(batch.form);
batch.form.submit();
}
}
};




DWREngine._stateChange = function(batch) {
if (!batch.completed && batch.req.readyState == 4) {
try {
var reply = batch.req.responseText;
var status = batch.req.status;

if (reply == null || reply == "") {
DWREngine._handleMetaDataError(null, "No data received from server");
return;
}


if (reply.search("DWREngine._handle") == -1) {
DWREngine._handleMetaDataError(null, "Invalid reply from server");
return;
}

if (status != 200) {
if (reply == null) reply = "Unknown error occured";
DWREngine._handleMetaDataError(null, reply);
return;
}

eval(reply);


DWREngine._clearUp(batch);
}
catch (ex) {
if (ex == null) ex = "Unknown error occured";
DWREngine._handleMetaDataError(null, ex);
}
finally {



if (DWREngine._batchQueue.length != 0) {
var sendbatch = DWREngine._batchQueue.shift();
DWREngine._sendData(sendbatch);
DWREngine._batches[DWREngine._batches.length] = sendbatch;
}
}
}
};






DWREngine._handleResponse = function(id, reply) {

var handlers = DWREngine._handlersMap[id];
DWREngine._handlersMap[id] = null;

if (handlers) {


try {
if (handlers.callback) handlers.callback(reply);
}
catch (ex) {
DWREngine._handleMetaDataError(handlers, ex);
}
}


if (DWREngine._method == DWREngine.IFrame) {
var responseBatch = DWREngine._batches[DWREngine._batches.length-1];

if (responseBatch.map["c"+(responseBatch.map.callCount-1)+"-id"] == id) {
DWREngine._clearUp(responseBatch);
}
}
};




DWREngine._handleServerError = function(id, error) {

var handlers = DWREngine._handlersMap[id];
DWREngine._handlersMap[id] = null;
if (error.message) {
DWREngine._handleMetaDataError(handlers, error.message, error);
}
else {
DWREngine._handleMetaDataError(handlers, error);
}
};




DWREngine._abortRequest = function(batch) {
if (batch && batch.metadata != null && !batch.completed) {
DWREngine._clearUp(batch);
if (batch.req) batch.req.abort();

var handlers;
var id;
for (var i = 0; i < batch.ids.length; i++) {
id = batch.ids[i];
handlers = DWREngine._handlersMap[id];
DWREngine._handleMetaDataError(handlers, "Timeout");
}
}
};




DWREngine._clearUp = function(batch) {
if (batch.completed) {
alert("double complete");
return;
}


if (batch.div) batch.div.parentNode.removeChild(batch.div);
if (batch.iframe) batch.iframe.parentNode.removeChild(batch.iframe);
if (batch.form) batch.form.parentNode.removeChild(batch.form);


if (batch.req) delete batch.req;

for (var i = 0; i < batch.postHooks.length; i++) {
batch.postHooks[i]();
}
batch.postHooks = null;


for (var i = 0; i < DWREngine._batches.length; i++) {
if (DWREngine._batches[i] == batch) {
DWREngine._batches.splice(i, 1);
break;
}
}

batch.completed = true;
};




DWREngine._handleError = function(reason, ex) {
if (DWREngine._errorHandler) {
DWREngine._errorHandler(reason, ex);
}
};




DWREngine._handleMetaDataError = function(handlers, reason, ex) {
if (handlers && typeof handlers.errorHandler == "function") {
handlers.errorHandler(reason, ex);
}
else {
DWREngine._handleError(reason, ex);
}
};




DWREngine._addSerializeFunctions = function() {
Object.prototype.dwrSerialize = DWREngine._serializeObject;
Array.prototype.dwrSerialize = DWREngine._serializeArray;
Boolean.prototype.dwrSerialize = DWREngine._serializeBoolean;
Number.prototype.dwrSerialize = DWREngine._serializeNumber;
String.prototype.dwrSerialize = DWREngine._serializeString;
Date.prototype.dwrSerialize = DWREngine._serializeDate;
};




DWREngine._removeSerializeFunctions = function() {
delete Object.prototype.dwrSerialize;
delete Array.prototype.dwrSerialize;
delete Boolean.prototype.dwrSerialize;
delete Number.prototype.dwrSerialize;
delete String.prototype.dwrSerialize;
delete Date.prototype.dwrSerialize;
};








DWREngine._serializeAll = function(batch, referto, data, name) {
if (data == null) {
batch.map[name] = "null:null";
return;
}

switch (typeof data) {
case "boolean":
batch.map[name] = "boolean:" + data;
break;

case "number":
batch.map[name] = "number:" + data;
break;

case "string":
batch.map[name] = "string:" + encodeURIComponent(data);
break;

case "object":
if (data.dwrSerialize) {
batch.map[name] = data.dwrSerialize(batch, referto, data, name);
}
else if (data.nodeName) {
batch.map[name] = DWREngine._serializeXml(batch, referto, data, name);
}
else {
if (DWREngine._warningHandler) {
DWREngine._warningHandler("Object without dwrSerialize: " + typeof data + ", attempting default converter.");
}
batch.map[name] = "default:" + data;
}
break;

case "function":

break;

default:
if (DWREngine._warningHandler) {
DWREngine._warningHandler("Unexpected type: " + typeof data + ", attempting default converter.");
}
batch.map[name] = "default:" + data;
break;
}
};


DWREngine._lookup = function(referto, data, name) {
var lookup;

for (var i = 0; i < referto.length; i++) {
if (referto[i].data == data) {
lookup = referto[i];
break;
}
}
if (lookup) {
return "reference:" + lookup.name;
}
referto.push({ data:data, name:name });
return null;
};


DWREngine._serializeObject = function(batch, referto, data, name) {
var ref = DWREngine._lookup(referto, this, name);
if (ref) return ref;

if (data.nodeName) {
return DWREngine._serializeXml(batch, referto, data, name);
}


var reply = "Object:{";
var element;
for (element in this)  {
if (element != "dwrSerialize") {
batch.paramCount++;
var childName = "c" + DWREngine._batch.map.callCount + "-e" + batch.paramCount;
DWREngine._serializeAll(batch, referto, this[element], childName);

reply += encodeURIComponent(element);
reply += ":reference:";
reply += childName;
reply += ", ";
}
}

if (reply.substring(reply.length - 2) == ", ") {
reply = reply.substring(0, reply.length - 2);
}
reply += "}";

return reply;
};


DWREngine._serializeXml = function(batch, referto, data, name) {
var ref = DWREngine._lookup(referto, this, name);
if (ref) {
return ref;
}
var output;
if (window.XMLSerializer) {
var serializer = new XMLSerializer();
output = serializer.serializeToString(data);
}
else {
output = data.toXml;
}
return "XML:" + encodeURIComponent(output);
};


DWREngine._serializeArray = function(batch, referto, data, name) {
var ref = DWREngine._lookup(referto, this, name);
if (ref) return ref;

var reply = "Array:[";
for (var i = 0; i < this.length; i++) {
if (i != 0) {
reply += ",";
}

batch.paramCount++;
var childName = "c" + DWREngine._batch.map.callCount + "-e" + batch.paramCount;
DWREngine._serializeAll(batch, referto, this[i], childName);
reply += "reference:";
reply += childName;
}
reply += "]";

return reply;
};


DWREngine._serializeBoolean = function(batch, referto, data, name) {
return "Boolean:" + this;
};


DWREngine._serializeNumber = function(batch, referto, data, name) {
return "Number:" + this;
};


DWREngine._serializeString = function(batch, referto, data, name) {
return "String:" + encodeURIComponent(this);
};


DWREngine._serializeDate = function(batch, referto, data, name) {
return "Date:" + this.getTime();
};


DWREngine._unserializeDocument = function(xml) {
var dom;
if (window.DOMParser) {
var parser = new DOMParser();
dom = parser.parseFromString(xml, "text/xml");
if (!dom.documentElement || dom.documentElement.tagName == "parsererror") {
var message = dom.documentElement.firstChild.data;
message += "\n" + dom.documentElement.firstChild.nextSibling.firstChild.data;
throw message;
}
return dom;
}
else if (window.ActiveXObject) {
dom = DWREngine._newActiveXObject(DWREngine._DOMDocument);
dom.loadXML(xml);

return dom;
}








else {
var div = document.createElement('div');
div.innerHTML = xml;
return div;
}
};





DWREngine._newActiveXObject = function(axarray) {
var returnValue;
for (var i = 0; i < axarray.length; i++) {
try {
returnValue = new ActiveXObject(axarray[i]);
break;
}
catch (ex) {
}
}
return returnValue;
};


if (typeof window.encodeURIComponent === 'undefined') {
DWREngine._utf8 = function(wide) {
wide = "" + wide;
var c;
var s;
var enc = "";
var i = 0;
while (i < wide.length) {
c = wide.charCodeAt(i++);

if (c >= 0xDC00 && c < 0xE000) continue;
if (c >= 0xD800 && c < 0xDC00) {
if (i >= wide.length) continue;
s = wide.charCodeAt(i++);
if (s < 0xDC00 || c >= 0xDE00) continue;
c = ((c - 0xD800) << 10) + (s - 0xDC00) + 0x10000;
}

if (c < 0x80) {
enc += String.fromCharCode(c);
}
else if (c < 0x800) {
enc += String.fromCharCode(0xC0 + (c >> 6), 0x80 + (c & 0x3F));
}
else if (c < 0x10000) {
enc += String.fromCharCode(0xE0 + (c >> 12), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
}
else {
enc += String.fromCharCode(0xF0 + (c >> 18), 0x80 + (c >> 12 & 0x3F), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
}
}
return enc;
}

DWREngine._hexchars = "0123456789ABCDEF";

DWREngine._toHex = function(n) {
return DWREngine._hexchars.charAt(n >> 4) + DWREngine._hexchars.charAt(n & 0xF);
}

DWREngine._okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

window.encodeURIComponent = function(s)  {
s = DWREngine._utf8(s);
var c;
var enc = "";
for (var i= 0; i<s.length; i++) {
if (DWREngine._okURIchars.indexOf(s.charAt(i)) == -1) {
enc += "%" + DWREngine._toHex(s.charCodeAt(i));
}
else {
enc += s.charAt(i);
}
}
return enc;
}
}


if (typeof Array.prototype.splice === 'undefined') {
Array.prototype.splice = function(ind, cnt)
{
if (arguments.length == 0) {
return ind;
}
if (typeof ind != "number") {
ind = 0;
}
if (ind < 0) {
ind = Math.max(0,this.length + ind);
}
if (ind > this.length) {
if (arguments.length > 2) {
ind = this.length;
}
else {
return [];
}
}
if (arguments.length < 2) {
cnt = this.length-ind;
}

cnt = (typeof cnt == "number") ? Math.max(0, cnt) : 0;
removeArray = this.slice(ind, ind + cnt);
endArray = this.slice(ind + cnt);
this.length = ind;

for (var i = 2; i < arguments.length; i++) {
this[this.length] = arguments[i];
}
for (i = 0; i < endArray.length; i++) {
this[this.length] = endArray[i];
}

return removeArray;
}
}


if (typeof Array.prototype.shift === 'undefined') {
Array.prototype.shift = function(str) {
var val = this[0];
for (var i = 1; i < this.length; ++i) {
this[i - 1] = this[i];
}
this.length--;
return val;
}
}


if (typeof Array.prototype.unshift === 'undefined') {
Array.prototype.unshift = function() {
var i = unshift.arguments.length;
for (var j = this.length - 1; j >= 0; --j) {
this[j + i] = this[j];
}
for (j = 0; j < i; ++j) {
this[j] = unshift.arguments[j];
}
}
}


if (typeof Array.prototype.push === 'undefined') {
Array.prototype.push = function() {
var sub = this.length;
for (var i = 0; i < push.arguments.length; ++i) {
this[sub] = push.arguments[i];
sub++;
}
}
}


if (typeof Array.prototype.pop === 'undefined') {
Array.prototype.pop = function() {
var lastElement = this[this.length - 1];
this.length--;
return lastElement;
}
}


/*-------- IMPORT FROM ( Name [ vip3/event.js ], Type [ WebComponetFile  ] ) --------*/
// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini
// http://dean.edwards.name/weblog/2005/10/add-event/

function addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};

/*-------- IMPORT FROM ( Name [ apiEvents.js ], Type [ WebComponetFile  ] ) --------*/
var tasksClick = new Array();
function addClickListener(task){
	if (task!=null)
		tasksClick[tasksClick.length]=task;	
	return;
}
document.onclick = clickFired;
function clickFired(E){
	for(var i =0 ; i <tasksClick.length; i++){
		tasksClick[i](E);
	}
	return;
}
var tasksKey=new Array();
function addKeyListener(task){
	if (task!=null)
		tasksKey[tasksKey.length]=task;	
	return;
}
document.onkeypress = keypressFired;
function keypressFired(E){
	for(var i =0 ; i <tasksKey.length; i++){
		tasksKey[i](E);
	}
	return;
}
		

/*-------- IMPORT FROM ( Name [ natural.js ], Type [ WebComponetFile  ] ) --------*/
function performNaturalCheck(referrer, currentUrl){
	//document.write("<BR>Iniciando identificaci�n para:["+referrer+"] ---> ["+currentUrl+"]<BR>");
	ind= getNaturalReferrerInd(referrer, currentUrl);
	if(ind == -1){
		//document.write("<BR><center>NN</center><BR>");
		return ;
	}
	//document.write("<BR><center>N</center><BR>");
	pageId= getPageIdentification(currentUrl);
	//document.write("<BR>Page Id="+pageId+" <BR>");
	
	naturalPmsSiteId= naturalPmsSiteIds[ind];
	naturalPmsId= naturalPmsIds[ind];
	//document.write("<BR>naturalPmsSiteId="+naturalPmsSiteId+"<BR>");
	//document.write("<BR>naturalPmsId="+naturalPmsId+"<BR>");
	
	key= "PMS"+naturalPmsId;
	setCookie("orgpms", naturalPmsSiteId, 30);
	setCookie("pmsword", pageId, 30);
	setCookie(key, key, 30);
	//document.write("<BR>Cookies seteadas<BR>");
}
function getPageIdentification(currentUrl){
	try{
		if ( oldUrl!=null){
			currentUrl= oldUrl;
		}
	}catch(e){}
	
	if(currentUrl.indexOf("jm/item") != -1)
		return "ITEM";
	if(currentUrl.indexOf("jm/search") != -1)
		return "SEARCH";
	if(currentUrl.indexOf("jm/themepage") != -1)
		return "THEMES";
	if(currentUrl.indexOf("/home")!= -1)
		return "HOME";
	if(currentUrl.indexOf("jm/guide")!= -1)
		return "GUIDES";
	if(currentUrl.indexOf("jm/catalog")!= -1)
		return "CATALOG";
	if(currentUrl.indexOf("jm/reviews")!= -1)
		return "REVIEWS";				
	if(currentUrl.length == 1 && currentUrl.lastIndexOf('/')==0)
		return "HOME";
	return "OTHER";	
}
function getNaturalReferrerInd(referrer, currentUrl){
	fromPms= getCookieValue("pmsonline");
	//document.write("<BR>pmsonline:"+fromPms+"<BR>");
	if(fromPms!=null){
		if(fromPms=="YES"){
			setCookie("pmsonline", currentUrl, null);
			return -1;
		}
		if(fromPms.toLowerCase()==currentUrl.toLowerCase())
			return -1;
	}
		
	iQueryIndex= referrer.indexOf("?");
	if(iQueryIndex != -1)
		referrer= referrer.substring(0, iQueryIndex);
	referrer= referrer.toLowerCase();
	finded= -1;
	for(var i= naturalSites.length-1; i>-1 && finded==-1; i--){
		if(referrer.indexOf(naturalSites[i])!=-1)
			finded = i;		
	}
	return finded;
}
function installListeners(){
	document.onclick= clickEvent;
	document.onkeypress= keyPressEvent;
}
function keyPressEvent(E){
	performPopPms();
}
function clickEvent(E){
	performPopPms();
}
function performPopPms(){
	var t_orgpms= getCookieValue("t_orgpms");
	if(t_orgpms){
		var t_cust_id = getCookieValue("t_cust_id");
		var t_pmsword= getCookieValue("t_pmsword");
		var key= "PMS"+t_cust_id;
		//Persistir cookies de PMS
		setCookie("orgpms", t_orgpms, 30);
		setCookie(key, key, 1);
		setCookie("pmsword", t_pmsword, 30);
		// Eliminar cookies temporales
		setCookie("t_orgpms", t_orgpms, -10);
		setCookie("t_pmsword", t_pmsword, -10);
		setCookie("t_cust_id", t_cust_id, -10);
	}
}


/*-------- IMPORT FROM ( Name [ ajax.js ], Type [ WebComponetFile  ] ) --------*/
// XmlHttp factory
function XmlHttp() {}

XmlHttp.create = function ()
{
	try
	{
		if (window.ActiveXObject)
			return new ActiveXObject (getControlPrefix ()+'.XmlHttp');
		if (window.XMLHttpRequest)
		{
			var req = new XMLHttpRequest ();
			    
			// some older versions of Moz did not support the readyState property
			// and the onreadystate event so we patch it!
			if (req.readyState == null)
			{
				req.readyState = 1;
				req.addEventListener ("load", function () {
					req.readyState = 4;
					if (typeof req.onreadystatechange == "function")
						req.onreadystatechange ();
					}, false);
			}
			    
			return req;
		}
	}
	catch (ex)
	{
		throw new Error ("Your browser does not support XmlHttp objects");
	}
};

XmlHttp.get = function (url, dataObject, callBack)
{
	var error = false;
	var exception;

	var data = '';
	if (dataObject != null)
	{
		for (var i in dataObject)
		{
			data = data == '' ? '?' : data + '&';
			data += i + '=' + escape (dataObject[i]);
		}
	}
	
	if (url == "")
		url = window.location.pathname;
	
	var async = typeof callBack == 'function';

	var xmlHttp = XmlHttp.create ();
	xmlHttp.open ('GET', url + data, async, null, null);
	if (async)
		xmlHttp.onreadystatechange = function () {if (xmlHttp.readyState == 4) callBack (xmlHttp, dataObject);};

	xmlHttp.send ();
	
	if (async)
		return;
	
	if (xmlHttp.status >= 400)
	{
		error = true;
		exception = new Exception (xmlHttp.status, xmlHttp.statusText, xmlHttp.responseText);
	}
	
	if (error)
	{
		alert (exception.message + ":\n" + exception.details);
		
		return null;
	}
	
	return xmlHttp;
};

XmlHttp.post = function (url, dataObject, callBack)
{
	var error = false;
	var exception;
	
	var data = null;
	if (dataObject != null)
	{
		if (dataObject.xml != null)
			data = dataObject;
		else
			for (var i in dataObject)
			{
				data = data == null ? '' : data + '&';
				data += i + '=' + escape (dataObject[i]);
			}
	}

	if (url == "")
		url = window.location.pathname;

	var async = typeof callBack == 'function';

	var xmlHttp = XmlHttp.create ();
	xmlHttp.open ('POST', url, async, null, null);
	xmlHttp.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=ISO-8859-1');

	if (async)
		xmlHttp.onreadystatechange = function () {if (xmlHttp.readyState == 4) callBack (xmlHttp, dataObject);};

	xmlHttp.send (data);
	
	if (async)
		return;

	if (xmlHttp.status >= 400)
	{
		error = true;
		exception = new Exception (xmlHttp.status, xmlHttp.statusText, xmlHttp.responseText);
	}
	
	if (error)
	{
		alert (exception.message + ":\n" + exception.details);
		
		return null;
	}
	
	return xmlHttp;
};

// XmlDocument factory
function XmlDocument() {}

XmlDocument.create = function (sNameSpaceUri, sQualifiedName, oDoctype)
{
	if (sNameSpaceUri == null)
		sNameSpaceUri = '';
	if (sQualifiedName == null)
		sQualifiedName = '';

	var doc=null;
	try
	{
		// DOM2
		if (document.implementation && document.implementation.createDocument)
		{
			doc = document.implementation.createDocument (sNameSpaceUri, sQualifiedName, oDoctype);
				
			// some versions of Moz do not support the readyState property
			// and the onreadystate event so we patch it!
			if (doc.readyState == null)
			{
				doc.readyState = 1;
				doc.addEventListener("load", function () {
					doc.readyState = 4;
					if (typeof doc.onreadystatechange == "function")
						doc.onreadystatechange ();
					}, false);
			}
			doc.selectionLanguage="XPath";				
		}
		
		if (window.ActiveXObject)
		{
			doc=new ActiveXObject(getControlPrefix ()+'.XmlDom');
			doc.setProperty("SelectionLanguage","XPath");
		}
		return doc;
	}
	catch (ex)
	{
		throw new Error ("Your browser does not support XmlDocument objects");
	}
};

XmlDocument.fromObject = function (o, nodeName, parentNode)
{
	if (o == null)
		return null;
	
	nodeName = nodeName == null || typeof nodeName != "string" ? "object" : nodeName;
	
	var xmlDoc = parentNode == null ? XmlDocument.create () : parentNode.ownerDocument;

	if (parentNode == null)
		parentNode = xmlDoc;

	var currentNode = addNode (parentNode, nodeName);
	
	for (var i in o)
	{
		if (typeof o[i] == 'object')
			XmlDocument.fromObject (o[i], i, currentNode);
		else
			addNode (currentNode, i, o[i]);
	}
	
	return xmlDoc;
};

XmlDocument.toObject = function (xmlNode)
{
	if (xmlNode == null || xmlNode.xml == null)
		return null;
	
	if (xmlNode.documentElement != null)
		xmlNode = xmlNode.documentElement;
	
	var returnObject = new Object ();
	
	for (var i = 0; i < xmlNode.childNodes.length; i++)
	{
		if (xmlNode.childNodes[i].nodeName == "#text")
			returnObject = xmlNode.childNodes[i].nodeValue;
		else if (xmlNode.childNodes[i].childNodes.length > 0)
			returnObject[xmlNode.childNodes[i].nodeName] = XmlDocument.toObject (xmlNode.childNodes[i]);
		else
			returnObject[xmlNode.childNodes[i].nodeName] = xmlNode.childNodes[i].nodeValue;
	}
	
	return returnObject;
};

function getControlPrefix ()
{
	if (getControlPrefix.prefix)
		return getControlPrefix.prefix;
		
	var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
	var o, o2;
	for (var i = 0; i < prefixes.length; i++)
	{
		try
		{
			// try to create the objects
			o = new ActiveXObject(prefixes[i] + ".XmlHttp");
			o2 = new ActiveXObject(prefixes[i] + ".XmlDom");
			return getControlPrefix.prefix = prefixes[i];
		}
		catch (ex) {};
	}
		
	throw new Error ("Could not find an installed XML parser");
}

if (document.implementation && document.implementation.createDocument)
{
	Document.prototype.loadXML = function (s)
	{
		// parse the string to a new doc   
		var doc2 = (new DOMParser()).parseFromString (s, "text/xml");
				
		// remove all initial children
		while (this.hasChildNodes ())
			this.removeChild (this.lastChild);
				    
		// insert and import nodes
		for (var i = 0; i < doc2.childNodes.length; i++)
			this.appendChild (this.importNode (doc2.childNodes[i], true));
	};
	
	Document.prototype.onreadystatechange = function () {
		if (this.readyState == 4)
			this.loadXML (this.xml); // doc.xml : String
	};
	
	Document.prototype.__defineGetter__("xml", function ()
	{
		return (new XMLSerializer ()).serializeToString (this);
	});
	
	Node.prototype.__defineGetter__("xml", function ()
	{
		return (new XMLSerializer ()).serializeToString (this);
	});

	Document.prototype.selectSingleNode = function (xpath)
	{
		var xpe = new XPathEvaluator ();
		var result = xpe.evaluate (xpath, this, xpe.createNSResolver (this), XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return result.singleNodeValue;
	};

	Node.prototype.selectSingleNode = function (xpath)
	{
		var xpe = new XPathEvaluator ();
		var result = xpe.evaluate (xpath, this, xpe.createNSResolver (this), XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return result.singleNodeValue;
	};

	Document.prototype.selectNodes = function (xpath)
	{
		var xpe = new XPathEvaluator ();
		var result = xpe.evaluate (xpath, this, xpe.createNSResolver (this), XPathResult.ANY_TYPE, null);
		
		var foundNodes = new Array ();
		
		while (res = result.iterateNext ())
		{
			foundNodes.push (res);
		}
		return foundNodes;
	};

	Node.prototype.selectNodes = function (xpath)
	{
		var xpe = new XPathEvaluator ();
		var result = xpe.evaluate (xpath, this, xpe.createNSResolver (this), XPathResult.ANY_TYPE, null);
		
		var foundNodes = new Array ();
		
		while (res = result.iterateNext ())
		{
			foundNodes.push (res);
		}
		return foundNodes;
	};

	Node.prototype.__defineGetter__("text", function ()
	{
		var returnValue = (this.firstChild != null && this.firstChild.nodeValue != null) ? this.firstChild.nodeValue : '';
		return returnValue;
	});
}

// Auxiliares

function addNode (parentNode, newNodeName, newNodeContent)
{
	if (parentNode == null || parentNode.xml == null)
		return null;
	
	var documentElement = parentNode.nodeName == '#document' ? parentNode : parentNode.ownerDocument;
	if (parentNode.documentElement != null)
		parentNode = parentNode.documentElement;
	
	var newNode = documentElement.createElement (newNodeName);
	parentNode.appendChild (newNode);

	if (newNodeContent != null)
		newNode.appendChild (documentElement.createTextNode (newNodeContent.toString ()));
	
	return newNode;
}

function Exception ()
{
	this.type = 'Exception';

	this.message;
	this.code;
	this.details;

	switch (Exception.arguments.length)
	{
		case 1:
			this.message = Exception.arguments[0] != '' ? Exception.arguments[0] : null;
		break;
		
		case 2:
			this.code = Exception.arguments[0] != '' ? Exception.arguments[0] : null;
			this.message = Exception.arguments[1] != '' ? Exception.arguments[1] : null;
		break;

		case 3:
			this.code = Exception.arguments[0] != '' ? Exception.arguments[0] : null;
			this.message = Exception.arguments[1] != '' ? Exception.arguments[1] : null;
			this.details = Exception.arguments[3] != '' ? Exception.arguments[3] : null;
		break;
		
		default:
			return;
		break;
	}
}

/*-------- IMPORT FROM ( Name [ JS_FILE_CORE_YUI ], Type [ H ], Class [ WebComponetVo ] ) --------*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){for(var D=0;D<C.length;D=D+1){var H=C[D],G=E[H];if(A.isFunction(G)&&G!=Object.prototype[H]){F[H]=G;}}}:function(){},extend:function(H,I,G){if(!I||!H){throw new Error("extend failed, please check that "+"all dependencies are included.");}var E=function(){};E.prototype=I.prototype;H.prototype=new E();H.prototype.constructor=H;H.superclass=I.prototype;if(I.prototype.constructor==Object.prototype.constructor){I.prototype.constructor=I;}if(G){for(var D in G){if(A.hasOwnProperty(G,D)){H.prototype[D]=G[D];}}A._IEEnumFix(H.prototype,G);}},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}A._IEEnumFix(H,G);}},augmentProto:function(G,F){if(!F||!G){throw new Error("Augment failed, verify dependencies.");}var D=[G.prototype,F.prototype];for(var E=2;E<arguments.length;E=E+1){D.push(arguments[E]);}A.augmentObject.apply(this,D);},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType" in D&&"tagName" in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},substitute:function(S,E,L){var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";for(;;){I=S.lastIndexOf(D);if(I<0){break;}H=S.indexOf(Q,I);if(I+1>=H){break;}F=S.substring(I+1,H);O=F;R=null;G=O.indexOf(M);if(G>-1){R=O.substring(G+1);O=O.substring(0,G);}P=E[O];if(L){P=L(O,P,R);}if(A.isObject(P)){if(A.isArray(P)){P=A.dump(P,parseInt(R,10));}else{R=R||"";var K=R.indexOf(J);if(K>-1){R=R.substring(4);}if(P.toString===Object.prototype.toString||K>-1){P=A.dump(P,parseInt(R,10));}else{P=P.toString();}}}else{if(!A.isString(P)&&!A.isNumber(P)){P="~-"+N.length+"-~";N[N.length]=F;}}S=S.substring(0,I)+P+S.substring(H+1);}for(I=N.length-1;I>=0;I=I-1){S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");}return S;},trim:function(D){try{return D.replace(/^\s+|\s+$/g,"");}catch(E){return D;}},merge:function(){var G={},E=arguments;for(var F=0,D=E.length;F<D;F=F+1){A.augmentObject(G,E[F],true);}return G;},later:function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=G,I,D;if(A.isString(L)){F=E[L];}if(!F){throw new TypeError("method undefined");}if(!A.isArray(J)){J=[G];}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);YAHOO.util.Lang=A;A.augment=A.augmentProto;YAHOO.augment=A.augmentProto;YAHOO.extend=A.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.6.0",build:"1321"});
/*-------- IMPORT FROM ( Name [ JS_FILE_EVENT_YUI ], Type [ H ], Class [ WebComponetVo ] ) --------*/
YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var K=[],E=this.subscribers.length;if(!E&&this.silent){return true;}var I=[].slice.call(arguments,0),G=true,D,J=false;if(!this.silent){}var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;for(D=0;D<E;++D){var M=C[D];if(!M){J=true;}else{if(!this.silent){}var L=M.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(I.length>0){B=I[0];}try{G=M.fn.call(L,B,M.obj);}catch(F){this.lastError=F;if(A){throw F;}}}else{try{G=M.fn.call(L,this.type,I,M.obj);}catch(H){this.lastError=H;if(A){throw H;}}}if(false===G){if(!this.silent){}break;}}}return(G!==false);},unsubscribeAll:function(){for(var A=this.subscribers.length-1;A>-1;A--){this._delete(A);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};var K=YAHOO.env.ua.ie?"focusin":"focus";var L=YAHOO.env.ua.ie?"focusout":"blur";return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){var M=this;var N=function(){M._tryPreloadAttach();};this._interval=setInterval(N,this.POLL_INTERVAL);}},onAvailable:function(R,O,S,Q,P){var M=(YAHOO.lang.isString(R))?[R]:R;for(var N=0;N<M.length;N=N+1){F.push({id:M[N],fn:O,obj:S,override:Q,checkReady:P});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(O,M,P,N){this.onAvailable(O,M,P,N,true);},onDOMReady:function(M,O,N){if(this.DOMReady){setTimeout(function(){var P=window;if(N){if(N===true){P=O;}else{P=N;}}M.call(P,"DOMReady",[],O);},0);}else{this.DOMReadyEvent.subscribe(M,O,N);}},_addListener:function(O,M,X,S,N,a){if(!X||!X.call){return false;}if(this._isValidCollection(O)){var Y=true;for(var T=0,V=O.length;T<V;++T){Y=this._addListener(O[T],M,X,S,N,a)&&Y;}return Y;}else{if(YAHOO.lang.isString(O)){var R=this.getEl(O);if(R){O=R;}else{this.onAvailable(O,function(){YAHOO.util.Event._addListener(O,M,X,S,N,a);});return true;}}}if(!O){return false;}if("unload"==M&&S!==this){J[J.length]=[O,M,X,S,N,a];return true;}var b=O;if(N){if(N===true){b=S;}else{b=N;}}var P=function(c){return X.call(b,YAHOO.util.Event.getEvent(c,O),S);};var Z=[O,M,X,P,b,S,N,a];var U=I.length;I[U]=Z;if(this.useLegacyEvent(O,M)){var Q=this.getLegacyIndex(O,M);if(Q==-1||O!=G[Q][0]){Q=G.length;B[O.id+M]=Q;G[Q]=[O,M,O["on"+M]];E[Q]=[];O["on"+M]=function(c){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(c),Q);};}E[Q].push(Z);}else{try{this._simpleAdd(O,M,P,a);}catch(W){this.lastError=W;this._removeListener(O,M,X,a);return false;}}return true;},addListener:function(O,Q,N,P,M){return this._addListener(O,Q,N,P,M,false);},addFocusListener:function(O,N,P,M){return this._addListener(O,K,N,P,M,true);},removeFocusListener:function(N,M){return this._removeListener(N,K,M,true);},addBlurListener:function(O,N,P,M){return this._addListener(O,L,N,P,M,true);},removeBlurListener:function(N,M){return this._removeListener(N,L,M,true);},fireLegacyEvent:function(Q,O){var S=true,M,U,T,V,R;U=E[O].slice();for(var N=0,P=U.length;N<P;++N){T=U[N];if(T&&T[this.WFN]){V=T[this.ADJ_SCOPE];R=T[this.WFN].call(V,Q);S=(S&&R);}}M=G[O];if(M&&M[2]){M[2](Q);}return S;},getLegacyIndex:function(N,O){var M=this.generateId(N)+O;if(typeof B[M]=="undefined"){return -1;}else{return B[M];}},useLegacyEvent:function(M,N){return(this.webkit&&this.webkit<419&&("click"==N||"dblclick"==N));},_removeListener:function(N,M,V,Y){var Q,T,X;if(typeof N=="string"){N=this.getEl(N);}else{if(this._isValidCollection(N)){var W=true;for(Q=N.length-1;Q>-1;Q--){W=(this._removeListener(N[Q],M,V,Y)&&W);}return W;}}if(!V||!V.call){return this.purgeElement(N,false,M);}if("unload"==M){for(Q=J.length-1;Q>-1;Q--){X=J[Q];if(X&&X[0]==N&&X[1]==M&&X[2]==V){J.splice(Q,1);return true;}}return false;}var R=null;var S=arguments[4];if("undefined"===typeof S){S=this._getCacheIndex(N,M,V);}if(S>=0){R=I[S];}if(!N||!R){return false;}if(this.useLegacyEvent(N,M)){var P=this.getLegacyIndex(N,M);var O=E[P];if(O){for(Q=0,T=O.length;Q<T;++Q){X=O[Q];if(X&&X[this.EL]==N&&X[this.TYPE]==M&&X[this.FN]==V){O.splice(Q,1);break;}}}}else{try{this._simpleRemove(N,M,R[this.WFN],Y);}catch(U){this.lastError=U;return false;}}delete I[S][this.WFN];delete I[S][this.FN];
I.splice(S,1);return true;},removeListener:function(N,O,M){return this._removeListener(N,O,M,false);},getTarget:function(O,N){var M=O.target||O.srcElement;return this.resolveTextNode(M);},resolveTextNode:function(N){try{if(N&&3==N.nodeType){return N.parentNode;}}catch(M){}return N;},getPageX:function(N){var M=N.pageX;if(!M&&0!==M){M=N.clientX||0;if(this.isIE){M+=this._getScrollLeft();}}return M;},getPageY:function(M){var N=M.pageY;if(!N&&0!==N){N=M.clientY||0;if(this.isIE){N+=this._getScrollTop();}}return N;},getXY:function(M){return[this.getPageX(M),this.getPageY(M)];},getRelatedTarget:function(N){var M=N.relatedTarget;if(!M){if(N.type=="mouseout"){M=N.toElement;}else{if(N.type=="mouseover"){M=N.fromElement;}}}return this.resolveTextNode(M);},getTime:function(O){if(!O.time){var N=new Date().getTime();try{O.time=N;}catch(M){this.lastError=M;return N;}}return O.time;},stopEvent:function(M){this.stopPropagation(M);this.preventDefault(M);},stopPropagation:function(M){if(M.stopPropagation){M.stopPropagation();}else{M.cancelBubble=true;}},preventDefault:function(M){if(M.preventDefault){M.preventDefault();}else{M.returnValue=false;}},getEvent:function(O,M){var N=O||window.event;if(!N){var P=this.getEvent.caller;while(P){N=P.arguments[0];if(N&&Event==N.constructor){break;}P=P.caller;}}return N;},getCharCode:function(N){var M=N.keyCode||N.charCode||0;if(YAHOO.env.ua.webkit&&(M in D)){M=D[M];}return M;},_getCacheIndex:function(Q,R,P){for(var O=0,N=I.length;O<N;O=O+1){var M=I[O];if(M&&M[this.FN]==P&&M[this.EL]==Q&&M[this.TYPE]==R){return O;}}return -1;},generateId:function(M){var N=M.id;if(!N){N="yuievtautoid-"+A;++A;M.id=N;}return N;},_isValidCollection:function(N){try{return(N&&typeof N!=="string"&&N.length&&!N.tagName&&!N.alert&&typeof N[0]!=="undefined");}catch(M){return false;}},elCache:{},getEl:function(M){return(typeof M==="string")?document.getElementById(M):M;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(N){if(!H){H=true;var M=YAHOO.util.Event;M._ready();M._tryPreloadAttach();}},_ready:function(N){var M=YAHOO.util.Event;if(!M.DOMReady){M.DOMReady=true;M.DOMReadyEvent.fire();M._simpleRemove(document,"DOMContentLoaded",M._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;clearInterval(this._interval);this._interval=null;return ;}if(this.locked){return ;}if(this.isIE){if(!this.DOMReady){this.startInterval();return ;}}this.locked=true;var S=!H;if(!S){S=(C>0&&F.length>0);}var R=[];var T=function(V,W){var U=V;if(W.override){if(W.override===true){U=W.obj;}else{U=W.override;}}W.fn.call(U,W.obj);};var N,M,Q,P,O=[];for(N=0,M=F.length;N<M;N=N+1){Q=F[N];if(Q){P=this.getEl(Q.id);if(P){if(Q.checkReady){if(H||P.nextSibling||!S){O.push(Q);F[N]=null;}}else{T(P,Q);F[N]=null;}}else{R.push(Q);}}}for(N=0,M=O.length;N<M;N=N+1){Q=O[N];T(this.getEl(Q.id),Q);}C--;if(S){for(N=F.length-1;N>-1;N--){Q=F[N];if(!Q||!Q.id){F.splice(N,1);}}this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;},purgeElement:function(Q,R,T){var O=(YAHOO.lang.isString(Q))?this.getEl(Q):Q;var S=this.getListeners(O,T),P,M;if(S){for(P=S.length-1;P>-1;P--){var N=S[P];this._removeListener(O,N.type,N.fn,N.capture);}}if(R&&O&&O.childNodes){for(P=0,M=O.childNodes.length;P<M;++P){this.purgeElement(O.childNodes[P],R,T);}}},getListeners:function(O,M){var R=[],N;if(!M){N=[I,J];}else{if(M==="unload"){N=[J];}else{N=[I];}}var T=(YAHOO.lang.isString(O))?this.getEl(O):O;for(var Q=0;Q<N.length;Q=Q+1){var V=N[Q];if(V){for(var S=0,U=V.length;S<U;++S){var P=V[S];if(P&&P[this.EL]===T&&(!M||M===P[this.TYPE])){R.push({type:P[this.TYPE],fn:P[this.FN],obj:P[this.OBJ],adjust:P[this.OVERRIDE],scope:P[this.ADJ_SCOPE],capture:P[this.CAPTURE],index:S});}}}}return(R.length)?R:null;},_unload:function(S){var M=YAHOO.util.Event,P,O,N,R,Q,T=J.slice();for(P=0,R=J.length;P<R;++P){N=T[P];if(N){var U=window;if(N[M.ADJ_SCOPE]){if(N[M.ADJ_SCOPE]===true){U=N[M.UNLOAD_OBJ];}else{U=N[M.ADJ_SCOPE];}}N[M.FN].call(U,M.getEvent(S,N[M.EL]),N[M.UNLOAD_OBJ]);T[P]=null;N=null;U=null;}}J=null;if(I){for(O=I.length-1;O>-1;O--){N=I[O];if(N){M._removeListener(N[M.EL],N[M.TYPE],N[M.FN],N[M.CAPTURE],O);}}N=null;}G=null;M._simpleRemove(window,"unload",M._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var M=document.documentElement,N=document.body;if(M&&(M.scrollTop||M.scrollLeft)){return[M.scrollTop,M.scrollLeft];}else{if(N){return[N.scrollTop,N.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(O,P,N,M){O.addEventListener(P,N,(M));};}else{if(window.attachEvent){return function(O,P,N,M){O.attachEvent("on"+P,N);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(O,P,N,M){O.removeEventListener(P,N,(M));};}else{if(window.detachEvent){return function(N,O,M){N.detachEvent("on"+O,M);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;EU.onFocus=EU.addFocusListener;EU.onBlur=EU.addBlurListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller */
if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};
var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(J,I){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(J.shiftKey==F.shift&&J.altKey==F.alt&&J.ctrlKey==F.ctrl){var G;if(F.keys instanceof Array){for(var H=0;H<F.keys.length;H++){G=F.keys[H];if(G==J.charCode){D.fire(J.charCode,J);break;}else{if(G==J.keyCode){D.fire(J.keyCode,J);break;}}}}else{G=F.keys;if(G==J.charCode){D.fire(J.charCode,J);}else{if(G==J.keyCode){D.fire(J.keyCode,J);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};YAHOO.register("event",YAHOO.util.Event,{version:"2.6.0",build:"1321"});
/*-------- IMPORT FROM ( Name [ JS_FILE_VP3SCRIPT ], Type [ H ], Class [ WebComponetVo ] ) --------*/
//Script VIP 3.0

/************************************** Constantes Flujo Confirmacion de Compra **************************************/

var STATUS_OK					= "OK";
var STATUS_PAB					= "PAB";

/************************************************** Init Functions ***************************************************/
// Flag para el cacheo de votacion de opiniones.
var voteRvwRand = -1;

// Flag para el uso de buttonLayer
var buttonStart = false;

// Fix cuotas
var flagQuotas=false;


function initBidButtons(){}
function initVip()
{
var buttonTop = document.getElementById("BidButtonTop");
var buttonBottom = document.getElementById("BidButtonBottom");

if(buttonTop)
	buttonTop.onclick=showLayer;
	
if(buttonBottom)
	buttonBottom.onclick=showLayer;

// Activo los botones
buttonStart = true

}
YAHOO.util.Event.onDOMReady(initVip);

 
/*********************************************Preguntas y respuestas**************************************************/
var makqQuesHwnd;
function makeQues(){
     
        //Este flag se encuentra el en objeto visual
        //VIP_LAYER_JS y determina si se utiliza o no
        //el camino de registraci�n integrada para la pregunta.
        //la variablie destQuest tambien se saca de VIP_LAYER_JS
        if (flagRegIntQuest) {
            showLayer(destQuest);
        } else {
     
	    if(makqQuesHwnd && !makqQuesHwnd.closed){
		makqQuesHwnd.focus();
		return;
	    }
            
            //Fix error!
            makqQuesHwnd = wOpen(getCurrentUrlBase()+"/jm/item?vip3=Y&act=showQuesForm&site="+valItemSite+"&id="+valItemId+"&visualId="+visualId+"", "", 740, 460, "no", "");

       }
}

function wOpen(pURL, pName, w, h, scroll, text, specialSettings){
	xLeft=(screen.width)?(screen.width-w)/2:0;
	xTop=(screen.height)?(screen.height-h)/2:0;
	xSettings = 'height='+h+',width='+w+',top='+xTop+',left='+xLeft+',scrollbars='+scroll+specialSettings
	hwnd = window.open(pURL,pName,xSettings);
	if(hwnd.window.focus){hwnd.window.focus();}
	if(text != "") {
		hwnd.document.write(text);
		hwnd.document.close();
	}
	return hwnd;
}

function getCurrentUrlBase(){
return "http://"+window.location.host;
}

/*
   Agrega Rows en Ver todas las preguntas
*/
function addRow(text, isFirst){
	var tbody = document.getElementById("bigQues");
	var newDiv = document.createElement("div");
	newDiv.innerHTML=text;
	
	if(isFirst == 'Y'){
		firstRow=tbody.firstChild;
		tbody.insertBefore(newDiv, firstRow);
	}else{
	tbody.appendChild(newDiv);
	}
}


 
/******************************************************* EOCS ********************************************************/
function setNick(str){
	if(document.all)window.document.all.Nickname.innerHTML=str;
		else window.document.getElementById("Nickname").innerHTML=str;
}

function setListButton(str){
	if(document.all)window.document.all.ListButton.innerHTML=str;
	else window.document.getElementById("ListButton").innerHTML=str;
}

function setCalifPercentage(str){
	if(document.all)window.document.all.CalifPercentage.innerHTML=str;
		else window.document.getElementById("CalifPercentage").innerHTML=str;
}

function setItemsSeller(str){
	if(document.all)window.document.all.ItemsSellerFrame.innerHTML=str;
		else window.document.getElementById("ItemsSellerFrame").innerHTML=str;
}

function setTimeLeft(str){

	if(str!=''){
	
		/* Se realiza el parseo desde javascript para no modificar codigo java */
		
		// Obtengo el texto "Finaliza en"
		var text = str.substring(0,str.indexOf(':') + 1);

		// Obtengo el time que queda para que finalize
		var date = str.substring(str.search(/[0-9]/) -1 + 1,str.indexOf('&'));
		
		// Obtengo la fecha de finalizacion
		var time = str.substring(str.indexOf('('),str.indexOf(')') + 1);
		
		var endtxt1 = document.getElementById("endtxt1");
		
		endtxt1.innerHTML=text;
		endtxt1.parentNode.style.display = '';
		
		var endtxt3 = document.getElementById("endtxt3");
		
		endtxt3.innerHTML= time;
		endtxt3.parentNode.style.display = '';

		var endtxt2 = document.getElementById("endtxt2");
		
		endtxt2.innerHTML= date + ' ' + endtxt2.innerHTML;
		endtxt2.parentNode.style.display = '';	
		
		// Remplazo inferior
		//var timeLeftBottom = document.getElementById("TimeLeftBottom");
		
		//timeLeftBottom.innerHTML=str;
		//timeLeftBottom.parentNode.style.display = '';		
		
		
	}		
}

 
/******************************************************* TABS ********************************************************/
	function getCookieValue(name) {
		var start=document.cookie.indexOf(name+"=");
		var len=start+name.length+1;
		if (start == -1) 
			return null;
		var end=document.cookie.indexOf(";",len);
		if (end==-1) 
			end=document.cookie.length;
		return unescape(document.cookie.substring(len,end));
	}

    /*
      Manejo propio de los Tabs 
    */
	function createLoadingHistDiv(urlImg, width, height, id){
		loadingImgT = document.getElementById("loadHistLoading"+id);
		divLoadingImgT = document.getElementById("divLoading"+id);
		
		if(loadingImgT != null)
			document.getElementById(id).removeChild(loadingImgT);
		if(divLoadingImgT != null)
			document.getElementById(id).removeChild(divLoadingImgT);
		
		divLoadingImgT = document.createElement("div");
		divLoadingImgT.id = "divLoading"+id;
		divLoadingImgT.style.textAlign = "center";
		
		loadingImgT = document.createElement("img");
		loadingImgT.id = "loadHistLoading"+id;
		loadingImgT.src = urlImg;
		
		divLoadingImgT.appendChild(loadingImgT);
		
		document.getElementById(id).appendChild(divLoadingImgT);
		document.getElementById(id).align = "center";
	}
	var theFirstTender = 0;
	var theFirstBuyer = 0;
    var theFirstOpinion = 0;
	var theFirstCatalog = 0;
		
  function showTab(tabId,groupTabName)
 {
		
		if ("Historialdeofertas" == tabId) 
		{
			if (theFirstTender == 0) 
			{
				createLoadingHistDiv("/org-img/vip3/layer/loading_small.gif", 32, 32, tabId);
				theFirstTender = 1;
			}
			
			historyTenderUrl = getCurrentUrlBase() + '/jm/item?';
			
			req 	= GetXmlHttpRequest(loadHistoryTenderDiv);
			
			historyTenderParams = 'vip3=Y&act=historyTender&site=' + valItemSite + '&id=' + valItemId;
			
			
			req.open("GET", historyTenderUrl+historyTenderParams, true);
			
									
			//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			//req.setRequestHeader("Content-length", historyTenderParams.length);
			
			//req.setRequestHeader("Connection", "close");
			
			req.send(null);
			
		}
		
		else if ("Calificacionesdecompradores" == tabId) 
		{
			if (document.getElementById("historyBuyer").con == null) 
				if (theFirstBuyer == 0) 
				{
					createLoadingHistDiv("/org-img/vip3/layer/loading_small.gif", 32, 32, tabId);
					theFirstBuyer = 1;
				}
			
			historyBuyerUrl = getCurrentUrlBase() + '/jm/item?';
			
			req 	= GetXmlHttpRequest(loadHistoryBuyerDiv);
			
			historyBuyerParams = 'vip3=Y&act=historyBuyer&site=' + valItemSite + '&id=' + valItemId;
			
			req.open("GET", historyBuyerUrl+historyBuyerParams, true);
			
			//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
								
			//req.setRequestHeader("Content-length", historyBuyerParams.length);
			
			//req.setRequestHeader("Connection", "close");
			
			req.send(null);
		}
		else if ("Opinionesdelproducto" == tabId)
		{
			if(theFirstOpinion == 0)
			{
				createLoadingHistDiv("/org-img/vip3/layer/loading_small.gif", 32, 32, tabId);
				theFirstOpinion = 1;
			}
			
			opinionUrl = getCurrentUrlBase() + '/jm/item?';
			
			req = GetXmlHttpRequest(loadReviewsDiv);
			
			opinionParams = 'vip3=Y&act=loadReviewsTab&site=' + valItemSite + '&id=' + productId + '&rand=' + voteRvwRand;
			
			req.open("GET", opinionUrl+opinionParams, true);
			
			//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			//req.setRequestHeader("Content-length", opinionParams.length);
			
			//req.setRequestHeader("Connection", "close");
			
			req.send(null);
		}
		else if ("Fichat�cnica" == tabId)
		{
			if(theFirstCatalog == 0)
			{
				createLoadingHistDiv("/org-img/vip3/layer/loading_small.gif", 32, 32, tabId);
				theFirstCatalog = 1;
			}
			
			catalogUrl = getCurrentUrlBase() + '/jm/item?';
			
			req = GetXmlHttpRequest(loadCatalogDiv);
			
			catalogParams = 'vip3=Y&act=loadCatalogTab&site=' + valItemSite + '&id=' + valItemId;
			
			req.open("GET", catalogUrl+catalogParams, true);
			
			//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			//req.setRequestHeader("Content-length", catalogParams.length);
			
			//req.setRequestHeader("Connection", "close");
			
			req.send(null);
		}
	    
	    var list = document.getElementById(groupTabName).childNodes;
	    
	    for(i=0; i< list.length; i++)
	    { //ocultamos todos 
			  if(list[i].tagName == "DIV")
			  	list[i].style.display='none'; 	
			} //hacemos visible el div 
		  
		  document.getElementById(tabId).style.display="block"; 
 }  
 	
	function loadCatalogDiv(){
			if (req.readyState == 4) {
				if (req.status == 200) {					
					
					document.getElementById("catalogTab").innerHTML = req.responseXML.getElementsByTagName("content")[0].childNodes[0].nodeValue;
										
					loadingImg = document.getElementById('divLoadingFichat�cnica');
					loadingImg.style.display = "none";
				}
			}
		}
	
	function loadReviewsDiv(){
		if (req.readyState == 4) {
			if (req.status == 200) {
				document.getElementById("reviewsTab").innerHTML = req.responseXML.getElementsByTagName("content")[0].childNodes[0].nodeValue;
				
				if (document.getElementById("reviewScript") == null) {
					var script = document.createElement('script');
					script.id = "reviewScript";
					script.text = req.responseXML.getElementsByTagName("script")[0].childNodes[0].nodeValue;
					document.getElementsByTagName('head').item(0).appendChild(script);
				}
				/*
				if (document.getElementById("dwrUtil") == null) {
					var scriptDWR1 = document.createElement('script');
					scriptDWR1.id = "dwrUtil";
					scriptDWR1.src = urlBase + "/dwr/util.js";
					document.getElementsByTagName('head').item(0).appendChild(scriptDWR1);
				}
				
				if (document.getElementById("dwrEngine") == null) {
					var scriptDWR4 = document.createElement('script');
					scriptDWR4.id = "dwrEngine";
					scriptDWR4.src = urlBase + "/dwr/engine.js";
					document.getElementsByTagName('head').item(0).appendChild(scriptDWR4);
				}
				*/
				if (document.getElementById("dwrReview") == null) {
					var scriptDWR3 = document.createElement('script');
					scriptDWR3.id = "dwrReview";
					scriptDWR3.src = urlBase + "/dwr/interface/ReviewsDwr.js";
					scriptDWR3.onload = setDwrPath;
					document.getElementsByTagName('head').item(0).appendChild(scriptDWR3);
				}
							
				loadingImg = document.getElementById('divLoadingOpinionesdelproducto');
				loadingImg.style.display = "none";
			}
		}
	}
	
	function setDwrPath(){
		ReviewsDwr._path = urlBase + '/dwr';
	}
    
	function loadHistoryTenderDiv(){
		 if(req.readyState == 4) {
    		if(req.status == 200) {
      			document.getElementById("historyTender").innerHTML = req.responseText;
				loadingImg = document.getElementById('divLoadingHistorialdeofertas');
				loadingImg.style.display="none";
    		}
		}
	}
	
	function loadHistoryBuyerDiv(){
		 if(req.readyState == 4) {
    		if(req.status == 200) {
      			document.getElementById("historyBuyer").innerHTML = req.responseText;
				loadingImg = document.getElementById('divLoadingCalificacionesdecompradores');
				loadingImg.style.display="none";
    		}
		}
	}
    
    /*
    Cambia los Estilos de las Solapas
    */
    function cambiarEstilos(elementId, index, groupHeadersName)
    {
    	var list = document.getElementsByTagName('LI');
    	
     	tab = document.getElementById(elementId);
    	
    	if(tab!=null)
    	{
	    	for(i=0; i< list.length; i++){ //ocultamos todos 
				  
				  if(list[i].id == 'current' && list[i].getAttribute('group')==groupHeadersName)
				  	list[i].id = current[index].id;
				}
	    	
	    	current[index] = tab.cloneNode(false);
	    	
	    	tab.id = 'current';
	    	}
    }
    
    /*
    Setea las solapas configuradas como default
    */
    function setDefaultTabs()
    {    	
    	var list = document.getElementsByTagName('LI');
    	
	   	for(i=0; i< headers.length; i++)
    	{     	 		
					var flag = true
  	 		
     	 		for(j=0; j< list.length; j++){
     	 			
     	 			var node = list[j];
     	 			
     	 			if(node.id == trim(defaultTabs[i]) && flag)
     	 			{
     	 				current[i]=node.cloneNode(false);
  	  				node.id='current';
  	  				flag = false;
  	  			}  	  				
  	  		}
    	}
    }   
    
    /*
    Limpia carateres no v�lidos para los IDs
    */
     
    function trim(JSvalue) {
	var JStemp = JSvalue;
	var JSobj = /(\s+)/;
		while (JSobj.test(JStemp)) { 
			JStemp = JStemp.replace(JSobj, ''); 
		}
	return JStemp;
    } 

 
/***************************************************** MercadoPago ***************************************************/
var mpagoHwnd;
function mediosPago(monto,moneda){
	if(mpagoHwnd && !mpagoHwnd.closed){
		mpagoHwnd.focus();
		return;
	}
	var urlGo = getCurrentUrlBase()+ "/jm/ml.mpago.PopUpMedios?amount=" + monto + "&mda=" + moneda;
	mpagoHwnd = wOpen(urlGo , "Costo",390,509,"no","");
}

 
/******************************************************** AJAX *******************************************************/
/* XML Http Request */

function GetXmlHttpRequest (handler, isDebugEnabled) 
{
	var req=false;
	
	//para MZ
	if(window.XMLHttpRequest)	{
		try {
			req = new XMLHttpRequest();
		}catch(e){
			req = false;
			if (debugEnabled)
				debug(e);
		}
	} 
	
	// para IE
	else if(window.ActiveXObject) {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e) {
			try{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e) {
				req = false;
				if (debugEnabled)
					debug(e);
			}
		}
	}
	
	if(req) {
		req.onreadystatechange = handler;
	}

	return req;
}

 
/******************************************************** Acciones ***************************************************/
 
var enLaMiraHwnd;
function enLaMira(site_id,item_id){
	if(enLaMiraHwnd && !enLaMiraHwnd.closed){
		enLaMiraHwnd.focus();
		return;
	}
	enLaMiraHwnd = wOpen(document.getElementsByTagName('base')[0].href+"org_lst_lib.add_watch?as_site_id="+valItemSite+"&as_item_id="+valItemId+"", "",740,460,"yes","");
}

var popUpHwnd;
function mailPopUp(){
	if(popUpHwnd && !popUpHwnd.closed){
		popUpHwnd.focus();
		return;
	}
	popUpHwnd = wOpen(document.getElementsByTagName('base')[0].href+"org_mail_friend_new.show_form?as_site_id="+valItemSite+"&as_item_id="+valItemId+"", 
		"", 550, 490, "no", "");
}

var helpHwnd;
function help(hCode){
	if(helpHwnd && !helpHwnd.closed){
		helpHwnd.focus();
		return;
	}
	helpHwnd = wOpen(document.getElementsByTagName('base')[0].href+"org_help.go2?as_site_id="+valItemSite+"&as_help_id="+hCode, "", 380, 250, "yes", "");
}


chfix = true;

function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function strTrim(str) {
	return ltrim(rtrim(str,""),"");
}


function validate(logged,quotes)
{

if(!chfix){
return;
}
	
	ofertarUrl 	= getCurrentUrlBase() + '/jm/ConfirmBid';

     if (typeof(atlasPoolSufix) != "undefined"){
		ofertarUrl += "?" + atlasPoolSufix; 	
	}
	
	reques 	= GetXmlHttpRequest(processValidationChange);
	
	reques.open("POST", ofertarUrl, true);
	
	reques.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	
	var as_price = "";
	var as_es_autoof = "";
	
	if(document.f.as_price)
	 as_price = document.f.as_price.value;
	else
	 as_price = document.getElementById('as_price').value;
	
	if(document.f.as_es_autoof)
		as_es_autoof = document.f.as_es_autoof.value;
	else
	{
		if(document.getElementById('as_es_autoof_chk').checked)
			as_es_autoof = "Y";
		else
			as_es_autoof = "N";
	}
	
	if(document.f.as_confirm)
		as_confirm = document.f.as_confirm.value;
		
	if(document.f.as_npb_confirm)
		as_npb_confirm = document.f.as_npb_confirm.value;
	

	var paymentQS= quotes?'&quotas_string=' + document.f.it_n.value + '-' + myMethod + '-' + myQuotas + '-' +  myAmount:"";



	if(logged!=true)
	{		
		ofertarParams = 'it_s=' + document.f.it_s.value + '&it_n=' + document.f.it_n.value + '&as_price=' + as_price + 
	  '&as_info=' + document.f.as_info.value + '&as_es_autoof=' + as_es_autoof + '&as_quantity=' + document.getElementById('as_quantity').value + 
	  '&as_ip=' + document.f.as_ip.value + '&as_internal_id=' + document.f.as_internal_id.value + '&as_user=' + encodeURIComponent(strTrim(document.f.as_user.value)) +
          '&axn=doBid' + paymentQS;
		  
		/*NAP 
		   Ahora el pass solo se hashea en caso de no estar en la pagina de Confirmacion de la Oferta
		*/
		if(isConfirmView()){
			if (useSecureBid()) {
				ofertarParams += '&as_ph=' + document.f.as_ph.value;
				ofertarParams += '&as_kh=' + document.f.as_kh.value;
				
			}

			if (sendPassword()) {
				ofertarParams += '&as_pass=' + encodeURIComponent(document.f.as_ph.value); 
			}
		
		}else{
			if (useSecureBid()) {
				var k = Math.floor(Math.random() * 1000001);
				ofertarParams += '&as_ph=' + hideString(k, document.f.it_n.value.toString() + document.f.as_pass.value.toUpperCase());
				ofertarParams += '&as_kh=' + k.toString();
			}

			if (sendPassword()) {
				ofertarParams += '&as_pass=' + encodeURIComponent(document.f.as_pass.value); 
			}
		}
		/*FIN NAP*/
		
	    if(document.f.as_confirm)
	      ofertarParams+='&as_confirm='+as_confirm;
	   
	    if(document.f.as_npb_confirm)
	       ofertarParams+='&as_npb_confirm='+as_npb_confirm;
		
		reques.setRequestHeader("Content-length", ofertarParams.length);
		reques.setRequestHeader("Connection", "close");
		
		if(chfix){
		  reques.send(ofertarParams);
			chfix = false;
		}
	}
	else
	{
		ofertarLoggedParams = 'it_s=' + document.f.it_s.value + '&it_n=' + document.f.it_n.value + '&as_price=' + as_price + 
	  '&as_info=' + document.f.as_info.value + '&as_es_autoof=' + as_es_autoof + '&as_quantity=' + document.getElementById('as_quantity').value + 
	  '&as_ip=' + document.f.as_ip.value + '&as_internal_id=' + document.f.as_internal_id.value + paymentQS;
	
		if(document.f.as_user && document.f.as_pass && !isConfirmView())
		{
			ofertarLoggedParams+='&as_user=' + encodeURIComponent(document.f.as_user.value);

				if (useSecureBid()) {
					var k = Math.floor(Math.random() * 1000001);
						ofertarLoggedParams += '&as_ph=' + hideString(k, document.f.it_n.value.toString() + document.f.as_pass.value.toUpperCase());
						ofertarLoggedParams += '&as_kh=' + k.toString();
				}

				if (sendPassword()) {
					ofertarLoggedParams+='&as_pass=' + encodeURIComponent(document.f.as_pass.value);
				}
			/*FIN NAP*/

			ofertarLoggedParams+='&axn=doBid';

		}else{
			if(isConfirmView()){
				ofertarLoggedParams+='&as_sec_hash=' + encodeURIComponent(NAPValue) + '&axn=validate';
			}else{
				ofertarLoggedParams+='&as_sec_hash=' + encodeURIComponent(document.f.as_sec_hash.value) + '&axn=validate';
			}
		}
			
		if(document.getElementById('as_confirm'))
			as_confirm = document.f.as_confirm.value;
		
		if(document.getElementById('as_npb_confirm'))
			as_npb_confirm = document.f.as_npb_confirm.value;
			
		if(document.f.as_confirm)
		   ofertarLoggedParams+='&as_confirm='+as_confirm;
		   
		if(document.f.as_npb_confirm)
		   ofertarLoggedParams+='&as_npb_confirm='+as_npb_confirm;
			
		reques.setRequestHeader("Content-length", ofertarLoggedParams.length);
		reques.setRequestHeader("Connection", "close");
		
		if(chfix){
		reques.send(ofertarLoggedParams);
			chfix = false;
		}
			
	}
}

function processValidationChange() {
  if (reques.readyState == 4) {
    if (reques.status == 200) {
      processValidation();
    } else {
      	chfix = true;
       // TODO: Loguear y redirigir a vista de error!
    }
  }
}

function processValidation()
{
	try	{
		
		//Intentamos levantar la respuesta Xml
		var xml = reques.responseXML;
		
		var messageType = xml.getElementsByTagName("type")[0].childNodes[0].nodeValue;
		//Si el tipo es error se refresca el layer con el error
		if(messageType==ERROR_MESSAGE) {
  	document.getElementById('rcontent').innerHTML = xml.getElementsByTagName("message")[0].childNodes[0].nodeValue;
  	readjustContent();
  	}
  	//Si el tipo es warning
  	else if (messageType==WARNING_MESSAGE) {
  		warning = document.getElementById('errWarning');
  		warning.style.display="block";
  		warning.innerHTML = xml.getElementsByTagName("message")[0].childNodes[0].nodeValue;
  		document.onkeydown=processKey;
  	}
  	else if (messageType==VALIDATED_MESSAGE) {
  		
  		var sequence = xml.getElementsByTagName("sequence")[0].childNodes[0].nodeValue;
  		var desc 		 = xml.getElementsByTagName("description")[0].childNodes[0].nodeValue;
  		
  		if(desc==STATUS_OK)
  			getSellerInfo(sequence);
  		
  		else if(desc==STATUS_PAB)
  			pabItemView();
	} /* FAD - Inicio - NAP VIP3 Captcha*/
	else if(messageType==REDIR_LOGIN_TYPE) {
		//lo redirecciono al login seguro
		window.location.href = xml.getElementsByTagName("message")[0].childNodes[0].nodeValue;
		/* FAD - Fin - NAP VIP3 Captcha */
	}
	/*PNL - Remedy Center - Redirect Verificacion Telefonica*/
	else if(messageType==REDIR_VERI_TEL) {
		//lo redirecciono a la verificacion telefonica
		goToVerifTel(xml.getElementsByTagName("message")[0].childNodes[0].nodeValue);
		
	}
  	/*PNL - Remedy Center - Redirect Verificacion Telefonica*/
	
	}
	//Si no volvio un Xml es que ocurrio una exception no controlada, mostramos la pantalla de error.
	catch(e) {  
  	document.body.innerHTML = reques.responseText;
  }
  chfix = true;
}

function getSellerInfo(sequence)
{
	var as_price = "";
	var as_es_autoof = "";
	
	if(document.f.as_user.value){
		document.f.as_user.value = strTrim(document.f.as_user.value);
		document.f.user.value = document.f.as_user.value;
	}
	
	if(document.f.as_pass){
		/**NAP BugFix:Pass en Confimar Oferta**/
		if(isConfirmView()){
			document.f.password.value = NAPValue;
			document.f.as_pass.value = NAPValue;
		}else{
			document.f.password.value = document.f.as_pass.value;
		}
	}
	
	if(document.f.as_price)
	 as_price = document.f.as_price.value;
	else
	 as_price = document.getElementById('as_price').value;

	 if(document.f.as_es_autoof)
		as_es_autoof = document.f.as_es_autoof.value;
	else
	{
		if(document.getElementById('as_es_autoof_chk').checked)
			as_es_autoof = "Y";
		else
			as_es_autoof = "N";
	}
	
/*NAP*/
var secureCongratsPage = null;
	
if (useSecureBid()) {
	secureCongratsPage = urlJSSL + 'CongratsPage?';
}
/*FIN NAP*/
	
	var urlBaseForCongrats = urlBaseSite;
	if (typeof(urlBaseAtlas) != "undefined" && urlBaseAtlas != ""){
		urlBaseForCongrats = urlBaseAtlas;	
	}

	/*NAP*/
	if (useSecureBid()) {
		var trCookie = getCookieValue("tr_cookie");
		if(typeof(trCookie) != "undefined" && trCookie != "") {
			document.f.as_ip.value = getCookieValue("tr_cookie");
		}
	}
	/*FIN NAP*/

	if(document.f.as_es_autoof)
	{
		document.f.as_es_autoof.value = as_es_autoof;

/*NAP*/
if (useSecureBid()) {
	document.f.action = secureCongratsPage + "as_quantity=" + document.getElementById('as_quantity').value + "&sequence=" + sequence;
} else {
	document.f.action = urlBaseForCongrats + "jm/CongratsPage?as_quantity=" + document.getElementById('as_quantity').value + "&sequence=" + sequence;
}
/*FIN NAP*/
	}
	else
	{
/*NAP*/
if (useSecureBid()) {
	document.f.action = secureCongratsPage + "as_quantity=" + document.getElementById('as_quantity').value + "&sequence=" + sequence + "&as_es_autoof=" + as_es_autoof + "&as_price=" + as_price;	
} else {
	document.f.action = urlBaseForCongrats + "jm/CongratsPage?as_quantity=" + document.getElementById('as_quantity').value + "&sequence=" + sequence + "&as_es_autoof=" + as_es_autoof + "&as_price=" + as_price;	
}
/*FIN NAP*/

	}

/* FAD - Inicio - NAP VIP3 Captcha*/
	var atlasBidCookie = getCookieValue("orghash_bid");
	if (atlasBidCookie != null) {
		document.f.action += "&orghash_bid=" + atlasBidCookie;
	}
/* FAD - Fin - NAP VIP3 Captcha*/

if (typeof(atlasPoolSufix) != "undefined" && atlasPoolSufix != ""){
		document.f.action += "&" + atlasPoolSufix;	
}	

	document.f.submit();
}
/*PNL - Remedy Center - Redirect Verificacion Telefonica*/
function goToVerifTel(verifTelURL){
	if(document.f.as_user.value){
		document.f.as_user.value = strTrim(document.f.as_user.value);
		document.f.user.value = document.f.as_user.value;
	}
	if(document.f.as_pass){
		document.f.password.value = document.f.as_pass.value;
	}
	document.f.action = verifTelURL
	document.f.submit();
}
/*PNL - Remedy Center - Redirect Verificacion Telefonica*/
function pabItemView()
{
	var as_price = "";
	var as_es_autoof = "";
	
	if(document.f.as_user.value)
		document.f.user.value = document.f.as_user.value;
	
	if(document.f.as_pass)
		document.f.password.value = document.f.as_pass.value;
	
	if(document.f.as_price)
	 as_price = document.f.as_price.value;
	else
	 as_price = document.getElementById('as_price').value;

	 if(document.f.as_es_autoof)
		as_es_autoof = document.f.as_es_autoof.value;
	else
	{
		if(document.getElementById('as_es_autoof_chk').checked)
			as_es_autoof = "Y";
		else
			as_es_autoof = "N";
	}
	
	if(document.f.as_es_autoof)
	{
		document.f.as_es_autoof.value = as_es_autoof;
		document.f.action = urlBaseSite + "jm/ConfirmBid?as_quantity=" + document.getElementById('as_quantity').value + "&axn=pabItem";
	}
	else
	{
		document.f.action = urlBaseSite + "jm/ConfirmBid?as_quantity=" + document.getElementById('as_quantity').value + "&as_es_autoof=" + as_es_autoof + "&as_price=" + as_price + "&axn=pabItem";	
	}
	
	document.f.submit();
}

 
/******************************************************** historial compradores/ofertas ******************************/
 

function showHistoryBuyer(pageNumber){
	addEvent(window, 'resize', readjustContent);
    addEvent(window, 'scroll', readjustContent);

    createDimmerDiv();
	if(contentIsEnabled) 
		createDynamicContent(img_src, loading_width, loading_height, getCurrentUrlBase() + "/jm/item?vip3=Y&act=showHistoryBuyer&site="+ valItemSite + "&id="+ valItemId+"&from="+pageNumber, '650px');
}

function showHistoryTender(pageNumber){
	addEvent(window, 'resize', readjustContent);
    addEvent(window, 'scroll', readjustContent);

    createDimmerDiv();
	if(contentIsEnabled) 
		createDynamicContent(img_src, loading_width, loading_height, getCurrentUrlBase() + "/jm/item?vip3=Y&act=showHistoryTender&site="+ valItemSite + "&id="+ valItemId+"&from="+pageNumber, '650px');
}

 
/******************************************** Iframe de mas items del vendedor ***************************************/
function getSellerItems(urlContent){

	//Si no esta el div no ejecuto la llamada de ajax
	if(document.getElementById("ItemsSellerFrame")){

		url 	= urlContent;
		reques 	= GetXmlHttpRequest(processSellerItemsChange);
		
		reques.open("GET", url, true);
		reques.send(null);
	
	}
}
function processSellerItemsChange()
{
   if (reques.readyState == 4) {
    if (reques.status == 200) {
    	responseXML = reques.responseXML;
      processSellerItems();
    
    } else {
       // TODO: Loguear y redirigir a vista de error!
    }
  }
}

function processSellerItems() {
	
        //Obtenemos el XML de respuesta
	var xml = responseXML;
	
	if (xml.getElementsByTagName("template").length!=0){
	//Obtenemos el template que vamos a mostrar
	var template = xml.getElementsByTagName("template")[0].childNodes[0].nodeValue;
	
	// Obtenemos los datos para mostrar
	var quantity = xml.getElementsByTagName("quantity")[0].childNodes[0].nodeValue;
	var label    = xml.getElementsByTagName("label")[0].childNodes[0].nodeValue;
	var link     = xml.getElementsByTagName("link")[0].childNodes[0].nodeValue;
	
	var items  = 	xml.getElementsByTagName("item");
	
	// Reemplazamos las variables en el template
	var replacedTemplate = template.replace('##LBL_SELLER_ITEMS##', label);
	replacedTemplate = replacedTemplate.replace('##LNK_SHOW_MORE##', link);
	
	var itemsCounter = 0;
	var itemsAppended = 1;	
	
	while(itemsCounter<items.length && itemsAppended<=quantity)
	{
			var itemID  = items[itemsCounter].getElementsByTagName("id")[0].childNodes[0].nodeValue;
			var content  = items[itemsCounter].getElementsByTagName("content")[0].childNodes[0].nodeValue;
						
			if(valItemId!=itemID)
			{
				var variableID = "##DATA_ITEM" + itemsAppended + "##";
				
				replacedTemplate = replacedTemplate.replace(variableID, content);				
				itemsAppended++;
			}
			
			itemsCounter++;
	}
	
	for(var i=itemsAppended; i < quantity + 1; i++)
	{
	      var variableID = "##DATA_ITEM" + i + "##";
	      replacedTemplate = replacedTemplate.replace(variableID, "");				
	}
		
	// Pegamos el template reemplazado en el documento
	setItemsSeller(replacedTemplate);
	}
	

}

/**
	NAP:Funcion que verifica si venimos desde el Confirmar Oferta
**/
function isConfirmView(){
  /**
	NAP: Se obtiene el objeto , para veriificar si estamos en la vista de Confirmar Ofertar
  **/
	var	confirmView = document.f.as_confirm_view;
	
	if(confirmView != null){
		if(confirmView.value == 'Y'){
			return true;
		}else{
			return false;
		}
	}
}
/*-------- IMPORT FROM ( Name [ JS_FILE_VP3SCRIPT2 ], Type [ H ], Class [ WebComponetVo ] ) --------*/
/****************Funciones para CWS*********************/
/**
Muestra el form de denunciar pregunta
*/
function showDenunForm(questID,denunType)
{
	var dnun_src = getCurrentUrlBase() + '/jm/com.mercadolibre.web.endUser.cws.DenounceForm?axn=defaultAnsQues&vp3=Y&item_id='+valItemId +'&siteID='+valItemSite+'&qa_id='+questID+'&type_id='+denunType ;

	addEvent(window, 'resize', readjustContent);
	addEvent(window, 'scroll', readjustContent);
	//Creamos el DIMMER
	
	createDimmerDiv();
	//Creamos el contenido dinamico
	//si quieren modificar el ancho del form modificar esto cnt_width
	createDynamicContent(img_src, loading_width, loading_height, dnun_src, '600px');
}

/**
Denuncia la Pregunta/respuesta
*/
function doDenounce()
{
//inicio modificacion Nahuel
	for (i=0;i<document.fDenun.tipo_denuncia.length;i++)
{
      if (document.fDenun.tipo_denuncia[i].checked)
      {
             var type_denounce_value = document.fDenun.tipo_denuncia[i].value;
		break;
      }
}
var comment=document.fDenun.type_denounce_others ? document.fDenun.type_denounce_others.value : 'N';
//fin agregado Nahuel

//agregado Rubio Nahuel
if(document.fDenun.isShowDP.value =='Y' && type_denounce_value!='otros'){
	i=i+1;
	if(document.fDenun.type_id.value=="ANSW"){
	var commentID=type_denounce_value==null?document.fDenun.tipo_denuncia.value:type_denounce_value; 
	commentID=commentID +'Core'+'A'+i;
	}else{
	var commentID=type_denounce_value==null?document.fDenun.tipo_denuncia.value:type_denounce_value;
	commentID=commentID+'Core'+'Q'+i;
	}
	comment=document.getElementById(commentID).innerHTML;
}else if(document.fDenun.isShowDP.value =='N' && type_denounce_value!='otros'){
	i=i+1;
	if(document.fDenun.type_id.value=="ANSW"){
		var commentID=type_denounce_value==null?document.fDenun.tipo_denuncia.value:type_denounce_value;
		commentID=commentID+'Res'+'A'+i;
	}else{
		var commentID=type_denounce_value==null?document.fDenun.tipo_denuncia.value:type_denounce_value;
		commentID=commentID+'Res'+'Q'+i;
	}
	comment=document.getElementById(commentID).innerHTML;
}
//fin agregado
	//agregado Nahuel Rubio
	type_denounce_value= type_denounce_value==null?document.fDenun.tipo_denuncia.value:type_denounce_value;
	//fin agregado
	denounceUrl = getCurrentUrlBase() +'/jm/com.mercadolibre.web.endUser.cws.DenounceForm';
	
	reques 	= GetXmlHttpRequest(processDenounceChange);
	
	
	denounceParams = 'customKey='+document.fDenun.customKey.value + '&secureId='+document.fDenun.secureId.value+ '&item_id='+document.fDenun.item_id.value+ '&siteID='+document.fDenun.siteID.value+ '&isShowDP='+document.fDenun.isShowDP.value+ '&type_id='+document.fDenun.type_id.value+ '&qa_id='+document.fDenun.qa_id.value+ '&axn=denounce_ans_ques'+ '&captcha='+document.fDenun.captcha.value+ '&txt_description='+document.fDenun.txt_description.value+ '&tipo_denuncia='+type_denounce_value+ '&isshowlogin='+(isShowLogin ? 'Y' : 'N')+'&as_pass=' + document.fDenun.as_pass.value + '&as_user=' + document.fDenun.as_user.value+'&type_denounce_others=' + comment;
	
	
	reques.open("POST", denounceUrl, true);
	
	reques.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		
	reques.setRequestHeader("Content-length", denounceParams.length);
	reques.setRequestHeader("Connection", "close");
	reques.send(denounceParams);
}

/**
Denuncia ITM
*/
function doDenounceItm()
{
	//inicio modificacion Nahuel
	for (i=0;i<document.fDenun.tipo_denuncia.length;i++)
{
      if (document.fDenun.tipo_denuncia[i].checked)
      {
             var type_denounce_value = document.fDenun.tipo_denuncia[i].value;
      }
}
	//fin modificacion Nahuel
	
	
	denounceUrl = 'com.mercadolibre.web.endUser.cws.DenounceForm';
	
	reques 	= GetXmlHttpRequest(processDenounceChangeItm);
	
	if(!isShowLogin){
		denounceParams = 'customKey='+document.fDenun.customKey.value + '&secureId='+document.fDenun.secureId.value+ '&item_id='+document.fDenun.item_id.value+ '&siteID='+document.fDenun.siteID.value+ '&isShowDP='+document.fDenun.isShowDP.value+ '&type_id='+document.fDenun.type_id.value+ '&qa_id='+document.fDenun.qa_id.value+ '&axn=denounce_item'+ '&captcha='+document.fDenun.captcha.value+ '&txt_description='+document.fDenun.txt_description.value+ '&tipo_denuncia='+type_denounce_value+ '&isshowlogin='+(isShowLogin ? 'Y' : 'N');
	}else{
		denounceParams = 'customKey='+document.fDenun.customKey.value + '&secureId='+document.fDenun.secureId.value+ '&item_id='+document.fDenun.item_id.value+ '&siteID='+document.fDenun.siteID.value+ '&isShowDP='+document.fDenun.isShowDP.value+ '&type_id='+document.fDenun.type_id.value+ '&qa_id='+document.fDenun.qa_id.value+ '&axn=denounce_item'+ '&captcha='+document.fDenun.captcha.value+ '&txt_description='+document.fDenun.txt_description.value+ '&tipo_denuncia='+type_denounce_value+ '&isshowlogin='+(isShowLogin ? 'Y' : 'N')+'&as_pass=' + document.fDenun.as_pass.value + '&as_user=' + document.fDenun.as_user.value;
	}
	
	
	reques.open("POST", denounceUrl, true);
	
	reques.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		
	reques.setRequestHeader("Content-length", denounceParams.length);
	reques.setRequestHeader("Connection", "close");
	reques.send(denounceParams);
}


/*
Procesa el regreso de la denuncia
*/
function processDenounceChange() {
  if (reques.readyState == 4) {
    if (reques.status == 200) {
      processDenounce();
    } else {
       // TODO: Loguear y redirigir a vista de error!
    }
  }
}

/*
Refresca en el layer el valor devuelto por el servlet
*/
function processDenounce()
{
	try	{
		
	//Intentamos levantar la respuesta Xml
	var xml = reques.responseXML;
		
	//var messageType = xml.getElementsByTagName("type")[0].childNodes[0].nodeValue;
	 
	
	//trae el mensaje que devolvi� el request al servlet
	//if(messageType==VALIDATED_MESSAGE) {
  	     document.getElementById('rcontent').innerHTML = xml.getElementsByTagName("content")[0].childNodes[0].nodeValue;
  	     readjustContent();
  	//}
  	
  	//Si el tipo es warning muestra un error de campo ej. error en captcha.
  	/*
  	else if (messageType==ERROR_MESSAGE) {
  		warning = document.getElementById('errWarning');
  		warning.style.display="block";
  		warning.innerHTML = xml.getElementsByTagName("message")[0].childNodes[0].nodeValue;
  	}
    	*/  	
	}
	//Si no volvio un Xml es que ocurrio una exception no controlada, mostramos la pantalla de error.
	catch(e) {  
  	document.body.innerHTML = reques.responseText;
  }
}

function moveToHist(tabId){
	//showTab(tabId, 'CommunityCont');
	cambiarEstilos('H'+tabId, 1, 'Community');
	position = getAbsoluteElementPosition('Community');
	showTab(tabId, 'CommunityCont');
	window.scroll(0, position.top);
}


/**************** Funciones para Cuotas *********************/

var flagQuotas = false;

var myMethod = '';
var myQuotas = '';
var myAmount = '';

/**
 * Obtiene todos los elementos de un tipo de un Objeto del dom
 */
function getElementsByTagNames(list,obj) {
	if (!obj) var obj = document;
	var tagNames = list.split(',');
	var resultArray = new Array();
	for (var i=0;i<tagNames.length;i++) {
		var tags = obj.getElementsByTagName(tagNames[i]);
		for (var j=0;j<tags.length;j++) {
			resultArray.push(tags[j]);
		}
	}
	var testNode = resultArray[0];
	if (!testNode) return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a,b) {
				return a.sourceIndex - b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a,b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
}

/**
 * Muestra la quotas seleccionadas para un monto
 */
function showQuotas(amount)
{
		
	var dnun_src = getCurrentUrlBase() +  '/jm/item?act=showPayLayer&vip3=y&amount=' + amount + '&quotas=' + myQuotas + '&paymethod=' + myMethod + '&itemId='+valItemId+ '&siteId='+valItemSite;

	addEvent(window, 'resize', readjustContent);
	addEvent(window, 'scroll', readjustContent);
	//Creamos el DIMMER
	
	createDimmerDiv();
	//Creamos el contenido
	//si quieren modificar el ancho del form modificar esto cnt_width
	createDynamicContent(img_src, loading_width, loading_height, dnun_src, sizeQuotas + 'px');
	
	//readjustContent();
	return ;
}

/**
 * Seleccion de cuotas
 */
function checkQuotas(quotas,amount){
	myQuotas = quotas;
	myAmount = amount;
}

/**
 * Titulo de las pantallas
 
 */
function paymentWhitoutInt(payWhitoutInt){
    idDisplay = 'Info';
	idHide = 'Info_SI';
	if (payWhitoutInt){
		idDisplay = 'Info_SI';
		idHide = 'Info';
	}
	divTmp = document.getElementById(idDisplay);
	if (divTmp != null) {
		divTmp.style.display = '';
	}
	divTmp = document.getElementById(idHide);
	if (divTmp != null) {
		divTmp.style.display = 'none';
	}
}
/**
 * Seleccion de metodo de pago
 */
function showPayMethod(method){

	
	
	var element = document.getElementById('apDiv1');
	var inputs = getElementsByTagNames('input',element);
	
	// oculto las cutoas de todas las tarjetas
	for (var i = 0; i < inputs.length; i++ ){
		
		divTmp = document.getElementById(inputs[i].value);
		
		if (divTmp != null) {
			divTmp.style.display = 'none';
		}
	}
	
	// muestro solo las cuotas de la tarjeta solicitada
	divTmp = document.getElementById(method);
	if (divTmp != null)
			divTmp.style.display = '';
	
	
	// remueve el checked a cualquier cuota seleccionada en la targeta anterior
	element = document.getElementById(myMethod);
	inputs = getElementsByTagNames('input',element);
	
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].checked = false;
	}
	
	//Actualizo variables globales
	myMethod = method;		
	myQuotas = '';
	myAmount = '';

}


/**
 * Compra con tarjetas
 */
function confirmBidWithQuotas(){

	if (myAmount == '' || myMethod == ''){
		alert(mAlerta);
		return ;
	}
	
	hideFloatingLayer();

	flagQuotas = true;

        var dnun_src = getCurrentUrlBase() + '/jm/item?act=confirmBid&vip3=Y&id=' + valItemId + '&site='+ valItemSite +'&quotas=' + myQuotas + '&paymethod='+ myMethod + '&amount=' + myAmount ;
	
	addEvent(window, 'resize', readjustContent);
	addEvent(window, 'scroll', readjustContent);
	//Creamos el DIMMER
	
	createDimmerDiv();
	//Creamos el contenido dinamico
	//si quieren modificar el ancho del form modificar esto cnt_width
	createDynamicContent(img_src, loading_width, loading_height, dnun_src, '790px');
	
	readjustContent();

}
/**
* Arma la trozo de la QueryString con los datos de cuotas
*/
function getPaymentQueryString(){
	return '&paymethod='+myMethod+'&quotas='+myQuotas+'&amount='+myAmount;
}
/****************Funciones para CWS*********************/
/**
Muestra el form de denunciar pregunta
*/
var isShowLogin=false;
function showDenunForm(questID,denunType,isShowDP)
{
	var dnun_src = getCurrentUrlBase()+'/jm/com.mercadolibre.web.endUser.cws.DenounceForm?axn=defaultAnsQues&vp3=Y&item_id='+valItemId +'&siteID='+valItemSite+'&qa_id='+questID+'&type_id='+denunType+'&isShowDP='+isShowDP;
	addEvent(window, 'resize', readjustContent);
	addEvent(window, 'scroll', readjustContent);
	//Creamos el DIMMER
	
	createDimmerDiv();
	//Creamos el contenido dinamico
	//si quieren modificar el ancho del form modificar esto cnt_width
	createDynamicContent(img_src, loading_width, loading_height, dnun_src, '600px');
}
/*
Procesa el regreso de la denuncia
*/
function processDenounceChange() {
  if (reques.readyState == 4) {
    if (reques.status == 200) {
      processDenounce();
    } else {
       // TODO: Loguear y redirigir a vista de error!
    }
  }
}
/*
Procesa el regreso de la denuncia
*/
function processDenounceChangeItm() {
  if (reques.readyState == 4) {
    if (reques.status == 200) {
      processDenounceItm();
    } else {
       // TODO: Loguear y redirigir a vista de error!
    }
  }
}

/*
Refresca en el layer el valor devuelto por el servlet
*/
function processDenounce()
{
	try	{
		
	//Intentamos levantar la respuesta Xml
	var xml = reques.responseXML;
		
	var messageType = xml.getElementsByTagName("type")[0].childNodes[0].nodeValue;
	 
	
	//trae el mensaje que devolvi� el request al servlet
	if(messageType==VALIDATED_MESSAGE) {
  	     document.getElementById('rcontent').innerHTML = xml.getElementsByTagName("message")[0].childNodes[0].nodeValue;
		 isShowLogin=false;
		 readjustContent();
  	}
  	
  	//Si el tipo es warning muestra un error de campo ej. error en captcha.
  	else if (messageType=="error") {
  		if(xml.getElementsByTagName("messageCaptchaOK")[0].childNodes[0].nodeValue =="true"){
			var divErrorCaptcha = document.getElementById('captcha_msg_error');
			divErrorCaptcha.innerHTML = "";
			divErrorCaptcha.innerHTML = xml.getElementsByTagName("messageCaptcha")[0].childNodes[0].nodeValue;
		}
		var divErrorTypeDen = document.getElementById('type_Den_msg_error');
		divErrorTypeDen.innerHTML = "";
  		divErrorTypeDen.innerHTML = xml.getElementsByTagName("messageTypeDen")[0].childNodes[0].nodeValue;
		var divErrorComment = document.getElementById('comment_msg_error');
		divErrorComment.innerHTML = "";
  		divErrorComment.innerHTML = xml.getElementsByTagName("messageComment")[0].childNodes[0].nodeValue;
		
		var showlogin = xml.getElementsByTagName("messageLoginOk")[0].childNodes[0].nodeValue;	
		if(showlogin =='false'){
				if(xml.getElementsByTagName("messageInvalidPwdCust")[0].childNodes[0].nodeValue == "true"){
					document.getElementById('errWarning').style.display='';
					}else{
						document.getElementById('errWarning').style.display='none';
				}
		}else if(showlogin = 'true'){
			document.getElementById('showloggin').innerHTML = ''
		}
		
		readjustContent();
				//seteo en false la variable para futuras llamadas...
	}
	//Si no volvio un Xml es que ocurrio una exception no controlada, mostramos la pantalla de error.
	}catch(e) {
	alert(e);
  	document.body.innerHTML = reques.responseText;
  }
}
/*
Refresca en el layer el valor devuelto por el servlet
*/
function processDenounceItm()
{
	try	{
		
	//Intentamos levantar la respuesta Xml
	var xml = reques.responseXML;
		
	var messageType = xml.getElementsByTagName("type")[0].childNodes[0].nodeValue;
	
	//trae el mensaje que devolvi� el request al servlet
	if(messageType=='validated') {
		document.getElementById("roundboxFlexHead").innerHTML="";
		document.getElementById("boxB").innerHTML = xml.getElementsByTagName("message")[0].childNodes[0].nodeValue;
		isShowLogin=false;
  	}
  	
  	//Si el tipo es warning muestra un error de campo ej. error en captcha.
  	else if (messageType=="error") {
  		if(xml.getElementsByTagName("messageCaptchaOK")[0].childNodes[0].nodeValue =="true"){
			var divErrorCaptcha = document.getElementById('captcha_msg_error');
			divErrorCaptcha.innerHTML = "";
			divErrorCaptcha.innerHTML = xml.getElementsByTagName("messageCaptcha")[0].childNodes[0].nodeValue;
		}
		var divErrorTypeDen = document.getElementById('type_Den_msg_error');
		divErrorTypeDen.innerHTML = "";
  		divErrorTypeDen.innerHTML = xml.getElementsByTagName("messageTypeDen")[0].childNodes[0].nodeValue;
		var divErrorComment = document.getElementById('comment_msg_error');
		divErrorComment.innerHTML = "";
  		divErrorComment.innerHTML = xml.getElementsByTagName("messageComment")[0].childNodes[0].nodeValue;
		
		var showlogin = xml.getElementsByTagName("messageLoginOk")[0].childNodes[0].nodeValue;	
		if(showlogin =='false'){
				if(xml.getElementsByTagName("messageInvalidPwdCust")[0].childNodes[0].nodeValue == "true"){
					document.getElementById('errWarning').style.display='';
					}else{
						document.getElementById('errWarning').style.display='none';
				}
		}else if(showlogin = 'true'){
			document.getElementById('showloggin').innerHTML = ''
		}
	
		//seteo en false la variable para futuras llamadas...
	}
	//Si no volvio un Xml es que ocurrio una exception no controlada, mostramos la pantalla de error.
	}catch(e) {
	alert(e);
  	document.body.innerHTML = reques.responseText;
  }
}
function doComment()
{
	for (i=0;i<document.fDenun.tipo_denuncia.length;i++)
	{
      if (document.fDenun.tipo_denuncia[i].checked)
      {
             var type_denounce_value = document.fDenun.tipo_denuncia[i].value;
      }
	}
	if(type_denounce_value=="otros"){
		if(document.fDenun.type_id.value != "ITM"){
			document.getElementById('comment').style.display='';
			}else if(document.fDenun.isShowDP.value =="N"){
			document.getElementById('comment').style.display='';
				}else{
				document.getElementById('comment').style.display='none';
				document.getElementById('comment_msg_error').style.display='none';
				}
	}else{
		document.getElementById('comment').style.display='none';
		document.getElementById('comment_msg_error').style.display='none';
	}

}

/* Muestra el banner de arriba de la VIP + funciones del buscador  PPOSE*/

function setCookie(cookieName,cookieValue,nDays) {

	setCookie(cookieName,cookieValue,nDays, null);

}

function setCookie(cookieName,cookieValue,nDays,path) {

	var subdomain = getSubdomain();

	if (path == null)

		path ="/";

	if(nDays!=null){

		today  = new Date();

		expire = new Date();

		if (nDays==null || nDays==0) 

			nDays=1;

		expire.setTime(today.getTime() + 3600000*24*nDays);								

		document.cookie = cookieName+"="+cookieValue+";path="+path + ";domain=."+ subdomain +  ";expires="+expire.toGMTString();

	}

	else

		document.cookie = cookieName+"="+cookieValue+";path="+path+";domain=."+ subdomain;		

}

function getSubdomain(){		

	var dom = ""+window.location.host;

	var pos = dom.indexOf("mercadoli");

	if(pos == -1)

		pos = dom.indexOf("deremate");

	if(pos == -1)

		pos = dom.indexOf("arremate");

	if (pos != -1)	

		dom = dom.substring(pos);		

	return dom;

}

var lowResolution=false;
var downloadBanner=false;

function hideBanner(){
	var banner = document.getElementById("oasTOP");	
	banner.style.display="none";
}

function getWindowSize() {
  setWindowSize();
  var size = new Array(windowWidth, windowHeight);
  return size;
}

function setSizeFlags() {
	var size = getWindowSize();
	lowResolution = size[0]<=800 || size[1]<=450;
}
	
function getCookieValue(name) {

	var start=document.cookie.indexOf(name+"=");

	var len=start+name.length+1;

	if (start == -1) 

		return null;

	var end=document.cookie.indexOf(";",len);

	if (end==-1) 

		end=document.cookie.length;

	return unescape(document.cookie.substring(len,end));

}

function getChr(value) {
	var vHexCode = "0123456789ABCDEF"
	var hex = "" + vHexCode.charAt((value - (value % 16))/16) + vHexCode.charAt(value % 16)
	return unescape("%"+hex)
}

function encodeNatural(toEncode) {
	toEncode= toEncode.replace(/\+/g, getChr(254));
	toEncode= toEncode.replace(/-/g, getChr(216));
	toEncode= toEncode.replace(/\s/g, '-');
	toEncode= toEncode.replace(/\t/g, '-');
	toEncode= toEncode.replace(/_/g, '*');
	return encodeURIComponent(toEncode);
}


function innerSearch(){

 var urlToRedirect;

	var word = document.getElementById("as_inner_word").value;

 setCookie("ml_list","searching");
   
	setCookie('LAST_SEARCH', word, null);

 urlToRedirect = listUrl + "/" + encodeNatural(word);

	if(getCookieValue('pr_categ') == 'AD') {

		urlToRedirect = urlToRedirect+ "_PrCategId_AD";

	}

 document.location.href = urlToRedirect;

}

function setFocus(){
	wordFocus = true;
}

function setBlur(){
	wordFocus = false;
}

var wordFocus = false;

document.onkeydown = keyDown;

function keyDown(DnEvents) {

    k = (netscape) ? DnEvents.which : window.event.keyCode;

    if (k == 13 && wordFocus==true) {

	 innerSearch();

	return false;

     }else{

	return true;

    }

}

function logoutTargetUrl() {
window.location=urlBaseSite+'jm/logout';
}

                               
function setLog(){

   ck = getCookieValue("orguserid"); 

      if (ck!=null && ck.length >= 4 ) {       
          document.write("<div class=\"lnk_menu_der\"><a target=\"_top\" href=\"javascript:logoutTargetUrl();\" class=\"hpcateg\" id=\"MENU:SALIR\">Salir</a></div>");

      }  
}


//FIN de Funciones search + banner

function mli(){
	wOpen(urlDefault + "p_html?as_html_id=POP_UPMERCADOLIDER", "", 400, 400, "no", "");
}

function mligold(){
	wOpen(urlDefault + "p_html?as_html_id=POP_UPMERCADOLIDERG", "", 400, 400, "no", "");
}

function mliplat(){
	wOpen(urlDefault + "p_html?as_html_id=POP_UPMERCADOLIDERP", "", 400, 400, "no", "");
}

function certif(){
	wOpen(urlDefault + "p_html?as_html_id=CERTIF", "", 450, 430, "no", "", "outerWidth=460,outerHeight=440");
}

/*NAP*/
function hideString(k, s) { return hex_md5(k + s); }

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len){
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t){
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t){
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t){
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t){
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t){
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y){
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt){
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str){
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray){
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

function hasSuperCookie() {
 return (getCookieValue('superbidman') == 'matanga');
}
function useSecureBid() {
 if (hasSuperCookie()) {
  return true;
 } else {
  return false;
 }
}
function sendPassword() { 
 if (hasSuperCookie()) {
  return false; 
 } else {
  return true;
 }
}
/*FIN NAP*/ 

// Max length text area
function ismaxlength(obj){
  var mlength=obj.getAttribute? parseInt(obj.getAttribute("maxlength")) : "";
  if (obj.getAttribute && obj.value.length>mlength)
    obj.value=obj.value.substring(0,mlength);
}
/*-------- IMPORT FROM ( Name [ JS_FILE_SCRIPT_MIDD ], Type [ H ], Class [ WebComponetVo ] ) --------*/
function midScript(){
	if (!document.layers){
		var timeLeft = getCurrentUrlBase()+"/jm/item?vip3=Y&act=timeleft&site="+valItemSite+"&id="+valItemId+"&" + new Date().getTime();
		var showHits = getCurrentUrlBase()+"/jm/item?vip3=Y&act=showhits&site="+valItemSite+"&id="+valItemId+"";
		var itemsSeller =getCurrentUrlBase()+"/jm/item?vip3=Y&act=frameItems&sellerId="+valSellerId+"&site="+valItemSite+"&visualId="+valConfigId+"&mode=0";
		 		
		try{
		 			
			document.getElementById("iframeTimeLeft").src=timeLeft;
			document.getElementById("iframeShowHits").src=showHits;
     		getSellerItems(itemsSeller);
     			
    	}catch (E){}
		

	}
}
function midThermometerScript(){
	if (!document.layers){
		var califPercentage = getCurrentUrlBase()+"/jm/item?vip3=Y&act=eocscalif&cust="+valSellerId+"&site="+valItemSite+"&id="+valItemId+"&RP2=Y";		
		try{ 			
			document.getElementById("iframeCalifPercentage").src=califPercentage;     			
    	}catch (E){}
	}
}

/*-------- IMPORT FROM ( Name [ JS_FILE_LAYER_NEW ], Type [ H ], Class [ WebComponetVo ] ) --------*/
function processEnterKey(e){
		
		keycode = e.keyCode;
		
		if(keycode == 13)
			document.getElementById('userPassForm').submit();
	}

netscape = "";

ver = navigator.appVersion; 
len = ver.length;

for(iln = 0; iln < len; iln++) {
	if (ver.charAt(iln) == "(") break;
}

netscape = (ver.charAt(iln+1).toUpperCase() != "C");

if (netscape) document.captureEvents(Event.KEYDOWN|Event.KEYUP);


var divWidth   = 0;
var divHeight  = 0;
var html       = "";
var windowHeight = 0;
var windowWidth = 0;
var totalWidth = 0;
var contentTop = 0;
var scrOfY = 0;
var first = true;
var postProcess;
var postClosing;
var reques = null;
var cancelLoading = 0;

var ERROR_MESSAGE = "error"; 
var WARNING_MESSAGE = "warning";
var VALIDATED_MESSAGE = "validated";
/* FAD - Inicio - NAP VIP3 Captcha*/
var REDIR_LOGIN_TYPE = "redir_login";
/* FAD - Fin - NAP VIP3 Captcha */
/*PNL - Remedy Center - Redirect Verificacion Telefonica*/
var REDIR_VERI_TEL = "redir_verif_tel";
/*PNL - Remedy Center - Redirect Verificacion Telefonica*/

/* ----------------- Funciones ----------------- */

function showLayer(urlAction)
{
	/* ------- Comportamiento de la ventana -------- */

	addEvent(window, 'resize', readjustContent);
	addEvent(window, 'scroll', readjustContent);
	
	var nickName = getcookie('orgnickp');

	if (isNickNameNoEncoder(nickName)){
		
		var myDomain = (window.location.host + "");
		var myDomainCookie = myDomain.substring(myDomain.indexOf('.'));
		deleteCookie('orghash', '/', myDomainCookie);
		deleteCookie('orgnickp', '/', myDomainCookie);
	}
	
	//Creamos el DIMMER
	createDimmerDiv();
	 
	var layerURL = cnt_src+'&random='+Math.random();

        //la variable destQuest la obtengo del VOB VIP_LAYER_JS
        if (typeof(destQuest) != "undefined"
 && (urlAction == destQuest || urlAction == (destQuest + "&step=ask"))) {

            layerURL = urlAction+'&random='+Math.random();

        } 

        if (typeof(atlasPoolSufix) != "undefined"){
		layerURL += "&"+ atlasPoolSufix; 	
	}
	
	//Creamos el contenido dinamico
	createDynamicContent(img_src, loading_width, loading_height, layerURL , cnt_width);
	
	//Inicializo variables de cuotas
	myMethod="";
	myQuotas="";

}

/*Funciones para desloguear al usuario que tenga caracteres raros en el nickname: 
--> Siempre se le pide que ingrese user y pass */

function isNickNameNoEncoder(nickName){
	
	if (nickName == null)
	return false;
	
	for (i=0;i<nickName.length;i++){
		ch = nickName.substring(i,i + 1);
		if (encodeURIComponent(ch) != ch)
				return true;
	}
	return false;
}


function getcookie( name ) {
var start = document.cookie.indexOf( name + "=" );
var len = start + name.length + 1;
if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
return null;
}
if ( start == -1 ) return null;
var end = document.cookie.indexOf( ';', len );
if ( end == -1 ) end = document.cookie.length;
return document.cookie.substring( len, end );
}

function deleteCookie( name, path, domain ) {
if ( getcookie( name ) ) document.cookie = name + '=' +
( ( path ) ? ';path=' + path : '') +
( ( domain ) ? ';domain=' + domain : '' ) +
';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}


//FIN de funciones de logueo de usuario con caracteres raros.


function createDynamicContent(loadImg_url, loadImg_width, loadImg_height, content_url, content_width)
{
	//Si el LOADING esta habilitado lo mostramos
		if(loadingIsEnabled) createLoadingDiv(loadImg_url, loadImg_width, loadImg_height);
	
	//Si el CONTENT esta habilitado lo mostramos
 	if(contentIsEnabled) createContent(content_url, content_width);
}

function createDimmerDiv()
{
	 //Verifico si el browser es IE6 q contiene un bug con los selects, q no respetan los 
	 //z-index y se ven por encima del del gray layout box, por lo tanto un "arreglo" es 
	 //mostrarlos y ocultarlos al hacer desaparecer o aparecer al gray layout box
	 showOrHideAllDropDowns("hidden");	 	
	
// document.onkeydown = processKey;
	
 first=true;

 //Buscamos en el documento el elemento DIMMER
 divDimmer = document.getElementById('dimmer');
			
 //Si el DIMMER no existe lo creamos dinamicamente
 if(divDimmer == null){
   divDimmer = document.createElement("div");
   divDimmer.id = "dimmer";
   divDimmer.className = "dimmer";
   document.getElementById('ml_layer').appendChild(divDimmer);}	

 getTotalWindowWidth();

 //Cubrimos toda la pantalla con el dimmer
 divDimmer.style.width = totalWidth + "px"; 
 divDimmer.style.height = document.body.scrollHeight + 10 + "px";
 
 //Hacemos visible el dimmer en pantalla
 divDimmer.style.display = 'block';
}

function processKey(DnEvents)
{ 
	keyPressed = (netscape) ? DnEvents.which : window.event.keyCode;
    
    if (keyPressed == 27) 
    { 
        //Ejecutar el submit o la llamada a la funci�n que corresponda
	      abortProcess()
    }
}

function processEnter(DnEvents)
{ 
	keyPressed = (netscape) ? DnEvents.which : window.event.keyCode;
    
    if (keyPressed == 13) 
    { 
        //Ejecutar el submit o la llamada a la funci�n que corresponda
	      doSubmitForm();
    }
}

function createLoadingDiv(loadImg_url, loadImg_width, loadImg_height)
{		
		loadingImg = document.getElementById('loadingImg');
		
		if(loadingImg != null)
			document.getElementById('ml_layer').removeChild(loadingImg);
		
		setWindowSize();
		getScrollY();
		
		loadingImg 		  = document.createElement("img");
		loadingImg.id 		  = "loadingImg";
		loadingImg.src 		  = loadImg_url;
		loadingImg.style.width 	  = loadImg_width;
		loadingImg.style.height   = loadImg_height;
		loadingImg.style.top 	  =  scrOfY + (windowHeight / 2) - (loadingImg.height / 2) + "px";
		loadingImg.style.left 	  = (windowWidth / 2) - (loadingImg.width / 2) + "px"; 
		loadingImg.style.position = "absolute";
		loadingImg.style.zIndex 	  = 100000;
		
		loadingImg.onclick = abortProcess;
		
		document.getElementById('ml_layer').appendChild(loadingImg);
		document.onkeydown = processKey;
}

function abortProcess()
{
 document.onkeydown = function(){};
 if(reques)
 {
 	reques.onreadystatechange = function () {};
 	reques.abort();
 }

 hideFloatingLayer();
 cancelLoading = 1;

}


function hideFloatingLayer()
{				
	 if(loadingIsEnabled) {
	  //Buscamos el elemento LOADING
	  loadingImg = document.getElementById('loadingImg');
	 
	  //Si existe lo escondemos
	  if(loadingImg!=null)
	   loadingImg.style.display = 'none';
	 }
					
	 if(contentIsEnabled) {
	  //Buscamos el elemento CONTENT
	  contentIframe = document.getElementById('content');	
					
	  //Si existe lo escondemos
	  if(contentIframe!=null)
	   contentIframe.style.display = 'none';
	 }
	
	 //Buscamos el elemento DIMMER
	 divDimmer = document.getElementById('dimmer');
					
	 //Si existe lo escondemos
	 if(divDimmer!=null)
	   document.getElementById('ml_layer').removeChild(divDimmer);
					
	 //Devolvemos el control al script de visor
	 removeEvent(window, 'resize', readjustContent);

passInput = document.getElementById('as_pass');
	
if(passInput !=null)
{
 removeEvent(passInput , 'keydown', processEnter);
 removeEvent(passInput , 'keydown', enableConfirm);
}

  //removeEvent(window, 'keydown', processKey);	 

  document.onkeydown=keyDown;
	 	 
	 //Verifico si el browser es IE6 q contiene un bug con los selects, q no respetan los 
	 //z-index y se ven por encima del del gray layout box, por lo tanto un "arreglo" es 
	 //mostrarlos y ocultarlos al hacer desaparecer o aparecer al gray layout box
	 showOrHideAllDropDowns("visible");	 	
	 	 
	 //Se quita la funcion asociada a postProcess de manera que si se invoca otro layer no se vuelva a llamar
	 if(postProcess != undefined){ postProcess = undefined;}
	 
	 //Si esta definida una funcion de postClosing la ejecutamos 
	 //IMPORTANTE: (La funcion de postClosing tiene la responsabilidad de desasignar el evento!!!)
	 if(postClosing != undefined){	postClosing();}
}

function createContent(content_url, content_width)
{
	//Buscamos los elementos
	content = document.getElementById('content');
	
	script  = document.getElementById('script');
	
	style   = document.getElementById('style');
	
	if(content!=null){
	
		content.parentNode.removeChild(content);
	
	}
		
	if(script!=null) {
	
	script.parentNode.removeChild(script);
	
	}
		
	if(style!=null){
	
	style.parentNode.removeChild(style);
	
	}
	
	
	content 		= document.createElement("div");
	content.id 		= "content";
	content.className 	= "content";
	content.style.position 	= "absolute";
	content.style.width 	= content_width;
	content.style.margin  = "0px";
  content.style.left    = "0px";
	
	document.getElementById('ml_layer').appendChild(content);
	
	getContent(content_url); 
	
	content.style.display = "block";
}

function readjustContent(){
	
	//Buscamos el elemento CONTENT
	content = document.getElementById('content');
	
	setWindowSize();
	
	if(content!=null) {
		divWidth  = content.offsetWidth;
		divHeight = content.offsetHeight;
		
		getScrollY();
		
		if((((scrOfY + (windowHeight - divHeight ) / 2) + content.offsetHeight)<document.body.scrollHeight))
		{		
			
			if(autocenterIsEnabled) {
				
				if((divHeight < windowHeight)||first==true)
				{
						if(first==true)
							first = false;
						if(divHeight > windowHeight)
							content.style.top = scrOfY + "px";
						else
						content.style.top  = (scrOfY + (windowHeight - divHeight ) / 2) + "px";
				}
				
				if(divWidth > windowWidth)
						content.style.left = "0px";
				else
						content.style.left = ((windowWidth - divWidth) / 2 ) + "px";
				
			}else {
				content.style.top  = scrOfY + "px";
				content.style.left = '0px';
			}
		}
	}
}

function enableClosing()
{
 //Buscamos en el documento el elemento DIMMER
 divDimmer = document.getElementById('dimmer');
 divDimmer.onclick = hideFloatingLayer;
}

function getContent(urlContent){
	url 	= urlContent;
	reques 	= GetXmlHttpRequest(processContentChange);
	
	reques.open("GET", url, true);
	reques.send(null);
}

function processContentChange() {
  if (reques.readyState == 4) {
    if (reques.status == 200) {
    	responseXML = reques.responseXML;
      processContent();
    
    } else {
       // TODO: Loguear y redirigir a vista de error!
    }
  }
}

function processContent() {
  
	if(loadingIsEnabled) {
		loadingImg = document.getElementById('loadingImg');
		loadingImg.style.display="none";
	} 
	
	var xml = responseXML;
	content = document.getElementById('content'); 
	content.innerHTML = xml.getElementsByTagName("content")[0].childNodes[0].nodeValue;
	
	// Agregamos los Scripts
	if(xml.getElementsByTagName("script").length > 0)	{
		var script = document.createElement('script');
		script.id = "script";
		script.text = xml.getElementsByTagName("script")[0].childNodes[0].nodeValue;

   document.getElementById('ml_layer').appendChild(script);		
	}
	
	// Agregamos los Styles
	/*if(xml.getElementsByTagName("style").length > 0)	{


		// FOR IE
		if(document.styleSheets[0].cssText){
			
			document.styleSheets[0].cssText += xml.getElementsByTagName("style")[0].childNodes[0].nodeValue;
		
		} else{
			
			var styles = document.createElement('style');
			styles.setAttribute('type', 'text/css');
			styles.setAttribute('id','style');
	
			var newStyle = document.createTextNode(xml.getElementsByTagName("style")[0].childNodes[0].nodeValue);  	
	    
			styles.appendChild(newStyle);
		    
			var headRef = document.getElementsByTagName('head')[0];
	    
	    headRef.appendChild(styles); 
  	}		

	}*/
		
	content.style.display = "block";
	readjustContent();
	content.style.position="absolute";
	
	enableClosing();


        if(document.getElementById('as_pass')!=null)
{
 //addEvent(document.getElementById('as_pass'), 'keydown', processEnter);
 addEvent(document.getElementById('as_pass'), 'keydown', enableConfirm);
}
       
	if(postProcess != undefined){	postProcess();}
}

function getScrollY() {
	functionSelector('scrOfY = window.pageYOffset',
  								 'scrOfY = document.documentElement.scrollTop',
  								 'scrOfY = document.body.scrollTop');
}

function setWindowSize() 
{
	functionSelector('windowHeight = window.innerHeight;windowWidth  = window.innerWidth',
  								 'windowHeight = document.documentElement.clientHeight;windowWidth = document.documentElement.clientWidth',
  								 'windowHeight = document.body.clientHeight;windowWidth = document.body.clientWidth');
}

function getTotalWindowWidth() 
{
  functionSelector(' totalWidth  = screen.width - getHScrollBarWidth()', 
  								 'totalWidth  = screen.width - 21',
  								 'totalWidth  = screen.width - 21');
}

function getHScrollBarWidth()
{
	var div = document.createElement("div");
	var innerDiv = document.createElement("div");
	
	div.style.width="50px";
	div.style.height="50px";
	div.style.overflow="hidden";
	div.style.position="absolute";
	div.style.top="-200px";
	div.style.left="0px";
	
	innerDiv.style.height="100px"; 
	
	div.appendChild(innerDiv);
	document.getElementById('ml_layer').appendChild(div);
	
	var w1 = innerDiv.clientWidth;
	
	div.style.overflow="scroll";
	
	var w2 = innerDiv.clientWidth;
	
	document.getElementById('ml_layer').removeChild(div);	
	
	return (w1 - w2);
}

/* Ejemplo: --> functionSelector('alert("NonIE")','alert("IE6")', 'alert("IE4")'); */

function functionSelector(f_if_NonIE, f_if_IE6, f_if_IE4)
{
  if( typeof( window.innerWidth ) == 'number' ) {
    //Execute if Non-IE (Netscape Compliant)
    return(eval(f_if_NonIE));
    
  } else if( document.documentElement && document.documentElement.clientWidth) {
    //Execute if IE 6+ in 'standards compliant mode'
    return(eval(f_if_IE6));
    
  } else if( document.body && document.body.clientWidth) {
    //Execute if IE 4 compatible (DOM Compliant)
    return(eval(f_if_IE4));
  }
}


function logout()
{
	reques 	= GetXmlHttpRequest(logoutChange);
	
	ofertarUrl 	= getCurrentUrlBase() + '/jm/ConfirmBid?axn=logout&random='+Math.random();
	
	reques.open("GET", ofertarUrl, true);
	
	reques.send(null);
}

function logoutChange() {
  if (reques.readyState == 4) {
    if (reques.status == 200) {
		hideFloatingLayer();
		if (myQuotas=="" || myMethod==""){
			showLayer();
		}else{
			confirmBidWithQuotas();
		}
    } else {
       // TODO: Loguear y redirigir a vista de error!
    }
  }
}



function showOrHideAllDropDowns(newState) {
   var isIE6 = ((navigator.appName == "Internet Explorer") || (navigator.appVersion.indexOf("MSIE") !=-1))	 
							 && (parseInt(navigator.appVersion.substring(navigator.appVersion.indexOf("MSIE") + 5)) == 6) // test for IE6
	 
	 if (isIE6) {	 	
	    var elements = document.documentElement.getElementsByTagName('select');
	
	    for (var i=0; i<elements.length; i++) {
	       elements[i].style.visibility = newState;
	    }
   }
}

function refreshQuestOnQuest() {

var isIE = ((navigator.appName == "Internet Explorer") || (navigator.appVersion.indexOf("MSIE") !=-1));

if (isIE) {
window.history.go(0);
} else {
var html = document.location.href +'&goToQuestOn=Y';
document.location.href = html;
}
}

/*-------- IMPORT FROM ( Name [ JS_FILE_MLJSLOGGER ], Type [ H ], Class [ WebComponetVo ] ) --------*/
MLJsLogger = function () { }

MLJsLogger.urlBasePlDfl = document.location.protocol+"//"+document.location.host+"/argentina/ml/";
MLJsLogger.proc = "UNDEFINED";
MLJsLogger.SEPARATOR = "||";
MLJsLogger.urlBasePl;

MLJsLogger.originalErrorHandlerDwr;

MLJsLogger.LEVEL_ERROR = 0;
MLJsLogger.LEVEL_WARN = 1;
MLJsLogger.LEVEL_DEBUG = 2;

MLJsLogger.level = 0;

MLJsLogger.setUrlBasePl = function (url){
	MLJsLogger.urlBasePl = url;	
}

MLJsLogger.getUrlBasePl = function (){
	if (MLJsLogger.urlBasePl == null)
		return MLJsLogger.getBase();
	else
		return MLJsLogger.urlBasePl;
}


MLJsLogger.getBase = function ()
{
     var baseTag = document.getElementsByTagName('base');
	 
	 if (typeof baseTag === 'undefined' || baseTag.length == 0)
	 	return MLJsLogger.urlBasePlDfl;
	 else {
		 if (MLJsLogger.isValidUrlBase (baseTag[0].href)) {
		   if (MLJsLogger.isDebugEnable())
				MLJsLogger.debug ('baseTag[0].href: ' +baseTag[0].href);
	 	   return baseTag[0].href;
		 }
		 else
		   return MLJsLogger.urlBasePlDfl;	
	 }
}


MLJsLogger.setLogProc = function (proc){
	MLJsLogger.proc = proc;	
}

MLJsLogger.setLevel = function (level){
	MLJsLogger.level = level;	
}

MLJsLogger.setLevelError = function (){
	MLJsLogger.setLevel (MLJsLogger.LEVEL_ERROR);
	MLJsLogger.setTrap ();
}

MLJsLogger.debug = function  (msj) {
	alert (DWRUtil.toDescriptiveString (msj, 2));
}

MLJsLogger.setLevelDebug = function (){
	MLJsLogger.setLevel (MLJsLogger.LEVEL_DEBUG);
	MLJsLogger.setTrap ();
}

MLJsLogger.setTrap = function (){
	if (typeof DWREngine != 'undefined' && typeof DWREngine._errorHandler != 'undefined') {
		MLJsLogger.originalErrorHandlerDwr = DWREngine._errorHandler;
		DWREngine.setErrorHandler(MLJsLogger.errorHandlerDwr);
	}
	window.onerror = MLJsLogger.trapError;
}

MLJsLogger.errorHandlerDwr = function (errorString, exception){
	MLJsLogger.logError (errorString + MLJsLogger.SEPARATOR + DWRUtil.toDescriptiveString(exception,1));
	
	if (MLJsLogger.originalErrorHandlerDwr != null) {
		MLJsLogger.originalErrorHandlerDwr(errorString, exception);	
	}
}

MLJsLogger.isDebugEnable = function () {
	return 	MLJsLogger.level == MLJsLogger.LEVEL_DEBUG;
}

MLJsLogger.isValidUrlBase = function  (url) {
	return url.indexOf('\/ml\/') > -1;	
}

MLJsLogger.logError = function (error, proc){
	if (typeof proc === 'undefined')
		MLJsLogger.insertLog ('Error: '+error, MLJsLogger.proc);
	else
		MLJsLogger.insertLog ('Error: '+error, proc);
}

MLJsLogger.trapError = function (sMsg, sUrl, sLine){
    s="Msg: " + sMsg + MLJsLogger.SEPARATOR;
    s+="Line: " + sLine + MLJsLogger.SEPARATOR;
    s+="URL: " + sUrl + MLJsLogger.SEPARATOR;
    MLJsLogger.logError (s);    
 }
 
 
MLJsLogger.getDataBrowser = function () {
	dataFromBrowser = "";
	dataFromBrowser+= DWRUtil.toDescriptiveString(navigator,1,2) +MLJsLogger.SEPARATOR;
	dataFromBrowser+= DWRUtil.toDescriptiveString(window.location, 1) +MLJsLogger.SEPARATOR;
	dataFromBrowser+= "Cookie: "+DWRUtil.toDescriptiveString(document.cookie, 1).replace(/;/gi, MLJsLogger.SEPARATOR) +MLJsLogger.SEPARATOR;
	return dataFromBrowser;
}

MLJsLogger.insertLog = function  (error, proc) {
	if (MLJsLogger.isDebugEnable()) {
		MLJsLogger.debug ('insertLog: error: '+error);
	}
	
	if(error != null){
		if(error.indexOf('articulo.mercadolibre')>=0 && error.indexOf('advertising')==-1){
			id = Math.random();
			MLJsLogger.executeCall (MLJsLogger.getUrlLog (error+MLJsLogger.SEPARATOR+MLJsLogger.getDataBrowser(), proc, id), id);
		}
	}
	
}

MLJsLogger.executeCall = function  (url, id) {
	//idname = id;
	var img=new Image();
	img.src=url+"&idIframe="+id;
	//div = document.createElement('div');
	//div.innerHTML = "<iframe frameborder='0' width='1' height='1' id='" + idname + "' name='" + idname + "' src='"+url+"&idIframe="+id+"'></iframe>";
	//if (typeof document.body != 'undefined')
	//	document.body.appendChild(div);
}
  
MLJsLogger.getUrlLog = function  (error, proc, id) {
	return "/jm/ml.api.webcomponent.JavaScriptController?action=log&as_txt="+escape(error)+"&r="+id+"&proc="+proc; 		 
}
/*-------- IMPORT FROM ( Name [ JS_FILE_VISOR ], Type [ H ], Class [ WebComponetVo ] ) --------*/
/*!	SWFObject v2.0 rc3 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

var swfobject = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		CSS_VISIBLE = "visibility:visible",
		CSS_HIDDEN = "visibility:hidden",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
	
		domLoadFnArr = [],
		regObjArr = [],
		timer = null,
		storedAltContent = null,
		isDomLoaded = false,
		isExpressInstallActive = false;
	
	/* Centralized function for browser feature detection
		- Proprietary feature detection (conditional compiling) is used to detect Internet Explorer's features
		- User agent string detection is only used when no alternative is possible
		- Is executed directly for optimal performance
	*/	
	var ua = function() {
		var w3cdom = typeof document.getElementById != UNDEF && typeof document.getElementsByTagName != UNDEF && typeof document.createElement != UNDEF && typeof document.appendChild != UNDEF && typeof document.replaceChild != UNDEF && typeof document.removeChild != UNDEF && typeof document.cloneNode != UNDEF,
			playerVersion = [0,0,0],
			d = null;
		if (typeof navigator.plugins != UNDEF && typeof navigator.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = navigator.plugins[SHOCKWAVE_FLASH].description;
			if (d) {
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /r/.test(d) ? parseInt(d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof window.ActiveXObject != UNDEF) {
			var a = null, fp6Crash = false;
			try {
				a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".7");
			}
			catch(e) {
				try { 
					a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".6");
					playerVersion = [6,0,21];
					a.AllowScriptAccess = "always";  // Introduced in fp6.0.47
				}
				catch(e) {
					if (playerVersion[0] == 6) {
						fp6Crash = true;
					}
				}
				if (!fp6Crash) {
					try {
						a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
					}
					catch(e) {}
				}
			}
			if (!fp6Crash && a) { // a will return null when ActiveX is disabled
				try {
					d = a.GetVariable("$version");  // Will crash fp6.0.21/23/29
					if (d) {
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				catch(e) {}
			}
		}
		var u = navigator.userAgent.toLowerCase(),
			p = navigator.platform.toLowerCase(),
			webkit = /webkit/.test(u),
			webkitVersion = webkit ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : 0,
			ie = false,
			win = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u);
		/*@cc_on
			ie = true;
			@if (@_win32)
				win = true;
			@elif (@_mac)
				mac = true;
			@end
		@*/
		return { w3cdom:w3cdom, playerVersion:playerVersion, webkit:webkit, webkitVersion:webkitVersion, ie:ie, win:win, mac:mac };
	}();
		
	/* Cross-browser onDomLoad
		- Based on Dean Edwards' solution: http://dean.edwards.name/weblog/2006/06/again/
		- Will fire an event as soon as the DOM of a page is loaded (supported by Gecko based browsers - like Firefox -, IE, Opera9+, Safari)
	*/ 
	var onDomLoad = function() {
		if (!ua.w3cdom) {
			return;
		}
		addDomLoadEvent(main);
		if (ua.ie && ua.win) {
			try {  // Avoid a possible Operation Aborted error
				document.write("<scr" + "ipt id=__ie_ondomload defer=true src=//:></scr" + "ipt>"); // String is split into pieces to avoid Norton AV to add code that can cause errors 
				var s = document.getElementById("__ie_ondomload");
				if (s) {
					s.onreadystatechange = function() {
						if (this.readyState == "complete") {
							this.parentNode.removeChild(this);
							callDomLoadFunctions();
						}
					};
				}
			}
			catch(e) {}
		}
		if (ua.webkit && typeof document.readyState != UNDEF) {
			timer = setInterval(function() { if (/loaded|complete/.test(document.readyState)) { callDomLoadFunctions(); }}, 10);
		}
		if (typeof document.addEventListener != UNDEF) {
			document.addEventListener("DOMContentLoaded", callDomLoadFunctions, null);
		}
		addLoadEvent(callDomLoadFunctions);
	}();
	
	function callDomLoadFunctions() {
		if (isDomLoaded) {
			return;
		}
		if (ua.ie && ua.win) { // Test if we can really add elements to the DOM; we don't want to fire it too early
			var s = document.createElement("span");
			try { // Avoid a possible Operation Aborted error
				var t = document.getElementsByTagName("body")[0].appendChild(s);
				t.parentNode.removeChild(t);
			}
			catch (e) {
				return;
			}
		}
		isDomLoaded = true;
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		}
		else { 
			domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
		}
	}
	
	/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
	 */
	function addLoadEvent(fn) {
		if (typeof window.addEventListener != UNDEF) {
			window.addEventListener("load", fn, false);
		}
		else if (typeof document.addEventListener != UNDEF) {
			document.addEventListener("load", fn, false);
		}
		else if (typeof window.attachEvent != UNDEF) {
			window.attachEvent("onload", fn);
		}
		else if (typeof window.onload == "function") {
			var fnOld = window.onload;
			window.onload = function() {
				fnOld();
				fn();
			};
		}
		else {
			window.onload = fn;
		}
	}
	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { // Static publishing only
		var rl = regObjArr.length;
		for (var i = 0; i < rl; i++) { // For each registered object element
			var id = regObjArr[i].id;
			if (ua.playerVersion[0] > 0) { // If no fp is installed, we let the object element do its job (show alternative content)
				var obj = document.getElementById(id);
				if (obj) {
					regObjArr[i].width = obj.getAttribute("width") ? obj.getAttribute("width") : "0";
					regObjArr[i].height = obj.getAttribute("height") ? obj.getAttribute("height") : "0";
					if (hasPlayerVersion(regObjArr[i].swfVersion)) { // Flash plug-in version >= Flash content version: Houston, we have a match!
						if (ua.webkit && ua.webkitVersion < 312) { // Older webkit engines ignore the object element's nested param elements
							fixParams(obj);
						}
					}
					else if (regObjArr[i].expressInstall && !isExpressInstallActive && hasPlayerVersion([6,0,65]) && (ua.win || ua.mac)) { // Show the Adobe Express Install dialog if set by the web page author and if supported (fp6.0.65+ on Win/Mac OS only)
						showExpressInstall(regObjArr[i]);
					}
					else { // Flash plug-in and Flash content version mismatch: display alternative content instead of Flash content
						displayAltContent(obj);
					}
				}
			}
			createCSS("#" + id, CSS_VISIBLE);
		}
	}
	
	/* Fix nested param elements, which are ignored by older webkit engines
		- This includes Safari up to and including version 1.2.2 on Mac OS 10.3
		- Fall back to the proprietary embed element
	*/
	function fixParams(obj) {
		var nestedObj = obj.getElementsByTagName(OBJECT)[0];
		if (nestedObj) {
			var e = document.createElement("embed"), a = nestedObj.attributes;
			if (a) {
				var al = a.length;
				for (var i = 0; i < al; i++) {
					if (a[i].nodeName.toLowerCase() == "data") {
						e.setAttribute("src", a[i].nodeValue);
					}
					else {
						e.setAttribute(a[i].nodeName, a[i].nodeValue);
					}
				}
			}
			var c = nestedObj.childNodes;
			if (c) {
				var cl = c.length;
				for (var j = 0; j < cl; j++) {
					if (c[j].nodeType == 1 && c[j].nodeName.toLowerCase() == "param") {
						e.setAttribute(c[j].getAttribute("name"), c[j].getAttribute("value"));
					}
				}
			}
			obj.parentNode.replaceChild(e, obj);
		}
	}
	
	/* Fix hanging audio/video threads and force open sockets and NetConnections to disconnect
		- Occurs when unloading a web page in IE using fp8+ and innerHTML/outerHTML
		- Dynamic publishing only
	*/
	function fixObjectLeaks(id) {
		if (ua.ie && ua.win && hasPlayerVersion([8,0,0])) {
			window.attachEvent("onunload", function () {
				var obj = document.getElementById(id);
				for (var i in obj) {
					if (typeof obj[i] == "function") {
						obj[i] = function() {};
					}
				}
				obj.parentNode.removeChild(obj);
			});
		}
	}
	
	/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
	*/
	function showExpressInstall(regObj) {
		isExpressInstallActive = true;
		var obj = document.getElementById(regObj.id);
		if (obj) {
			if (regObj.altContentId) {
				var ac = document.getElementById(regObj.altContentId);
				if (ac) {
					storedAltContent = ac;
				}
			}
			else {
				storedAltContent = abstractAltContent(obj);
			}
			if (!(/%$/.test(regObj.width)) && parseInt(regObj.width, 10) < 310) {
				regObj.width = "310";
			}
			if (!(/%$/.test(regObj.height)) && parseInt(regObj.height, 10) < 137) {
				regObj.height = "137";
			}
			document.title = document.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				dt = document.title,
				fv = "MMredirectURL=" + window.location + "&MMplayerType=" + pt + "&MMdoctitle=" + dt,
				replaceId = regObj.id;
			// For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
			// In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = document.createElement("div");
				replaceId += "SWFObjectNew";
				newObj.setAttribute("id", replaceId);
				obj.parentNode.insertBefore(newObj, obj); // Insert placeholder div that will be replaced by the object element that loads expressinstall.swf
				obj.style.display = "none";
				window.attachEvent("onload", function() { obj.parentNode.removeChild(obj); });
			}
			createSWF({ data:regObj.expressInstall, id:EXPRESS_INSTALL_ID, width:regObj.width, height:regObj.height }, { flashvars:fv }, replaceId);
		}
	}
	
	/* Functions to abstract and display alternative content
	*/
	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			// For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
			// In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			var el = document.createElement("div");
			obj.parentNode.insertBefore(el, obj); // Insert placeholder div that will be replaced by the alternative content
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			window.attachEvent("onload", function() { obj.parentNode.removeChild(obj); });
		}
		else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj);
		}
	}	

	function abstractAltContent(obj) {
		var ac = document.createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		}
		else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "param") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	
	/* Cross-browser dynamic SWF creation
	*/
	function createSWF(attObj, parObj, id) {
		var r, el = document.getElementById(id);
		if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
			attObj.id = id;
		}
		if (ua.ie && ua.win) { // IE, the object element and W3C DOM methods do not combine: fall back to outerHTML
			var att = "";
			for (var i in attObj) {
				if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries, like Object.prototype.toJSONString = function() {}
					if (i == "data") {
						parObj.movie = attObj[i];
					}
					else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
						att += ' class="' + attObj[i] + '"';
					}
					else if (i != "classid") {
						att += ' ' + i + '="' + attObj[i] + '"';
					}
				}
			}
			var par = "";
			for (var j in parObj) {
				if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
					par += '<param name="' + j + '" value="' + parObj[j] + '" />';
				}
			}
			el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
			fixObjectLeaks(attObj.id); // This bug affects dynamic publishing only
			r = document.getElementById(attObj.id);	
		}
		else if (ua.webkit && ua.webkitVersion < 312) { // Older webkit engines ignore the object element's nested param elements: fall back to the proprietary embed element
			var e = document.createElement("embed");
			e.setAttribute("type", FLASH_MIME_TYPE);
			for (var k in attObj) {
				if (attObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
					if (k == "data") {
						e.setAttribute("src", attObj[k]);
					}
					else if (k.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
						e.setAttribute("class", attObj[k]);
					}
					else if (k != "classid") { // Filter out IE specific attribute
						e.setAttribute(k, attObj[k]);
					}
				}
			}
			for (var l in parObj) {
				if (parObj[l] != Object.prototype[l]) { // Filter out prototype additions from other potential libraries
					if (l != "movie") { // Filter out IE specific param element
						e.setAttribute(l, parObj[l]);
					}
				}
			}
			el.parentNode.replaceChild(e, el);
			r = e;
		}
		else { // Well-behaving browsers
			var o = document.createElement(OBJECT);
			o.setAttribute("type", FLASH_MIME_TYPE);
			for (var m in attObj) {
				if (attObj[m] != Object.prototype[m]) { // Filter out prototype additions from other potential libraries
					if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
						o.setAttribute("class", attObj[m]);
					}
					else if (m != "classid") { // Filter out IE specific attribute
						o.setAttribute(m, attObj[m]);
					}
				}
			}
			for (var n in parObj) {
				if (parObj[n] != Object.prototype[n] && n != "movie") { // Filter out prototype additions from other potential libraries and IE specific param element
					createObjParam(o, n, parObj[n]);
				}
			}
			el.parentNode.replaceChild(o, el);
			r = o;
		}
		return r;
	}

	function createObjParam(el, pName, pValue) {
		var p = document.createElement("param");
		p.setAttribute("name", pName);	
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	
	function hasPlayerVersion(rv) {
		return (ua.playerVersion[0] > rv[0] || (ua.playerVersion[0] == rv[0] && ua.playerVersion[1] > rv[1]) || (ua.playerVersion[0] == rv[0] && ua.playerVersion[1] == rv[1] && ua.playerVersion[2] >= rv[2])) ? true : false;
	}
	
	/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
	*/	
	function createCSS(sel, decl) {
		if (ua.ie && ua.mac) {
			return;
		}
		var h = document.getElementsByTagName("head")[0], s = document.createElement("style");
		s.setAttribute("type", "text/css");
		s.setAttribute("media", "screen");
		if (!(ua.ie && ua.win) && typeof document.createTextNode != UNDEF) {
			s.appendChild(document.createTextNode(sel + " {" + decl + "}"));
		}
		h.appendChild(s);
		if (ua.ie && ua.win && typeof document.styleSheets != UNDEF && document.styleSheets.length > 0) {
			var ls = document.styleSheets[document.styleSheets.length - 1];
			if (typeof ls.addRule == OBJECT) {
				ls.addRule(sel, decl);
			}
		}
	}
	
	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/SWFObject_2_0_documentation
		*/ 
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr) {
			if (!ua.w3cdom || !objectIdStr || !swfVersionStr) {
				return;
			}
			var regObj = {};
			regObj.id = objectIdStr;
			var v = swfVersionStr.split(".");
			regObj.swfVersion = [parseInt(v[0], 10), parseInt(v[1], 10), parseInt(v[2], 10)];
			regObj.expressInstall = xiSwfUrlStr ? xiSwfUrlStr : false;
			regObjArr[regObjArr.length] = regObj;
			createCSS("#" + objectIdStr, CSS_HIDDEN);
		},
		
		getObjectById: function(objectIdStr) {
			var r = null;
			if (ua.w3cdom && isDomLoaded) {
				var o = document.getElementById(objectIdStr);
				if (o) {
					var n = o.getElementsByTagName(OBJECT)[0];
					if (!n || (n && typeof o.SetVariable != UNDEF)) {
				    	r = o;
					}
					else if (typeof n.SetVariable != UNDEF) {
						r = n;
					}
				}
			}
			return r;
		},
		
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj) {
			if (!ua.w3cdom || !swfUrlStr || !replaceElemIdStr || !widthStr || !heightStr || !swfVersionStr) {
				return;
			}
			widthStr += ""; // Auto-convert to string to make it idiot proof
			heightStr += "";
			if (hasPlayerVersion(swfVersionStr.split("."))) {
				createCSS("#" + replaceElemIdStr, CSS_HIDDEN);
				var att = (typeof attObj == OBJECT) ? attObj : {};
				att.data = swfUrlStr;
				att.width = widthStr;
				att.height = heightStr;
				var par = (typeof parObj == OBJECT) ? parObj : {};
				if (typeof flashvarsObj == OBJECT) {
					for (var i in flashvarsObj) {
						if (flashvarsObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + i + "=" + flashvarsObj[i];
							}
							else {
								par.flashvars = i + "=" + flashvarsObj[i];
							}
						}
					}
				}
				addDomLoadEvent(function() {
					createSWF(att, par, replaceElemIdStr);
					createCSS("#" + replaceElemIdStr, CSS_VISIBLE);
				});
			}
			else if (xiSwfUrlStr && !isExpressInstallActive && hasPlayerVersion([6,0,65]) && (ua.win || ua.mac)) {
				createCSS("#" + replaceElemIdStr, CSS_HIDDEN);
				addDomLoadEvent(function() {
					var regObj = {};
					regObj.id = regObj.altContentId = replaceElemIdStr;
					regObj.width = widthStr;
					regObj.height = heightStr;
					regObj.expressInstall = xiSwfUrlStr;
					showExpressInstall(regObj);
					createCSS("#" + replaceElemIdStr, CSS_VISIBLE);
				});
			}
		},
		
		getFlashPlayerVersion: function() {
			return { major:ua.playerVersion[0], minor:ua.playerVersion[1], release:ua.playerVersion[2] };
		},
		
		hasFlashPlayerVersion: function(versionStr) {
			return hasPlayerVersion(versionStr.split("."));
		},
		
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3cdom && isDomLoaded) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			}
			else {
				return undefined;
			}
		},
		
		createCSS: function(sel, decl) {
			if (ua.w3cdom) {
				createCSS(sel, decl);
			}
		},
		
		addDomLoadEvent:addDomLoadEvent,
		
		addLoadEvent:addLoadEvent,
		
		getQueryParamValue: function(param) {
			var q = document.location.search || document.location.hash;
			if (param == null) {
				return q;
			}
		 	if(q) {
				var pairs = q.substring(1).split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return pairs[i].substring((pairs[i].indexOf("=") + 1));
					}
				}
			}
			return "";
		},
		
		// For internal usage only
		expressInstallCallback: function() {
			if (isExpressInstallActive && storedAltContent) {
				var obj = document.getElementById(EXPRESS_INSTALL_ID);
				if (obj) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					storedAltContent = null;
					isExpressInstallActive = false;
				}
			} 
		}
		
	};

}();

/*-------- IMPORT FROM ( Name [ JS_FILE_RP2SCRIPT ], Type [ H ], Class [ WebComponetVo ] ) --------*/
/**
 * Muestra el layer con la informaci�n del term�metro
 */

function showThermometer(custID)

{


	var dnun_src = getCurrentUrlBase() +  '/jm/item?act=showThermLayer&vip3=Y&cust_id='+custID ;

	addEvent(window, 'resize', readjustContent);
	addEvent(window, 'scroll', readjustContent);

	//Creamos el DIMMER
	createDimmerDiv();

	//Creamos el contenido
	//si quieren modificar el ancho del form modificar esto cnt_width
	createDynamicContent(img_src, loading_width, loading_height, dnun_src, '520px');


	return ;

}
/*-------- IMPORT FROM ( Name [ JS_RELADTED_ITEMS ], Type [ H ], Class [ WebComponetVo ] ) --------*/
var relatedItems = {

    items: new Array(),

    itemId: 0,

    template: '',

    pos: 0,

    show: 4,

    controller: 'ml.freelisting.ri.web.RelatedItemsController',

	request: null,

    
	/*
	 * aborta la ejecucion ocultando el div
	 */
	abort: function(){
		document.getElementById('ml-related-items').style.display = "none";
    },

	/*
	 * Si se esta llamando de la vip se para el item id para que el mismo sea excluido
	 */
	setItemId: function(itemId){
        relatedItems.itemId = itemId;

    },
	
	/*
	 * Cantidad de items que se van amostrar
	 */
	setShow: function(show){

        relatedItems.show = show;

    },

    

    /*
     CallBack del request ajax
     */
    processRequest: function(){

        if (relatedItems.request.readyState == 4) {

            if (relatedItems.request.status == 200) {
			
			try
			  {
				var responseXML = relatedItems.request.responseXML;
                relatedItems.processXML(responseXML);
			  }
			catch(err)
			  {
				relatedItems.abort();
			  }



                

            }

            else {

                relatedItems.abort();

            }

        }

    },

    

    /*

     Ordena los items que se van a mostrar

     */

    shortItems: function(ranking){

		for (var k in ranking) {
		
			if (typeof(ranking[k]) != "function"){
		
				ranking[k].sort( function (){return (Math.round(Math.random())-0.5);} );

				for (i = 0; i < ranking[k].length; i++) {

					relatedItems.items.push(ranking[k][i]);

				}
			}

        }

        

        //lleno los espacios que faltan en el array con vacios

        var i = (relatedItems.items.length - (parseInt(relatedItems.items.length / relatedItems.show) * relatedItems.show));

        

        if (i != 0) {

            var toAdd = relatedItems.show - i;

            

            for (var i = 0; i < toAdd; i++) {

                relatedItems.items.push('');

            };

		}

        

    },

    

    

    /*

     Inicializa la carga los items relacionados

     */

    load: function(url){

    

        relatedItems.request = GetXmlHttpRequest(relatedItems.processRequest);

        relatedItems.request.open("GET", url, true);

        relatedItems.request.send(null);

        

    },

    

    

    /**

     Inicializa la carga los items relacionados

	 @param urlParams array

     */

    init: function(urlParams){

    

        var url = 'http://' + window.location.host + '/jm/' + relatedItems.controller + '?';

        

        for (var k in urlParams) {

            url = url + k + '=' + encodeURIComponent(urlParams[k]) + '&';

        };

        

        relatedItems.load(url);

        

    },

    

    

    /*

     Realiza los remplazos en el template y lo escribe en el html

     @param from int

     */

    replaceAndWrite: function(from){

    

        var templateForReplace = relatedItems.template;

        

        var itemsToShow = relatedItems.items.slice(from, from + relatedItems.show);

		

        for (var i = 0; i < itemsToShow.length; i++) {
		
			//FIX TEMPORAL
			if(visualId == "DRT"){
				itemsToShow[i] = itemsToShow[i].replace(/www.mercadolibre./g,'www.deremate.');
			}

           	document.getElementById("ml-related-item-" + (i + 1)).innerHTML = itemsToShow[i];
			
        };
        
        relatedItems.showBottons();
        
    },
  

    /*
     Muestra los botones correspondientes
     */

    showBottons: function(){
        if (relatedItems.hasNext()) 
            document.getElementById('ml-relate-items-next').style.visibility = "visible";
        else 
            document.getElementById('ml-relate-items-next').style.visibility = "hidden";
       
        if (relatedItems.hasPrev()) 
            document.getElementById('ml-relate-items-prev').style.visibility = "visible";
        else 
            document.getElementById('ml-relate-items-prev').style.visibility = "hidden";
        

    },


    /*
     Consulta si hay siguiente
     */
    hasNext: function(){
        return ((relatedItems.pos + relatedItems.show) < relatedItems.items.length);
        
    },

    /*
     Muestra los siguientes
     */

    next: function(){
        if (relatedItems.hasNext()) {
            relatedItems.pos = relatedItems.pos + relatedItems.show;
            relatedItems.replaceAndWrite(relatedItems.pos);
        }
    },
  

    /*
     Consulta si hay anterior
     */

    hasPrev: function(){
        return (relatedItems.pos > 0);

        

    },

    

    /*

     Muestra los anteriores

     */

    prev: function(){

        if (relatedItems.hasPrev()) {

            relatedItems.pos = relatedItems.pos - relatedItems.show;

            relatedItems.replaceAndWrite(relatedItems.pos);

        }

    },

    

    /*

     Procesa el XML

     */

    processXML: function(responseXML){

    	

        var items = (responseXML.getElementsByTagName("item"));


        // consulto hay items

        

        if (items.length != 0) {

			if(typeof (responseXML.getElementsByTagName("template")[0]) != 'undefined'){
				if(responseXML.getElementsByTagName("template")[0] != null){
					relatedItems.template = responseXML.getElementsByTagName("template")[0].childNodes[0].nodeValue;
				}
			}


            
            var ranking = new Array();

            

            

            for (var i = 0; i < items.length; i++) {

            

                var itemId = items[i].getAttribute("id");

					

                var rankingId = items[i].getAttribute("rank");

					

                var itemHtml = items[i].childNodes[0].nodeValue;

                

                // nunca muestro el item que ya esto viendo

                if (relatedItems.itemId != itemId) {

				

                    // si no esta creado el array lo creo

                    if ((typeof(ranking[rankingId]) + "") == "undefined") {

                        ranking[rankingId] = new Array();

                        

                    }

                    

                    //agrego el html del item al ranking correspondiente.

                    ranking[rankingId].push(itemHtml);

                    

                }

                

            };

			

            relatedItems.shortItems(ranking);

            relatedItems.replaceAndWrite(0);
			
			document.getElementById('ml-related-items-box').style.display = "block";
			document.getElementById('ml-related-items-load').style.display = "none";

        }
		else{
			relatedItems.abort();
		}
        

    }

    

};

/*-------- IMPORT FROM ( Name [ VIP3_LIST_URLS ], Type [ H ], Class [ WebComponetVo ] ) --------*/
// Devuelve false y envia al browser al back si hay history
function listBack(e) {
	//tengo historial
	if(history.length > 1){
	
		//detengo el browser
		if (document.all != undefined){

			document.execCommand('Stop');
		}
		else{

			window.stop();
		}
		// envio al back

		history.back();

		return false;
		}
	
	else{
		return true;
	}

}

// Inicializa el boton de volver al lisado
function initListButton() {
	
	// Remuevo el http://
	var myReferrer = document.referrer;
	
	var oListButton = document.getElementById("listButton");
	
	var a = document.createElement('a');
	
	a.href = urlLastCategPath;
	
	if(isList(myReferrer)){
			a.appendChild(document.createTextNode('Volver al listado'));
			a.onclick = listBack;
			
			if(!(document.referrer == "")){
					a.href = document.referrer;
			}
                       
		
	}
	else{
			a.appendChild(document.createTextNode('Ir al listado'));
	}
	
	oListButton.appendChild(a);
	
	
	
}

// valida si el referar es listado
function isList(myReferrer) {

	if(myReferrer.indexOf("http://") == 0 ){

		// Remuevo el http://
		var myReferrerTemp = myReferrer.substring(7);
		for (i=0;i<subdomains.length;i++){
			if (myReferrerTemp.indexOf(subdomains[i]) == 0 )
					return true;
		}
	
	}

	return false;
}

// Inicializa el boton del listado
YAHOO.util.Event.onDOMReady(initListButton);
/*-------- IMPORT FROM ( Name [ VP3_S_VISOR_SCRIPT_I ], Type [ H ], Class [ WebComponetVo ] ) --------*/
//Genera el layer y la imagen ampliada.
function showVisor(){
	rotacionDeImagenes = false;
	cancelLoading = 0;
	addEvent(window, 'resize', readjustContent);
    addEvent(window, 'scroll', readjustContent);
	
	createDimmerDiv();
	if(loadingIsEnabled) createLoadingDiv(img_src, loading_width, loading_height);
	
	if(contentIsEnabled){ 
		img = new Image();
		var src = document.getElementById('mainImg').src;
		src = src.replace(imgSize250, imgSize500);
		img.id = 'imagenPrecargada';
		img.onload = preLoad;
		
		img.src = src;
	}
}

function preLoad(){
	
	if (cancelLoading == 0) {
		
		postProcess = selectImg;
		postClosing = removeSetContentWidthEvent;
		
		theWidth = getBrowserWidth();
		
		if (theWidth <= 800)
			createContent(getCurrentUrlBase() + srcImgAmpl + actual, '500px');
		else 
			createContent(getCurrentUrlBase() + srcImgAmpl + actual, '650px');
		
		
	}
}

function selectImg(){
	setContentWidth();
	postProcess = null;
}

function removeSetContentWidthEvent(){
    removeEvent(window, 'resize', setContentWidth);
    postClosing = null;
}

//Obtiene la posicion absoluta de un elemento.
function getAbsoluteElementPosition(aName) {
	element = document.getElementById(aName);
	if(!element)
		element = document.getElementsByName(aName)[0];

	if (!element) return { top:0,left:0 };

	var y = 0;
	var x = 0;
	while (element.offsetParent) {
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	}
	
	return {top:y,left:x};
}

this.imagelink = superPonerImagenDeZoom; 

function superPonerImagenDeZoom(){
	
	var imageClass = "";

	var defaultClass = "";
	
	var overClass = "imageOver";
	
	var a = document.getElementById("linkMainImg");
		
	var img = document.getElementById("mainImg");		
		
	if(img.className == imageClass || imageClass == ""){
					a.style.position = "static";		
					if(a.getElementsByTagName("span").length > 0) a.removeChild(a.getElementsByTagName("span")[0]);
					var span = document.createElement("span");	
					span.id = "imagenDeZoom";
					var image = img;
					span.style.position = "absolute";
					var pos = getAbsoluteElementPosition('mainImg');
					span.style.top = pos.top + "px";
					span.style.left = pos.left + "px";
					span.style.width = img.offsetWidth + "px";
					span.style.height = img.offsetHeight + "px";
					span.style.cursor = "pointer";
					span.out = span.className = defaultClass;
					span.over = overClass;
					span.a = img.a = a;	
					span.j = img;				
					a["span"] = span;					
					span.onmouseover = img.onmouseover = function(){ 
						this.a["span"].className = this.a["span"].over;
					};
					span.onmouseout = img.onmouseout = function(){
						this.a["span"].className = this.a["span"].out;
					};
					a.appendChild(span);			
				};		
				
};


function superPonerDivVideo(){
	
	var div = document.getElementById("divVideo");
	
	div.style.position = "static";	
	
	if (div.getElementsByTagName("span").length > 0) div.removeChild(div.getElementsByTagName("span")[0]);
	
	var span = document.createElement("span");
	
	span.id = "spanVideo";
	span.className = "spanVideoAttr";
	
	var pos = getAbsoluteElementPosition('tdMainImg');
	
	span.style.top = pos.top + "px";
	span.style.left = pos.left + "px";
	span.style.width = "280px";
	span.style.height = "260px";
	span.style.cursor = "pointer";
	
	span.onclick = function(){
		document.getElementById('myytplayer').playVideo();
	};
	
	div["span"] = span;					
	
	div.appendChild(span);	
		
}



YAHOO.util.Event.onDOMReady(imagelink);
YAHOO.util.Event.onDOMReady(superPonerDivVideo);
addEvent(window,"load",imagelink);
addEvent(window,"resize",imagelink);

//Ajusta el tama�o del visor al del browser.
function checkBrowserWidth()
{
	var theWidth = getBrowserWidth();
	videoElement = document.getElementById('myytplayer');
	
	if(videoElement != null)
		superPonerDivVideo();
	
	if (theWidth >= 950) {
		document.getElementById('mainImg').width = maxSize;
		if (videoElement != null)
			videoElement.width = 280;
	}else if(theWidth >= 800 && theWidth < 950){
		document.getElementById('mainImg').width = maxSize*0.95;
		if(videoElement != null)
			videoElement.width = 266;
	}else if(theWidth >= 650 && theWidth < 850){
		document.getElementById('mainImg').width = maxSize*0.9;
		if(videoElement != null)
			videoElement.width = 252;
	}else if(theWidth < 650){
		document.getElementById('mainImg').width = maxSize*0.85;
		if(videoElement != null)
			videoElement.width = 238;
	}
}

//Obtiene el tama�o del browser.
function getBrowserWidth()
{
	if (window.innerWidth){
		return window.innerWidth;
	}else if (document.documentElement && document.documentElement.clientWidth != 0){
		return document.documentElement.clientWidth;
	}else if (document.body){
		return document.body.clientWidth;
	}
	return 0;
}

//Carga la imagen seleccionada como principal.
function loadImage(nroFoto){
		
	if(nroFoto != actual){
		document.getElementById('img'+actual).className = 'desOpacarImagen';
	}
	
	actual = nroFoto;
	
	var src = document.getElementById('img'+actual).src;
	src = src.replace(imgSize90, imgSize250);
	
	document.getElementById('mainImg').src = src;
	
	preImg = new Image();
	preImg.onload = updateMaxSize;
	preImg.src = src;
	
	document.getElementById('img'+actual).className = 'imagenSeleccionada';
	
	if (!vid == "") {
		document.getElementById('divMainImg').style.display = 'block';
		document.getElementById('divVideo').style.display = 'none';
	}
	this.imagelink = superPonerImagenDeZoom;
	imagelink();
}


function updateMaxSize(){
	maxSize = preImg.width;
	//document.getElementById("mainImg").width = maxSize;
	checkBrowserWidth();
}

function loadVideo(nroFoto){
		
	this.imagelink = function(){}; 
	checkBrowserWidth();
	document.getElementById('img'+actual).className = 'desOpacarImagen';
	
	actual = nroFoto;

	document.getElementById('img'+actual).className = 'imagenSeleccionada';
	
	document.getElementById('divVideo').style.display = 'block';
	document.getElementById('divMainImg').style.display = 'none';
}

//Muestra la imagen anterior a la actual.
function shiftLeft(){
	imgDesplazadas --
	if(imgDesplazadas >= 1){
		document.getElementById('div'+imgDesplazadas).style.display = 'block';
		document.getElementById('extDiv'+imgDesplazadas).style.margin = '2px';
		document.getElementById('div'+(imgDesplazadas+fotosAMostrar)).style.display = 'none';
		document.getElementById('extDiv'+(imgDesplazadas+fotosAMostrar)).style.margin = '0px';
		document.getElementById('shiftRight').style.display = 'inline';
		if(imgDesplazadas == 1)
			document.getElementById('shiftLeft').style.display = 'none';
	}
}

//Muestra la imagen posterior a la actual.
function shiftRight(){
	if(imgDesplazadas < totalFotos){
		document.getElementById('div'+imgDesplazadas).style.display = 'none';
		document.getElementById('extDiv'+imgDesplazadas).style.margin = '0px';
		document.getElementById('div'+(imgDesplazadas+fotosAMostrar)).style.display = 'block';
		document.getElementById('extDiv'+(imgDesplazadas+fotosAMostrar)).style.margin = '2px';
		document.getElementById('shiftLeft').style.display = 'inline';
		if(imgDesplazadas+fotosAMostrar == totalFotos)
			document.getElementById('shiftRight').style.display = 'none';
		imgDesplazadas ++;
	}
}

function opacarImagen(imagen){
	var img = document.getElementById('img'+imagen);
	if(img != document.getElementById('img'+actual))
		img.className = 'opacarImagen';
}

function desOpacarImagen(imagen){
	var img = document.getElementById('img'+imagen);
	if(img != document.getElementById('img'+actual))
		img.className = 'desOpacarImagen';
}

function rotarImagenes(){

	if (rotacionDeImagenes) {
	
		nroImg = actual + 1;
		
		if (nroImg > totalFotos) 
			nroImg = 1;
		
		loadImage(nroImg);
		
		setTimeout("rotarImagenes()", 3500);
	}
}

function incrementarCantFotosCargadas(){
	cantFotosCargadas ++;
	
	if(vid.length == 0 && cantFotosCargadas == totalFotos && totalFotos > 1 && rotacionDeImagenes == true)
		rotarImagenes();
}

/*-------- IMPORT FROM ( Name [ VIP3_JS_MLIDER ], Type [ H ], Class [ WebComponetVo ] ) --------*/
document.onclick = hideHelp;
		
		var helpPop;
		var baseT;
		var baseL;
		var popY;
		var popX;
		var hideFlag = false;
		
		function asd(){
		                alert(helpPop.style.getAttribute('top'));
		                alert(helpPop.style.getAttribute('left'));
		}
		
		function showHelp(pop_id,clickevent) {
		
			hideHelp();
		
			if (document.all) { // MSIE
				var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
				popX = clickevent.clientX;
				popY = clickevent.clientY;
				baseT = iebody.scrollTop;
				baseL = iebody.scrollLeft;
                                popX += baseL;
                                popY +=baseT;
			} else { // Netscape, etc.
				popX = clickevent.clientX;
				popY = clickevent.clientY;
				baseT = window.pageYOffset
				baseL = window.pageXOffset
                                popX += baseL;
                                popY +=baseT;
			}
		
			popY -= -26;
			popX -= 140;
		 
			helpPop = document.getElementById(pop_id);
		
		
			if( helpPop.style.setAttribute ){ //IE
				helpPop.style.setAttribute('display', 'block');
				helpPop.style.setAttribute('visibility','visible');
				helpPop.style.setAttribute('top',parseInt(popY)+'px');
			helpPop.style.setAttribute('left',parseInt(popX)+'px');
		        helpPop.style.setAttribute('z-index','3');
			}else{
				helpPop.setAttribute('style',"display:block;visibility:visible;top:"+parseInt(popY)+"px;left:"+parseInt(popX)+"px;position:absolute");

			}
			hideFlag=false;
		}
		
		var intervalID;
		function delayHide( millis ){
			if (millis == null) millis = 1000;
			deleteDelayHide();
			intervalID = setInterval('hideHelp();', millis);
		}
		
		function deleteDelayHide(){
			window.clearInterval( intervalID );
		}
		
		function hideHelp(){
			if(hideFlag){
				if(helpPop!=null){
					if( helpPop.style.setAttribute ){ //IE
						helpPop.style.setAttribute('display', 'none');
						helpPop.style.setAttribute('visibility','hidden');
					}else{
						helpPop.setAttribute('style',"display:none;visibility:hidden;");
					}
					helpPop = null;
				}
			}else{
				hideFlag=true;
			}
		}
		
		function realignOpenGlobito(){
			if(helpPop!=null){
				var offsetT;
				var offsetL;
				if (document.all) { // MSIE
					offsetT = document.body.scrollTop;
					offsetL = document.body.scrollLeft;
				} else { // Netscape, etc.
					offsetT = window.pageYOffset
					offsetL = window.pageXOffset
				}
				var diffT = baseT-offsetT;
				var diffL = baseL-offsetL;
				
				if( helpPop.style.setAttribute ){ //IE
					helpPop.style.setAttribute('top',parseInt(diffT+popY));
					helpPop.style.setAttribute('left',parseInt(diffL+popX));
				}else{
					helpPop.setAttribute('style',"top:"+parseInt(diffT+popY)+"px;left:"+parseInt(diffL+popX)+"px;position:fixed");
				}
			}
		}
/*-------- IMPORT FROM ( Name [ VIP3_SMARTAD ], Type [ H ], Class [ WebComponetVo ] ) --------*/
function setContextCookie(val){

	var urlBase=document.getElementsByTagName("base")[0].href.replace("www","pmspxl");

	urlBase=urlBase.substring(0,7+urlBase.substring(7).indexOf("/"));

	url = urlBase+"/jm/PmsPixel?ck="+val;

	var pixelDiv = document.getElementById("pmspxl");

	if(pixelDiv!=null)

		pixelDiv.innerHTML="<img width=0 height=0 src='"+url+"'>";

}

/*-------- IMPORT FROM ( Name [ VIP3_HOME_TRACK ], Type [ H ], Class [ WebComponetVo ] ) --------*/
function getTrackCookie(){

  if(getCookieValue("clicked")== null || getCookieValue("clicked")=="0"){	

  	var value = getCookieValue("track_info");

  	if(value!=null){

  		arrayKeys = value.split(":");   	

  		var out = "/jm/ml.track.me?save_ck=N";

  		for (i=1; i < arrayKeys.length; i++)

    		out += "&k"+i+"="+arrayKeys[i];

		var img = new Image().src = out;

	  	setCookie("clicked","1",null);

  	}

  }

}

YAHOO.util.Event.onDOMReady(getTrackCookie);
/*-------- IMPORT FROM ( Name [ VIP3_IFRAME_BANNER ], Type [ H ], Class [ WebComponetVo ] ) --------*/
function createTag(filename, filetype, appendTo, elementname){
 if (filetype=="js"){
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", filename);
 }
 else if (filetype=="css"){
  var fileref=document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);
 }
 else if (filetype=="ifrm"){
  var fileref=document.createElement("iframe");
  fileref.id=elementname;
  fileref.name=elementname;
  fileref.src=filename;
  fileref.style.display="inline";
  fileref.style.height="90px";
  fileref.style.width="728px";
  fileref.frameBorder="0";
  fileref.setAttribute("scrolling","no");

  if (typeof fileref!="undefined"){
  	appendTo.appendChild(fileref);
  	return;
  }
 }
 if (typeof fileref!="undefined"){
  	document.getElementsByTagName(appendTo)[0].appendChild(fileref);
	}
}
/*-------- IMPORT FROM ( Name [ VIP3_VAR_QUOTAS ], Type [ P ], Class [ WebComponetVo ] ) --------*/
var sizeQuotas = 500;
var mAlerta = 'Debes seleccionar una cuota y una tarjeta';
/*-------- IMPORT FROM ( Name [ VIP3_LIST_URL_VAR ], Type [ P ], Class [ WebComponetVo ] ) --------*/
var listUrl = "http://listado.mercadolibre.com.ar/";
/*-------- IMPORT FROM ( Name [ VIP3_JS_ERROR_LOG ], Type [ P ], Class [ WebComponetVo ] ) --------*/
MLJsLogger.setLogProc('VIP3');
MLJsLogger.setLevelError(0);
/*-------- IMPORT FROM ( MyClass [ ml.itemPage.view.SubDomainJsView ], Method [ toArrayJs ], Class [ WebComponetClass ] ) --------*/
var subdomains=new Array("accesorios","accesorios-vehiculos","animales","autos","calzado","camaras-digitales","casas","celulares","coleccionables","computacion","departamentos","deportes","electrodomesticos","electronica","fotografia","hogar","home-theaters","inmuebles","instrumentos","ipod","joyas","lcd","libros","listado","motos","mp3","mp4","musica","navidad","notebooks","peliculas","plasmas","playstation-2","relojes","reproductores-dvd","ropa","servicios","stereos","telefonia","televisores","tuning","vehiculos","videojuegos","wireless","zapatillas");
/* --------- Gen:12 --------- */

