function routerTemplate(camelCaseTableName:string,kebabCaseName:string){
let template:string=
`const ${camelCaseTableName}Route = require('express').Router();
import ${camelCaseTableName}Uploader from '../router-upload';
import {create,update,findOne,findAll,findOneWithRelation,filter,filterWithRelations,findAllWithSelectedRelation,remove} from '../module/${kebabCaseName}';
${camelCaseTableName}Route.post("", ${camelCaseTableName}Uploader.any(), async (req, res) => {
    try {
        let result = await create(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
${camelCaseTableName}Route.post("/update", ${camelCaseTableName}Uploader.any(), async (req, res) => {
    try {
        let result = await update(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
${camelCaseTableName}Route.get("", async (req, res) => {
    try {
        let result = await findAll(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
${camelCaseTableName}Route.get("/:id", async (req, res) => {
    try {
        let result = await findOne(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
${camelCaseTableName}Route.get("delete/:id", async (req, res) => {
    try {
        let result = await delete(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
${camelCaseTableName}Route.get("/with-relations/:id", async (req, res) => {
    try {
        let result = await findOneWithRelation(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});

${camelCaseTableName}Route.post("/filter", ${camelCaseTableName}Uploader.any(), async (req, res) => {
    try {
        let result = await filter(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
${camelCaseTableName}Route.post("/filter-with-relations", ${camelCaseTableName}Uploader.any(), async (req, res) => {
    try {
        let result = await filterWithRelations(req.body,req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
${camelCaseTableName}Route.get("/find-all-with-selected-relations", ${camelCaseTableName}Uploader.any(), async (req, res) => {
    try {
        let result = await findAllWithSelectedRelation(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
export default ${camelCaseTableName}Route;
`
return template;
}
export default routerTemplate;