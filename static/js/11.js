function PCMSAD(PID) {
  this.ID        = PID;
  this.PosID  = 0; 
  this.ADID		  = 0;
  this.ADType	  = "";
  this.ADName	  = "";
  this.ADContent = "";
  this.PaddingLeft = 0;
  this.PaddingTop  = 0;
  this.Width = 0;
  this.Height = 0;
  this.IsHitCount = "N";
  this.UploadFilePath = "";
  this.URL = "";
  this.SiteID = 0;
  this.ShowAD  = showADContent;
  this.Stat = statAD;
}

function statAD(id) {
	var sp = document.createElement("SCRIPT");
	sp.type = "text/javascript";
	sp.src = "http://90-designer.com/index.php?m=poster&c=index&a=show&siteid="+this.SiteID+"&id="+id+"&spaceid="+this.PosID;
	document.body.appendChild(sp);
}

function showADContent() {
  var content = this.ADContent;
  var isIE=!!window.ActiveXObject;
  var str = "<div id='Service_"+this.PosID+"'>";
  var AD = eval('('+content+')');
  var count = 0;
  if(AD.ADText.length){
	  count = AD.ADText.length;
  }
  for(var i=0;i<count;i++){
	if (isIE){

		if (document.readyState=="complete"){
			this.Stat(AD.ADText[i].textID);
		} else {
			document.onreadystatechange=function(){
				if(document.readyState=="complete") this.Stat(AD.ADText[i].textID);
			}
		}
	} else {
		this.Stat(AD.ADText[i].textID);
	}
	  str += "<li><a href="+this.URL+"&a=poster_click&siteid="+this.SiteID+"&id="+AD.ADText[i].textID+"&url="+AD.ADText[i].textLinkUrl+" target='_blank' title='"+AD.ADText[i].textContent+"'>"+AD.ADText[i].textContent+"</a></li>";
	}
  str += "</div>";
  document.write(str);
}
 
var cmsAD_12 = new PCMSAD('cmsAD_12'); 
cmsAD_12.PosID = 11; 
cmsAD_12.ADID = 12; 
cmsAD_12.ADType = "text"; 
cmsAD_12.ADName = "熊猫 - 49525253"; 
cmsAD_12.ADContent = "{'ADText':[  {'textID':'12','textContent':'熊猫 - Simplee','textLinkUrl':'http%3A%2F%2Fsighttp.qq.com%2Fauthd%3FIDKEY%3D1eb73669e1cf80d3a0d84c691830dbd45c65d656236c5940'}  , {'textID':'11','textContent':'熊猫 - Bill','textLinkUrl':'http%3A%2F%2Fwpa.qq.com%2Fmsgrd%3Fv%3D3%26uin%3D1005098959%26site%3Dqq%26menu%3Dyes'} ]}"; 
cmsAD_12.URL = "http://90-designer.com/index.php?m=poster&c=index"; 
cmsAD_12.SiteID = 1; 
cmsAD_12.Width = 0; 
cmsAD_12.Height = 0; 
cmsAD_12.UploadFilePath = ""; 
cmsAD_12.ShowAD();
