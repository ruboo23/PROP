import React from "react";
import axios from 'axios'

export default async function sendPushNotification(title: string, body: string, appId: number, appToken: string) {
  const apiUrl = 'https://app.nativenotify.com/api/notification';
  // Obtiene la fecha actual y formatea como 'DD-MM-YYYY h:mmA'
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const postData = {
    appId: appId,
    appToken: appToken,
    title: title,
    body: body,
    dateSent: formattedDate,
    pushData: { yourProperty: 'yourPropertyValue' },
    bigPictureURL: 'Big picture URL as a string',
  };

  try {
    const response = await axios.post(apiUrl, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Notification sent successfully:', response.data);
    console.log('Notificacion enviada a: ' + appId)
  } catch (error: any) {
    console.error('Error sending notification:', error.message);
  }
}


