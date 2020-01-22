const Document = require('sketch/dom').Document
const UI = require('sketch/ui')

// Copy selected artboard identifiers
export function copyArtboardUUIDs(context) {
  const selected = Document.getSelectedDocument().selectedLayers
  const artboardIds = selected.layers
    .filter(layer => layer.type =="Artboard" || layer.type == "SymbolMaster")
    .map(layer => layer.id)

  if(artboardIds.length > 0) {
    copyToClipboard(artboardIds, "artboard")
  } else {
    UI.message(`It looks like you haven't selected any artboards!`)
  }
}

// Copy selected layers identifiers
export function copyLayerUUIDs(context) {
  const selected = Document.getSelectedDocument().selectedLayers
  const layerIds = selected.layers
    .filter(layer => layer.type !="Artboard" || layer.type !="SymbolMaster")
    .map(layer => layer.id)

  if(layerIds.length > 0) {
    copyToClipboard(layerIds, "layer")
  } else {
    UI.message(`It looks like you haven't selected any layers!`)
  }
}
         
// Copy current page identifier
export function copyPageUUID(context) {
  const page = Document.getSelectedDocument().selectedPage
  copyToClipboard([page.id], "current page")
}

// Copy document identifier
export function copyDocumentUUID(context) {
  const doc = Document.getSelectedDocument()
  copyToClipboard([doc.id], "current document")
}
         
          
const copyToClipboard = (ids = [], type = "") => {
  const pasteboard = NSPasteboard.generalPasteboard()
  pasteboard.declareTypes_owner( [ NSPasteboardTypeString ], null );
  pasteboard.setString_forType( ids.join(", "), NSPasteboardTypeString );

  if(ids.length == 1) {
    UI.message(`📎  Copied ${type} UUID`)
  } else {
    UI.message(`📎  Copied ${ids.length} ${type} UUIDs`)
  }

}