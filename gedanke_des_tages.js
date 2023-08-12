// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const url = "https://dergutegedankedestages.de"
const req = new Request(url);
const html = await req.loadString();

// benoetigte Patterns

// patterns, die das Zitat umgeben
const startPatternZitatUndAutor = '<div class="ggquote">';
const endPatternZitatUndAutor = '</div>';

// der optionale Autor, der Teil des Zitats sein kann
const startPatternAutor = '<span class="ggAutor">'
const endPatternAutor = '</span>'

let patternNotFound = (pattern) => {
  let notification = new Notification();
  notification.title = "Muster nicht gefunden";
  notification.body = pattern + " wurde im HTML nicht gefunden.";
  notification.schedule();
}

const startIndex1 = html.indexOf(startPatternZitatUndAutor);

let zitat = null;
let autor = null;

if (startIndex1 !== -1) {
  // Index des Endes des Textabschnitts im HTML
  const endIndex1 = html.indexOf(endPatternZitatUndAutor, startIndex1);

  if (endIndex1 !== -1) {
    // Zitat und autor finden
    const foundText = html.substring(startIndex1 + startPatternZitatUndAutor.length, endIndex1);  

    // gibt's nen Autor?

    const startIndex2 = foundText.indexOf(startPatternAutor)
    if (startIndex2 !== -1) {
      zitat = foundText.substring(0, startIndex2)
      const endIndex2 = foundText.indexOf(endPatternAutor)
      if (endIndex2 !== -1) {
        autor = foundText.substring(startIndex2 + startPatternAutor.length, endIndex2)
      } else {
        patternNotFound(endPatternAutor)
      }
    } else {
        // gibt wohl keinen Autor
        zitat = foundText
    } 
  } else {
    patternNotFound(endPatternZitatUndAutor)
  }
} else {
  patternNotFound(startPatternZitatUndAutor)
}
if (zitat !== null){
  // finally, die Benachrichtigung
  let notification = new Notification()
  notification.title = 'Gedanke des Tages'
  let msg = zitat
  if (autor !== null) {
    msg += ' - ' + autor
  }
  notification.body = msg
  notification.schedule()
}

// fertig.

Script.complete()

