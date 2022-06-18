const { admin, db } = require("../secrets/admin");

exports.list = async function (req, res, next) {

    try {
        //https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentSnapshot
        //https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore
        const firebaseCollection = "courses"
        const data = []

        //A db -(has)-> Collections -(When we "get" the current db state that's a)-> Snapshot 
        const snapshot = await db
            .collection(firebaseCollection)
            .get()

        //Collection -(has)-> Documents -(has)-> Fields 
        snapshot
            .docs
            .map((doc) => {
                //Every documents is "like" an individual row
                const fields = { ...doc.data() }
                data.push(fields)
            })

        if (data.length == 0) res.status(200).json({ data: "no data" });
        if (data.length > 0) res.status(200).json({ data: data });

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "❌"
        });
    }
}