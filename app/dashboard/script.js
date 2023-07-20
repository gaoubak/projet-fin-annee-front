const fs = require('fs');

const foldersArray = [
  'regisseur',
  'monteur',
  'traducteur',
  'redacteur',
  'controle_qualite',
  'equipe_video',
  'graphiste',
  'traducteur_son',
  'responsable_publication',
  'responsable_marketing'
];

function createFolders() {
  foldersArray.forEach(folder => {
    fs.mkdir(folder, (err) => {
      if (err) {
        console.error(`Error creating folder ${folder}:`, err);
      } else {
        console.log(`Folder ${folder} created successfully.`);
      }
    });
  });
}

createFolders();
