function createXMLHttpRequest(cbFunc)
{
	var XMLhttpObject = null;
	try{
		XMLhttpObject = new XMLHttpRequest();
	}catch(e){
		try{
			XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				return null;
			}
		}
	}
	if (XMLhttpObject) XMLhttpObject.onreadystatechange = cbFunc;
	return XMLhttpObject;
}

function $(tagId)
{
	return document.getElementById(tagId);
}

function loadDataFile(fName)
{
	httpObj = createXMLHttpRequest(displayData);
	if (httpObj) { httpObj.open("GET",fName,true); httpObj.send(null); }
}

function displayData()
{
	if ((httpObj.readyState == 4) && (httpObj.status == 200)) {
		$("result").innerHTML = parseTabText(httpObj.responseText);
	}
}

function parseTabText(tabText)
{
	var resultText = ""; var pYear = 3000;
	lineData = tabText.split(String.fromCharCode(13)); // CR
	n = lineData.length;
	if (n>5) { n=5; }

	resultText += "<TABLE border=\"3\" width=\"100%\"><TBODY><TR>";
	resultText += "<TD>";
	resultText += "<P align=\"center\">";
	resultText += "Kako Homepage (kako.com)<br>";
	resultText += "<FONT size=\"-1\">";
	resultText += "<br>";
	resultText += "<a href=\"../index.html\">[小ネタindexページに戻る]</a>";
	resultText += "<a href=\"../../\">/</a><br>";
	resultText += "<B><a href=\"http://twitter.com/kakocom/\">Twitter</a></B>";
	resultText += "</FONT>";
	resultText += "</P>";
	resultText += "</TD>";
	resultText += "<TD>";
	resultText += "<FONT size=\"-2\">";
	resultText += "最近の更新　・・・　";
	resultText += "携帯型コンピュータ、ゲーム機関係、電子工作、改造等の小ネタ";
	for (var i=0; i<n; i++) {
		wData = lineData[i].split(String.fromCharCode(9)); // TAB
		resultText += "";
		Year_Data=wData[0]; ID_Data=wData[1]; TITLE_Data=wData[2]; Key1=wData[3]; Key2=wData[4];
		Year = eval(Year_Data); Year_Data = ""+ Year;
		resultText += "<br>　(小ネタ " + Year_Data + "-" +ID_Data + ") ";
		resultText += "<a href=../" + Year_Data + "-" +ID_Data;
		resultText += "/" + Year_Data + "-" +ID_Data +".html";
		resultText += ">" + TITLE_Data + "</a>";
		pYear = Year_Data;
	}
	resultText += "</FONT>";
	resultText += "</TD>";
	resultText += "</TR></TBODY></TABLE>";
	resultText += "<BR>";
	return resultText;
}

