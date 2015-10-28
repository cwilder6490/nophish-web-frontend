export default {
  'default': {
    'application': {
      'name': 'NOPHISH'
    },
    'modal': {
      'buttons': {
        'close': 'Schließen',
        'save': 'Speichern'
      }
    }
  },
  'index': {
    'header': {
      'title.small': 'Das Anti-Phishing Spiel'
    },
    'body': {
      'columns': {
        '1': {
          'title': 'Herzlich Willkommen!',
          'content': 'Wie sicher erkennen Sie Phishing-E-Mails oder Phishing-Links? Hier können Sie Ihr Wissen rund um das Thema Phishing testen und dieses darüber hinaus in unterschiedlichen Leveln erweitern.'
        },
        '2': {
          'title': 'Kostenlose Registrierung',
          'content': 'Bevor Sie starten können müssen Sich sich registrieren. Folgen Sie hierzu einfach den einzelnen Schritten, nachdem Sie auf den Menüpunkt „Registrieren“ geklickt haben.Nach der Registrierung erhalten Sie eine Bestätigungs-E-Mail. Zum erfolgreichen Abschließen der Registrierung klicken Sie bitte auf den in der E-Mail enthaltenen Link. Anschließend können Sie mit Hilfe eines Vortest herausfinden wie es um ihren aktuellen Wissensstand zum Thema Phishing steht. Je nachdem wie gut der Test läuft, haben Sie danach die Möglichkeit manche Level von NoPhish zu überspringen.'
        },
        '3': {
          'title': 'Und los gehts',
          'content': 'Zu Beginn jedes Levels erhalten Sie eine kurze Einführung über die Inhalte des Levels bevor Sie in den anschließenden Aufgaben Phishing-Links von vertrauenswürdigen Links unterscheiden sollen. Nach erfolgreichem Abschluss aller Level, folgt ein Abschlusstest, der Ihnen Ihren Lernerfolg aufzeigen soll. Schließlich erhalten Sie ein Zertifikat über die erfolgreiche Teilnahme. Nach vier Wochen folgt ein Retention-Test, der Ihnen die Möglichkeit bietet, festzustellen, ob Sie noch genau so fit in diesem Thema sind, oder ob sie manche Level wiederholen könnten.'
        }
      }
    }
  },
  'login': {
    'header':{
      'title': 'Login'
    },
    'body': {
      'email': 'E-Mail-Adresse',
      'continue': 'Weiter zur Passworteingabe',
      'password': 'Passwort',
      'login': 'Anmelden',
      'placeholder': {
        'email': 'E-Mail',
        'password': 'Passwort'
      }
    }
  },
  'register': {
    'index': {
      'header': {
        'title': 'Registrierung'
      },
      'body': {
        'description': 'Wir bieten Ihnen diese zwei verschiedene Optionen zur Bestimmung Ihres persönlichen Passwortes an. Sie können ihre Entscheidung für ein Verfahren später noch ändern.',
        'things': 'Graphisches Passwort nutzen',
        'things.text': 'Nutzen Sie eine neue Form der Authentifizierung - Graphische Passwörter.',
        'example': 'Beispiel anzeigen',
        'things.confirm': 'Ich möchte das graphische Passwort nutzen',
        'standard': 'Gewöhnliches Text-Passwort nutzen',
        'standard.text': 'Nutzen Sie ein gewöhnliches textbasiertes Passwort zur Anmeldung.',
        'standard.confirm': 'Ich möchte das normale Passwort nutzen'
      }
    },
    'things': {
      'header': {
        'title': 'Registrierung',
        'title.small': 'Graphisches Passwort'
      },
      'body': {
        'info': {
          '1': 'Sie bekommen nacheinander mehrere Bilder aus verschiedenen Kategorien gezeigt. Merken Sie sich diese bitte gut, denn diese bilden Ihr persönliches Passwort. (Es kommt dabei nicht auf die Reihenfolge oder kleinste Details an).',
          '2': 'Wenn Sie Ihre 4 Bilder kennen, klicken Sie bitte auf “Registrieren”.',
          '3': 'Erfahrungswerte zeigen, dass man ein Bild gut wiedererkennt, wenn man es vier Sekunden, oder länger gesehen hat.',
          '4': 'Sie werden daraufhin aufgefordert Ihr Passwort einzugeben. Dazu schauen Sie sich bitte das Raster aus verschiedenen Bildern einer Kategorie an und klicken auf „Ihr” Bild. Dies wiederholt sich nun, bis Sie ihr Passwort eingegeben haben.'
        },
        'generate': 'Graphisches Passwort generieren',
        'example': 'Beispiel zeigen'
      },
      'modal': {
        'example': {
          'title': 'Graphisches Passwort - Beispiel',
          'body': {
            'password.1': 'Ihnen wird ein graphisches Passwort aus mehreren Bilder generiert. Diese Bilder sollten Sie sich gut merken.',
            'password.2': 'Nehmen wir an, ein Bild in Ihrem Passwort war dieser Füller:',
            'password.grid': 'Beispiel anzeigen',
            'grid.1': 'Bei der Passworteingabe werden Sie solch ein Raster gezeigt kriegen und sollten auf "Ihren" Füller klicken',
            'grid.2': 'Für jedes Bild in Ihrem Passwort wird Ihnen solch ein Raster gezeigt. Wählen Sie aus jedem Raster das eine Bild aus Ihrem Passwort aus, haben Sie sich erfolgreich eingeloggt.'
          }
        }
      }
    },
    'standard': {
      'header': {
        'title': 'Registrierung'
      },
      'body': {
        'password': 'Passwort*',
        'password.pattern': 'Das Passwort muss mindestens 8 Zeichen lang sein',
        'password.repeat': 'Passwort wiederholen*',
        'placeholder': {
          'password': 'Passwort',
          'password.repeat': 'Passwort wiederholen'
        }
      }
    },
    'body': {
      'email': 'E-Mail-Adresse*',
      'email.info': 'Geben Sie hier bitte Ihre E-Mail-Adresse an. Wir senden Ihnen nach erfolgreicher Anmeldung eine Bestätigungs-Mail.',
      'informal': 'Dürfen wir Sie ab nun duzen?',
      'birth': 'Geburtsjahr',
      'birth.info': 'Dies ist eine optionale Angabe. Wir nutzen diese Angabe für eine statistische, anonymisierte Analyseverfahren.',
      'sex': 'Geschlecht',
      'sex.info':  'Dies ist eine optionale Angabe. Wir nutzen diese Angabe für eine statistische, anonymisierte Analyseverfahren.',
      'browser': 'Standard-Browser',
      'browser.info': 'Geben Sie hier bitte den Internetbrowser an, mit dem Sie am häufigsten im Internet surfen. Wir nutzen diese Angabe für eine, auf Sie zugeschnittene, Individualisierung von Nophish.',
      'email-client': 'E-Mail Programm',
      'email-client.info': 'Geben Sie hier bitte den E-Mail-Client an, mit dem Sie für gewöhnlich Ihre E-Mails abrufen. Wir nutzen diese Angabe für eine, auf Sie zugeschnittene, Individualisierung von Nophish.',
      'register': 'Registrieren',
      'placeholder': {
        'email': 'E-Mail',
        'birth': 'Geburtsjahr',
        'sex': {
          'undefined': 'nicht angeben',
          'male': 'männlich',
          'female': 'weiblich'

        }
      }
    }
  },
  'preTest': {
    'header':{
      'title': 'Vortest'
    },
    'body': {
      'start': {
        'continue': 'Vortest beginnen',
        'continue.text': 'Durch den Vortest kann Ihr bisheriges Wissen zum Thema Phishing festgestellt werden. Außerdem können Sie auf dieser Grundlage eventuell einige Level des Spiels überspringen.',
        'continue.confirm': 'Vortest beginnen',
        'skip': 'Vortest überspringen',
        'skip.text': 'Wenn Sie den Vortest überspringen, müssen Sie alle Level spielen, um das Zertifikat zu erhalten. Außerdem können Sie den Vortest später nicht nachholen.',
        'skip.confirm': 'Vortest überspringen'
      }
    }
  },
  'postTest': {
    'header':{
      'title': 'Nachtest'
    },
    'body': {
      'start': {
        'continue': 'Nachtest beginnen',
        'continue.text': 'Im Nachtest wird Ihr, durch alle Level erworbenes, Wissen auf die Probe gestellt. Falls Sie den Vortest gemacht haben, können wir so außerdem Ihren Lernprozess feststellen. Nach dem erfolgreichen Abschluss des Nachtests erhalten Sie ein Zertifikat.',
        'continue.confirm': 'Nachtest beginnen'
      },
      'end': {
        'repeatLevels': 'Folgende Level sollten Sie sich noch einmal angucken:',
        'certificateUnlocked.1': 'Herzlichen Glückwunsch! Mit diesem perfekten Ergebnis haben Sie das',
        'certificateUnlocked.2': 'freigeschaltet. In 4 Wochen wird außerdem der Retentiontest für Sie freigeschaltet. Wir werden Sie dann per E-Mail daran erinnern.',
        'result': 'Sie haben {{actual}} von {{total}} Fragen richtig beantwortet.',
        'repeat': 'Bevor Sie das aber tun, sollten Sie sich insbesondere die folgenden Level noch einmal anschauen:',
        'lessThan75Percent': {
          'caption': 'Das war leider nicht so gut!',
          'caption.right': 'Das war ganz okay!',
          'text.1': 'Das',
          'text.2': 'erhalten Sie wenn Sie alle Fragen richtig beantwortet haben. Allerdings beträgt Ihr Score weniger als 75%. Dieser berechnet sich aus der Anzahl richtig beantworteter Fragen und Ihrer Angaben darüber, wie sicher Sie sich über ihre Antwort waren. Sollten Sie also alle Fragen korrekt beantwortet haben, waren Sie sich aber immer sehr unsicher und wir raten Ihnen, den Posttest zu wiederholen.',
          'text.right.1': 'Sie haben alle Fragen richtig beantwortet und erhalten somit das',
          'text.right.2': '! Trotzdem waren Sie sich oft unsicher und sollten daher einige Level wiederholen um sicher Phishing-Attacken zu erkennen.'
        },
        'lessThan90Percent': {
          'caption': 'Das war schon ganz gut!',
          'caption.right': 'Das war schon ganz okay!',
          'text.1': 'Das ist ein gutes Ergebnis, trotzdem war noch der ein oder andere Fehler dabei, oder Sie waren sich oft sehr unsicher bei Ihrer Antwort. Um das',
          'text.2': 'zu erhalten, müssen Sie alle Fragen richtig und sicher beantworten.',
          'text.right.1': 'Sie haben alle Fragen richtig beantwortet und erhalten somit das',
          'text.right.2': '! Trotzdem waren Sie sich oft unsicher und sollten daher einige Level wiederholen um sicher Phishing-Attacken zu erkennen.'
        },
        'greaterThan90Percent': {
          'caption': 'Sehr gut!',
          'caption.right': 'Sehr gut!',
          'text.1': 'Das ist ein gutes Ergebnis, trotzdem war noch der ein oder andere Fehler dabei, oder Sie waren sich oft sehr unsicher bei Ihrer Antwort. Um das',
          'text.2': 'zu erhalten, müssen Sie alle Fragen richtig beantworten',
          'text.right.1': 'Sie haben alle Fragen richtig beantwortet und erhalten somit das',
          'text.right.2': '! Trotzdem waren Sie sich teilweise unsicher und sollten daher einige Level wiederholen um sicher Phishing-Attacken zu erkennen.'
        },
        'result100Percent': {
          'caption': 'Sehr gut!',
          'text.1': 'Sie haben alle Fragen richtig und sicher beantwortet und erhalten somit das',
          'text.2': '. Das ist ein super Ergebnis! Schauen Sie in 4 Wochen wieder vorbei, um beim Retention-Test festzustellen, ob Sie immernoch alle Tricks erkennen.'
        }
      }
    }
  },
  'certificate': {
    'body': {
      'text.1': 'Glückwunsch, Sie haben sich das Zertifikat verdient!',
      'text.2': 'Das Zertifikat wird manuell erstellt und Ihnen per E-Mail zugeschickt. Tragen Sie dazu bitte Ihren Namen in das Textfeld ein. Ihr Name wird lediglich für die Erstellung des Zertifikats benötigt und nicht an Dritte weitergegeben.',
      'text.3': 'Bitte beachten Sie, dass es einige Tage dauern kann, bis Sie Ihr Zertifikat erhalten.',
      'name': 'Ihr Name'
    }
  },
  'retentionTest': {
    'header':{
      'title': 'Retentiontest'
    },
    'body': {
      'start': {
        'continue': 'Retentiontest beginnen',
        'continue.text': 'Im Retentiontest wird überprüft, wie es einen Monat nach dem Nachtest um Ihr Wissen steht. Falls Sie den Vortest gemacht haben, können wir so außerdem Ihren Lernprozess feststellen.',
        'continue.confirm': 'Retentiontest beginnen'
      },
      'end': {
        'repeat': 'Wollen Sie den Retentiontest in einem halben Jahr noch einmal durchführen? Wir erinnern Sie gerne per E-Mail!',
        'repeat.button': 'Retentiontest in einem halben Jahr noch einmal durchführen!'
      }
    }
  },
  'dashboard': {
    'header': {
      'title': 'Übersicht'
    }
  },
  'settings': {
    'header': {
      'title': 'Einstellungen'
    },
    'body': {
      'password': {
        'label': 'Passwort',
        'button': 'Passwort ändern',
        'modal': {
          'title': 'Passwort ändern',
          'type': 'Bitte wählen Sie denn gewünschten Passwort-Typ aus',
          'type.things': 'Graphishes Passwort',
          'type.standard': 'Normales Passwort'
        }
      },
      'save': 'Speichern'
    }
  },
  'level': {
    'body': {
      'exit': 'Wenn Sie diese Seite verlassen, wird Ihr Spielstand für dieses Level nicht gespeichert. Sind Sie sich sicher?',
      'result': {
        'failed': 'Leider haben Sie alle Ihre Leben verloren. Versuchen Sie es am besten erneut!',
        'succeeded': 'Gratulation! Sie haben {{correct}} Fragen richtig und {{wrong}} Fragen falsch beantwortet und damit das Level erfolgreich abgeschlossen. Auf zum nächsten Level!'
      }
    }
  },
  'finishedAllLevels': {
    'text': 'Sie haben das Spiel komplett durchgespielt. Dabei haben Sie viel gelernt und sind nun gegen gänginge Phishing-Tricks gewappnet. Wenn Sie weiterhin üben möchten, vor allem um das Gelernte mal wieder aufzufrischen, können Sie über den Level-Überblick in die einzelnen Levels springen.',
    'postTest.1': 'Sie haben nun auch den',
    'postTest.2': 'freigeschaltet. Nachdem Sie diesen Test erfolgreich bestanden haben, erhalten Sie außerdem noch ein Zertifikat.',
    'greeting': 'Ihr NoPhish Team'
  },
  'components': {
    'nav-bar': {
      'settings': 'Einstellungen',
      'register': 'Registrieren',
      'login': 'Anmelden',
      'logout': 'Abmelden'
    },
    'things-register': {
      'counter': 'Bild {{current}} von {{total}}',
      'buttons': {
        'previous': 'Vorheriges Bild',
        'next': 'Nächstes Bild'
      }
    },
    'test': {
      'counter': 'Frage {{current}} von {{total}}'
    },
    'test-question': {
      'phishing': {
        'web': 'Sie möchten die Webseite von {{provider}} besuchen. Entscheiden Sie, ob es sich um eine Phishing-Webseite oder eine Original-Webseite handelt.',
        'email': 'Ihr Freund Max Müller hat folgende E-Mail erhalten. Entscheiden Sie, ob es sich um eine Phishing-E-Mail oder eine Original-E-Mail handelt.',
        'isPhishing': 'Phishing',
        'isOriginal': 'Orginal'
      },
      'howSure': 'Nun geben Sie bitte an, wie sicher Sie sich über Ihre Antwort sind.',
      'howSure.1': 'Sehr unsicher',
      'howSure.2': 'Unsicher',
      'howSure.3': 'Mittel',
      'howSure.4': 'Sicher',
      'howSure.5': 'Sehr sicher',
      'provider': 'Haben Sie bei diesem Anbieter ein Nutzerkonto (einen Account)?',
      'provider.yes': 'Ja',
      'provider.no': 'Nein',
      'argumentation': {
        'email': 'Bitte begründen Sie Ihre Antwort. Stellen Sie sich hierbei vor, Sie müssten nun Ihrer Großmutter, die nicht viel Ahnung von Internet und PCs hat, erklären, warum Sie denken, dass die E-Mail eine Phishing-E-Mail ist bzw. eine Original-E-Mail ist.',
        'web': 'Bitte begründen Sie Ihre Antwort. Stellen Sie sich hierbei vor, Sie müssten nun Ihrer Großmutter, die nicht viel Ahnung von Internet und PCs hat, erklären, warum Sie denken, dass die Webseite eine Phishing-Webseite ist bzw. eine Original-Webseite ist.'
      },
      'buttons': {
        'next': 'Nächste Frage',
        'submit': 'Test abschließen'
      }
    },
    'level-exercise-item': {
      'provider': 'Sie möchten die Webseite von {{provider}} besuchen. Entscheiden Sie, ob es sich um eine Phishing-Webseite oder eine Original-Webseite handelt.',
      'provider.trust': 'Sie möchten die Webseite von {{provider}} besuchen. Würden Sie auf dieser Seite sensible Daten eingeben?',
      'onlySelectDomain': 'Klicken Sie nun den Wer-Bereich der folgenden Webadressen an.',
      'text': 'Ja, die Webadresse ist gefälscht. Nun zeigen Sie uns den Wer-Bereich. Klicken Sie die entsprechende Stelle an.',
      'result': {
        'onlySelectDomain': {
          'right': 'Sehr gut! Sie konnten den Wer-Bereich identifizieren.',
          'wrong': 'Leider konnten Sie den Wer-Bereich nicht identifizieren. Daher verlieren Sie ein Leben.'
        },
        'decide': {
          'right.nophish': 'Gut gemacht. Diese Webadresse ist nicht gefälscht, ihr können Sie vertrauen.',
          'right.phish': 'Sie haben den Phish erkannt. Herzlichen Glückwunsch.',
          'wrong.nophish': 'Diese Webadresse ist nicht gefälscht. ihr können Sie ruhig vertrauen. Daher verlieren Sie ein Leben.',
          'wrong.phish': 'Falsch! Sie wurden ausgetrickst. Das ist eine gefälschte Webadresse. Daher verlieren Sie ein Leben.'
        },
        'select': {
          'wrong': 'Leider konnten Sie uns den Wer-Bereich nicht zeigen. Sie verlieren daher ein Leben.'
        }
      }
    }
  },
  'flash': {
    'success': {
      'login': 'Erfolgreich angemeldet!',
      'logout': 'Erfolgreich abgemeldet!'
    },
    'warning': {
      'verification': 'Ihre E-Mail-Adresse ist noch nicht bestätigt. Klicken Sie auf den Link in der E-Mail, die Sie nach der Registrierung erhalten haben, um Ihre E-Mail-Adresse zu bestätigen, oder fordern Sie in den Einstellungen eine neue Bestätigungs-E-Mail an.'
    },
    'error': {
      'login': 'Das Passwort ist nicht korrekt.',
      'email': 'Diese E-Mail ist nicht registriert.',
      'unknown': 'Es ist ein unbekannter Fehler aufgetreten.'
    }
  }
};
