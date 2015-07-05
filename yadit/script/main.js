function yadit_toggle_ad_note(CatID, SubCatID, RecordID, note, prefix) {
    //debugger;
    if (prefix == null || prefix == undefined)
        prefix = '';
    var pos = $("#" + prefix + "yadit_ad_note_" + SubCatID + "_" + RecordID).children('.yadit_ad_note_icon').position();
    if (!document.getElementById(prefix + 'yadit_ad_note_float_' + SubCatID + '_' + RecordID)) 
    {
        if (note == undefined || note == "")
            return false;
        $("body").append('<div id="' + prefix + 'yadit_ad_note_float_' + SubCatID + '_' + RecordID + '" class="ad_notes_float"><div id="' + prefix + 'yadit_ad_note_float_' + SubCatID + '_' + RecordID + '_text" class="ad_notes_float_text">' + note + '</div></div>');
        var newPositionLeft = pos.left - ($("#" + prefix + "yadit_ad_note_float_" + SubCatID + "_" + RecordID).width()) + 30;
        $("#" + prefix + "yadit_ad_note_float_" + SubCatID + "_" + RecordID).css('left', newPositionLeft);
        var newPositionTop = pos.top + ($("#" + prefix + "yadit_ad_note_float_" + SubCatID + "_" + RecordID).height()) - 45;
        $("#" + prefix + "yadit_ad_note_float_" + SubCatID + "_" + RecordID).css('top', newPositionTop);
    } 
    else 
    {
        $("#" + prefix + "yadit_ad_note_float_" + SubCatID + "_" + RecordID).remove();
    }
}

function yadit_get_note(SubCatID, RecordID) {
  var yadit_ad_note_id = 'yadit_ad_note_' + SubCatID + '_' + RecordID;
  var note = localStorage.getItem(yadit_ad_note_id);
  if (note != null) {
    return note;
  } else {
    return '';
  }
}

function yadit_add_note(path, CatID, SubCatID, RecordID, note) {
    //debugger;
    if (path == null || path == undefined)
        path = '';
    note = $.trim(note);
    note = note.replace(/(\r\n|\n|\r)/gm, " ");
    var yadit_ad_note_id = 'yadit_ad_note_' + SubCatID + '_' + RecordID;
    //note = $.base64Encode(note);
    if (note != "") 
    {

        $('#' + yadit_ad_note_id).html('<div class="yadit_ad_note_icon" onmouseover="yadit_toggle_ad_note(\'' + CatID + '\',\'' + SubCatID + '\',\'' + RecordID + '\',\'' + note + '\');" onmouseout="yadit_toggle_ad_note(\'' + CatID + '\',\'' + SubCatID + '\',\'' + RecordID + '\');">Y</div>');

      //debugger;
      localStorage.setItem(yadit_ad_note_id, note);
    } 
    else 
    {
      //debugger;
      localStorage.removeItem(yadit_ad_note_id);
      $("#yadit_ad_note_" + SubCatID + "_" + RecordID).html('');
      $("#yadit_ad_note_" + SubCatID + "_" + RecordID).html('');
        
    }
}


var adjustMyFrameHeightOrig = adjustMyFrameHeight;

var adjustMyFrameHeight = function(id, fromIFrame) {
  var regex = /\w+_\w+_(\w+)_(\w+)_(\w+)/g;
  var adIdParts = regex.exec(id);
  var CatID = adIdParts[1];
  var SubCatID = adIdParts[2];
  var AdID = adIdParts[3];

  $('#'+id).contents().find('.innerDetails_table').prepend('\
                                <tr>\
                                <td align="right" valign="top" width="263">\
                                <div class="yadit_ad_notes">\
                                <textarea onfocus="fieldDefaultText(this,\'Enter note here...\');" onblur="parent.yadit_add_note(\'../\',\'' + CatID + '\',\''+SubCatID+'\',\''+AdID+'\',this.value);fieldDefaultText(this,\'Enter note here...\'); " onkeyup="textLimit(this,1000); document.getElementById(\'ad_notes\').scrollTop = document.getElementById(\'ad_notes\').scrollHeight;" id="ad_notes" cols="100%" rows="3" width="100%">' + yadit_get_note(SubCatID, AdID) + '</textarea>\
                                </div>\
                                </td>\
                                </tr>\
                            ');

  adjustMyFrameHeightOrig(id, fromIFrame);
}


// add new first column to table headers
var mainTables = $('.main_table');
mainTables.each(function() { $(this).find('tr:first').prepend('\
                                  <th style="width: 24px;" align="center">\
                                    Y\
                                  </th>\
                                  <th width="2">\
                                    <img src="http://images.yad2.co.il/Pic/yad2new/page/main_table_th_sep.jpg" width="2" alt="">\
                                  </th>\
                                  ') } );

var mainTablesAdRows = mainTables.find('[id^=tr_Ad]');
mainTablesAdRows.each(function() {
                              // parse id parts from tr id string ..
                              //debugger;
                              var regex = /\w+_\w+_(\w+)_(\w+)_(\w+)/g;
                              var adIdParts = regex.exec($(this).attr('id'));
                              var CatID = adIdParts[1];
                              var SubCatID = adIdParts[2];
                              var AdID = adIdParts[3];
                              var yaditAdId = "yadit_ad_note_" + SubCatID + "_" + AdID;
                              $(this).prepend('\
                                <td align="center" id="' + yaditAdId + '">\
                                  <div class="yadit_ad_note_icon" onmouseover="yadit_toggle_ad_note(\''+CatID+'\',\''+SubCatID+'\',\''+AdID+'\',\'filler\');" \
                                    onmouseout="toggle_ad_note(\''+CatID+'\',\''+SubCatID+'\',\''+AdID+'\',\'filler\'););">\
                                  </div>\
                              </td>\
                              <td>&nbsp;</td>\
                              ');
                              //debugger;
                              yadit_add_note('/', CatID, SubCatID, AdID, yadit_get_note(SubCatID, AdID));
                              } );

