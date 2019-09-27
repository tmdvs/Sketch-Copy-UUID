const Document = require('sketch/dom').Document
const UI = require('sketch/ui')

function copyObjectUUID(context) {
  const selectedLayers = Document.getSelectedDocument().selectedLayers
  const layerIDs = selectedLayers.map(layer => {
    return layer.id
  })

  copyToClipboard(layerIDs.join(", "))

  UI.message(`Copied ${layerIDs.length} Artboard or Layer UUID(s) 🎉`)
}
          
function copyPageUUID(context) {
  const page = Document.getSelectedDocument().selectedPage

  copyToClipboard(page.id)
  UI.message(`Copied UUID for page "${page.name}" 🎉`)
}

function copyDocumentUUID(context) {
  const doc = Document.getSelectedDocument()

  copyToClipboard(doc.id)
  UI.message(`Copied document UUID 🎉`)
}
         
          
const copyToClipboard = (value) => {
  const pasteboard = NSPasteboard.generalPasteboard()
  pasteboard.declareTypes_owner( [ NSPasteboardTypeString ], null );
	pasteboard.setString_forType( value, NSPasteboardTypeString );
}