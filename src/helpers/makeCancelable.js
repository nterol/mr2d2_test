// Méthode permettant de définir une fonction d'annulation de promise

// Version définie par le package npm makeCancelable :

export default function makeCancelable(promise) {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val => {
      console.log(
        `Promise then, ${hasCanceled_ ? "Canceled" : "Not canceled"}`
      );
      return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val);
    });
    promise.catch(error => {
      console.log("Promise reject");
      hasCanceled_ ? reject({ isCanceled: true }) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
}
