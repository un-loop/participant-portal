/*
 * CaseNoteCard Styles
 *
 * This contains all the styles for the CaseNoteCard container.
 */

export const styles = (/* theme */) => ({
  buttonStyle: {
    marginTop: '5px',
    marginBottom: '10px',
  },
  casenoteCardStyle: {
    marginLeft: '20px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '10px',
    height: '240px',
  },
  casenoteDescStyle: {
    height: '105px',
    marginTop: '-20px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: '0',
  },
  casenoteCardTitleStyle: {
    whiteSpace: 'nowrap',
    overflowY: 'hidden',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '10px',
  },
  dialogActionsStyle: {
    padding: '30px',
  },
  MUIRichTextEditorStyle: {
    border: '5px solid',
    padding: '10px',
  },
  dialogStyle: {
    padding: '20px',
  },
  dialogContentTextStyle: {
    color: 'black',
    marginBottom: '2px',
  },
  dialogContentTextFieldStyle: {
    marginTop: '2px',
    borderStyle: 'solid 4px grey',
  },
  saveDocumentButtonStyle: {
    borderStyle: 'solid 3px grey',
  },
});

export default styles;
