export default {
  'preTest': {
    'body': {
      'start': {
        'continue.text': 'Der Vortest ist zurzeit leider deaktiviert, wir arbeiten an einer Lösung. Überspringe den Vortest bitte vorerst.',
        'skip.text': 'Wenn du den Vortest überspringst, musst du alle Level spielen, um das Zertifikat zu erhalten. Außerdem kannst du den Vortest später nicht nachholen.'
      }
    }
  },
  'postTest': {
    'body': {
      'start': {
        'continue.text': 'Im Nachtest wird dein, durch alle Level erworbenes, Wissen auf die Probe gestellt. Falls du den Vortest gemacht hast, können wir so außerdem deinen Lernprozess feststellen. Nach dem erfolgreichen Abschluss des Nachtests erhälst du ein Zertifikat.'
      },
      'end': {
        'repeatLevels': 'Folgende Level solltest du dir noch einmal angucken:',
        'certificateUnlocked.1': 'Herzlichen Glückwunsch! Mit diesem perfekten Ergebnis habst du das',
        'certificateUnlocked.2': 'freigeschaltet. In 4 Wochen wird außerdem der Retentiontest für dich freigeschaltet. Wir werden dich dann per E-Mail daran erinnern.',
        'result': 'Du hast {{actual}} von {{total}} Fragen richtig beantwortet.',
        'repeat': 'Bevor du das aber tust, solltest du dir insbesondere die folgenden Level noch einmal anschauen:',
        'lessThan75Percent': {
          'caption': 'Das war leider nicht so gut!',
          'caption.right': 'Das war ganz okay!',
          'text.1': 'Das',
          'text.2': 'erhälst du, wenn du alle Fragen richtig beantwortet hast. Allerdings beträgt dein Score weniger als 75%. Dieser berechnet sich aus der Anzahl richtig beantworteter Fragen und deinen Angaben darüber, wie sicher du dir über deine Antwort warst. Solltest du also alle Fragen korrekt beantwortet haben, warst du dir aber immer sehr unsicher und wir raten dir, den Posttest zu wiederholen.',
          'text.right.1': 'Du hast alle Fragen richtig beantwortet und erhälst somit das',
          'text.right.2': '! Trotzdem warst du dir oft unsicher und selltest daher einige Level wiederholen um sicher Phishing-Attacken zu erkennen.'
        },
        'lessThan90Percent': {
          'caption': 'Das war schon ganz gut!',
          'caption.right': 'Das war schon ganz okay!',
          'text.1': 'Das ist ein gutes Ergebnis, trotzdem war noch der ein oder andere Fehler dabei, oder du warst dir oft sehr unsicher bei deiner Antwort. Um das',
          'text.2': 'zu erhalten, musst du alle Fragen richtig beantworten.',
          'text.right.1': 'Du habst alle Fragen richtig beantwortet und erhälst somit das',
          'text.right.2': '! Trotzdem warst du dir oft unsicher und solltst daher einige Level wiederholen um sicher Phishing-Attacken zu erkennen.'
        },
        'greaterThan90Percent': {
          'caption': 'Sehr gut!',
          'caption.right': 'Sehr gut!',
          'text.1': 'Das ist ein gutes Ergebnis, trotzdem war noch der ein oder andere Fehler dabei, oder du warst dir oft sehr unsicher bei deiner Antwort. Um das',
          'text.2': 'zu erhalten, müssen Sie alle Fragen richtig beantworten',
          'text.right.1': 'Du habst alle Fragen richtig beantwortet und erhälst somit das',
          'text.right.2': '! Trotzdem warst du dir teilweise unsicher und solltst daher einige Level wiederholen um sicher Phishing-Attacken zu erkennen.'
        },
        'result100Percent': {
          'caption': 'Sehr gut!',
          'text.1': 'Du hast alle Fragen richtig und sicher beantwortet und erhälst somit das',
          'text.2': '. Das ist ein super Ergebnis! Schaue in 4 Wochen wieder vorbei, um beim Retention-Test festzustellen, ob du immernoch alle Tricks erkennst.'
        }
      }
    }
  },
  'certificate': {
    'body': {
      'text.1': 'Glückwunsch, Du hast dir das Zertifikat verdient!',
      'text.2': 'Das Zertifikat wird manuell erstellt und dir per E-Mail zugeschickt. Schicke dazu bitte eine Mail an: ',
      'text.3': 'Bitte beachte, dass es einige Tage dauern kann, bis du dein Zertifikat erhälst.',
      'name': 'Dein Name'
    }
  },
  'retentionTest': {
    'body': {
      'start': {
        'continue.text': 'Im Retentiontest wird überprüft, wie es einen Monat nach dem Nachtest um dein Wissen steht. Falls du den Vortest gemacht hast, können wir so außerdem deinen Lernprozess feststellen.'
      },
      'end': {
        'repeat': 'Wollst du den Retentiontest in einem halben Jahr noch einmal durchführen? Wir erinnern dich gerne per E-Mail!',
        'repeat.button': 'Retentiontest in einem halben Jahr noch einmal durchführen!'
      }
    }
  },
  'settings': {
    'header': {
      'title': 'Einstellungen'
    },
    'body': {
      'password': {
        'modal': {
          'type': 'Bitte wähle denn gewünschten Passwort-Typ aus'
        }
      }
    }
  },
  'level': {
    'body': {
      'exit': 'Wenn du diese Seite verlässt, wird dein Spielstand für dieses Level nicht gespeichert. Bist du dir sicher?',
      'result': {
        'failed': 'Leider hast du alle deine Leben verloren. Versuche es am besten erneut!',
        'succeeded': 'Gratulation! Du hast {{correct}} Fragen richtig und {{wrong}} Fragen falsch beantwortet und damit das Level erfolgreich abgeschlossen. Auf zum nächsten Level!'
      }
    }
  },
  'finishedAllLevels': {
    'text': 'Du hast das Spiel komplett durchgespielt. Dabei hast du viel gelernt und bist nun gegen gänginge Phishing-Tricks gewappnet. Wenn du weiterhin üben möchtest, vor allem um das Gelernte mal wieder aufzufrischen, kannst du über den Level-Überblick in die einzelnen Levels springen.',
    'text2': 'Im Folgenden empfehlen wir dir ungefähr vier Wochen nach Absolvierung des Trainings die Durchführung des Wiederholungstests um das Gelernte wieder aufzufrischen und eventuelle Wissens-Lücken zu erkennen. Hierfür senden wir dir eine Mail mit dem Link zum Wiederholungstest.',
    'text3': 'Des Weiteren hast du nun die Möglichkeit auf der Übersichts-Seite ein Zertifikat über deine erfolgreiche Teilnahme am Anti-Phishing-Training anzufordern.',
    'postTest.1': 'Du hast nun auch den',
    'postTest.2': 'freigeschaltet. Nachdem du diesen Test erfolgreich bestanden hast, erhälst du außerdem noch ein Zertifikat.',
    'greeting': 'Dein NoPhish Team'
  },
  'components': {
    'test-question': {
      'phishing': {
        'web': 'Du möchtest die Webseite von {{provider}} besuchen. Entscheide, ob es sich um eine Phishing-Webseite oder eine Original-Webseite handelt.',
        'email': 'Dein Freund Max Müller hat folgende E-Mail erhalten. Entscheide, ob es sich um eine Phishing-E-Mail oder eine Original-E-Mail handelt.'
      },
      'howSure': 'Nun gib bitte an, wie sicher du dir über deine Antwort bist.',
      'provider': 'Hast du bei diesem Anbieter ein Nutzerkonto (einen Account)?',
      'argumentation': {
        'email': 'Bitte begründe deine Antwort. Stell dir hierbei vor, du müsstest nun deiner Großmutter, die nicht viel Ahnung von Internet und PCs hat, erklären, warum du denkst, dass die E-Mail eine Phishing-E-Mail ist bzw. eine Original-E-Mail ist.',
        'web': 'Bitte begründe deine Antwort. Stell dir hierbei vor, du müsstest nun deiner Großmutter, die nicht viel Ahnung von Internet und PCs hat, erklären, warum du denkst, dass die Webseite eine Phishing-Webseite ist bzw. eine Original-Webseite ist.'
      }
    },
    'level-exercise-item': {
      'provider': 'Du möchtest die Webseite von {{provider}} besuchen. Entscheide, ob es sich um eine Phishing-Webseite oder eine Original-Webseite handelt.',
      'provider.trust': 'Du möchtest die Webseite von {{provider}} besuchen. Würdest du auf dieser Seite sensible Daten eingeben?',
      'onlySelectDomain': 'Klicke nun den Wer-Bereich der folgenden Webadressen an.',
      'text': 'Ja, die Webadresse ist gefälscht. Nun zeige uns den Wer-Bereich. Klicke die entsprechende Stelle an.',
      'result': {
        'onlySelectDomain': {
          'right': 'Sehr gut! Du konntest den Wer-Bereich identifizieren.',
          'wrong': 'Leider konntst du den Wer-Bereich nicht identifizieren. Daher verlierst du ein Leben.'
        },
        'decide': {
          'right.nophish': 'Gut gemacht. Diese Webadresse ist nicht gefälscht, ihr kannst du vertrauen.',
          'right.phish': 'Du hast den Phish erkannt. Herzlichen Glückwunsch.',
          'wrong.nophish': 'Diese Webadresse ist nicht gefälscht. ihr kannst du ruhig vertrauen. Daher verlierst du ein Leben.',
          'wrong.phish': 'Falsch! Du wurdest ausgetrickst. Das ist eine gefälschte Webadresse. Daher verlierst du ein Leben.'
        },
        'select': {
          'wrong': 'Leider konntest du uns den Wer-Bereich nicht zeigen. Du verlierst daher ein Leben.'
        }
      }
    }
  },
  'flash': {
    'warning': {
      'verification': 'Deine E-Mail-Adresse ist noch nicht bestätigt. Klicke auf den Link in der E-Mail, die du nach der Registrierung erhalten hast, um deine E-Mail-Adresse zu bestätigen, oder fordere in den Einstellungen eine neue Bestätigungs-E-Mail an.'
    }
  }
};
