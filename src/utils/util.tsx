import data from "../../data/pictogramslist"

const checkMatching = (frase: string): string => {
  const res = data.filter(picto => picto.text === frase)
  if (res.length > 0) {
    return res[0].uri
  } else {
    return ""
  }
}

export const max_in_picto = 5

export const findThePictoRecursive = (frase: string, lunghezza_frase: number, parole_da_cercare: number): string => {
  // se la lunghezza della frase è maggiore delle parole ricercate si va ad iterare
  if (lunghezza_frase > parole_da_cercare) {
    let i = 0   // indice di partenza della frase da analizzare
    let fine = parole_da_cercare    // indice di fine della frase da analizzare
    let flag = false    // flag che indica se si è trovato qualcosa nell'iterazione
    let parola_trovata = ""
    let cycle_found = ""

    while (fine <= lunghezza_frase && !flag) {
      const nuova = frase.split(" ").slice(i, fine).join(" ")
      const resultCheck = checkMatching(nuova)
      if (resultCheck !== "") {
        flag = true
        parola_trovata = nuova
        cycle_found = resultCheck
      }
      i++
      fine++
    }

    if (flag) {
      const [first, ...rest] = frase.split(parola_trovata)
      const remainder = rest.join(parola_trovata)

      if (first === "") {
        const nuova_pulita = remainder.split(" ").filter(item => item !== "").join(" ")
        return `${cycle_found}+${findThePictoRecursive(nuova_pulita, nuova_pulita.split(" ").length, parole_da_cercare)}`
      } else if (remainder === "") {
        const nuova_pulita = first.split(" ").filter(item => item !== "").join(" ")
        return `${findThePictoRecursive(nuova_pulita, nuova_pulita.split(" ").length, parole_da_cercare)}+${cycle_found}`
      } else {
        const pulita1 = first.split(" ").filter(item => item !== "").join(" ")
        const pulita2 = remainder.split(" ").filter(item => item !== "").join(" ")
        return `${findThePictoRecursive(pulita1, pulita1.split(" ").length, parole_da_cercare)}+${cycle_found}+${findThePictoRecursive(pulita2, pulita2.split(" ").length, parole_da_cercare)}`
      }

    } else {
      // se non si è trovato nessuna corrispondenza si richiama la funzione sulla stessa frase intera
      // e diminuendo di 1 le parole da ricercare
      return findThePictoRecursive(frase, frase.split(" ").length, parole_da_cercare - 1)
    }

  } else if (lunghezza_frase === parole_da_cercare) {
    const res = checkMatching(frase)
    if (res !== "") {
      return res
      // se si trova un match si restituisce il match
    } else {
      if (parole_da_cercare === 1) {
        return "_0"
        // se non si trova il match e siamo arrivati a cercare una sola parola allora vuol dire che questa parola non
        // sta nel db e quindi si restituisce undefined
      } else {
        return findThePictoRecursive(frase, lunghezza_frase, parole_da_cercare - 1)
        // se non si trova ma si può scendere sulle da cercare si richiama con gli stessi parametri
        // diminuendo le parole da cercare
      }
    }
  } else {
    return findThePictoRecursive(frase, lunghezza_frase, lunghezza_frase)
    // se la lunghezza è minore delle parole cercate semplicemente si richiama con numero di parole da cercare
    // uguale alla lunghezza (tutte le frasi di lunghezza minore di max_in_picto)
  }

}


export const findThePicto = (main: string): string[] => {
  const res: string[] = []
  while (main.length > 0) {
    // copio la stringa completa in una var temporanea
    let check = main
    // itero finché la var temp non è vuota
    while (check.length > 0) {
      // per ogni elemento nel db itero e cerco una compatibilità
      data.every((item) => {
        // trovato la compatibilità
        if (item.text === check) {
          // pusho nell'array degli id quello trovato
          res.push(item.uri)
          // modifico la stringa main togliendo dall'inizio le parole che ho trovato (check)
          main = main.substring(check.length + 1, main.length)
          check = ""
          return false
        }
        // uso every invece che foreach così posso breakare una volta trovato
        return true
      })
      const index = check.lastIndexOf(" ")
      if (index === -1 && check.length > 0) {
        res.push("_0")
        main = main.substring(check.length + 1, main.length)
        check = ""
      } else {
        check = check.substring(0, index)
      }
    }
  }
  return res
}

export const findThePictoDummy = async(msg: string) => {
  const wordsArray = msg.split(" ") // splits the text up in chunks
  // eslint-disable-next-line prefer-const
  let res = []
  for (const element of wordsArray) {
    const response = await fetch(`https://api.arasaac.org/api/pictograms/it/search/${element}`)
    const json = await response.json()
    if (json[0]) {
      res.push(`https://api.arasaac.org/api/pictograms/${json[0]._id}?download=false`)
    } else {
      res.push("https://api.arasaac.org/api/pictograms/3418?download=false")
    }
  }
  return res
}
