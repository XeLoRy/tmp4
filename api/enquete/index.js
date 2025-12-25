const { TableClient } = require('@azure/data-tables');
const sgMail = require('@sendgrid/mail');

module.exports = async function (context, req) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers, body: '' };
    return;
  }

  try {
    const data = req.body;
    context.log('Enquete received:', JSON.stringify(data));

    // Validation basique
    if (!data || !data.email) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ error: 'Email requis' })
      };
      return;
    }

    const timestamp = new Date().toISOString();
    const rowKey = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // 1. Stocker dans Azure Table Storage
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (connectionString) {
      try {
        const tableClient = TableClient.fromConnectionString(connectionString, 'enquetes');

        // Créer la table si elle n'existe pas
        await tableClient.createTable().catch(() => {});

        await tableClient.createEntity({
          partitionKey: 'enquete',
          rowKey: rowKey,
          timestamp: timestamp,
          nom: data.nom || '',
          email: data.email,
          telephone: data.telephone || '',
          quartier: data.quartier || '',
          priorite1: data.priorite1 || '',
          priorite2: data.priorite2 || '',
          priorite3: data.priorite3 || '',
          commentaire: data.commentaire || '',
          newsletter: data.newsletter ? 'oui' : 'non',
          benevolat: data.benevolat ? 'oui' : 'non'
        });
        context.log('Stored in Azure Table');
      } catch (tableError) {
        context.log('Table Storage error:', tableError.message);
      }
    } else {
      context.log('AZURE_STORAGE_CONNECTION_STRING not configured');
    }

    // 2. Envoyer email notification
    const sendgridKey = process.env.SENDGRID_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (sendgridKey && notificationEmail) {
      try {
        sgMail.setApiKey(sendgridKey);

        const emailContent = `
Nouvelle réponse à l'enquête citoyenne

Date: ${timestamp}
Nom: ${data.nom || 'Non renseigné'}
Email: ${data.email}
Téléphone: ${data.telephone || 'Non renseigné'}
Quartier: ${data.quartier || 'Non renseigné'}

Priorités:
1. ${data.priorite1 || '-'}
2. ${data.priorite2 || '-'}
3. ${data.priorite3 || '-'}

Commentaire:
${data.commentaire || 'Aucun'}

Newsletter: ${data.newsletter ? 'Oui' : 'Non'}
Bénévolat: ${data.benevolat ? 'Oui' : 'Non'}
        `.trim();

        await sgMail.send({
          to: notificationEmail,
          from: notificationEmail, // Doit être vérifié dans SendGrid
          subject: `[UEC] Nouvelle réponse enquête - ${data.nom || data.email}`,
          text: emailContent
        });
        context.log('Email sent');
      } catch (emailError) {
        context.log('SendGrid error:', emailError.message);
      }
    } else {
      context.log('SendGrid not configured');
    }

    context.res = {
      status: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Merci pour votre participation!' })
    };

  } catch (error) {
    context.log('Error:', error.message);
    context.res = {
      status: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur serveur' })
    };
  }
};
