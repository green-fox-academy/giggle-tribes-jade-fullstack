import { kingdomService } from '../services';

const add = (req,res) => {
    const data = {
        kingdomId : req.params.kingdomId,
        countryCode : req.body.country_code
    };
    kingdomService.add(data)
     .then( response => res.status(201).json(response) )
     .catch( error => res.status(400).json({error}) );
};

const get = (req,res) => {
    kingdomService.get()
    .then( response => res.status(200).json(response) )
    .catch( error => res.status(400).json({error}) );
}

export const kingdomController = {
    add,
    get
};
