/**
 * Interface Base Repository
 */
 export default interface IRepository<T> {

  /**
   * @description Aggregation
   * @param pipeline 
   */
  aggregate(pipeline: Array<any>): Promise<any>

  /**
   * @description insert data in table
   * @param body {object} Body object to create the new document with
   */
  create(body: T): Promise<T>

  /**
     * @description Count the number of documents matching the query criteria
     * @param query {object} Query to be performed on the Model
     * @returns {Promise} Returns the results of the query
     */
   count(query : object) : Promise<any>

  /**
   * @description Delete an existing document on the Model
   * @param id {String} Id for the object to delete
   */
  delete(id : string): Promise<any>

  /**
   * @description Retrieve distinct "fields" which are in the provided status
   * @param query {Object} for tbe Select In Table 
   * @param field {string} for Distint
   */
  findDistinct(query: Object, field: string): Promise<any>

  /**
   * @description Retrieve a single document from the Model with the provided
   *   query
   * @param query {object} Query to be performed on the Model
   * @param {object} [projection] Optional: Fields to return or not return from
   * query
   * @param {object} [options] Optional options to provide query     */
  findOne(query: Object, projection?: Object, options?: Object): Promise<any>

  /**
   * @description Retrieve multiple documents from the Model with the provided
   *   query
   * @param query {object} - Query to be performed on the Model
   * @param {object} [projection] Optional: Fields to return or not return from
   * query
   * @param {object} [sort] - Optional argument to sort data
   * @param {object} [options] Optional options to provide query
   * @returns {Promise} Returns the results of the query
   */
  find(query: any, projection?: Object, sort?: Object | string, options?: Object): Promise<any>

  /**
  * @description Retrieve a single document matching the provided ID, from the
  *   Model
  * @param id {string} Required: ID for the object to retrieve
  * @param {object} [projection] Optional: Fields to return or not return from
  * query
  * @param {object} [options] Optional: options to provide query
  * @returns {Promise} Returns the results of the query
  */
  findById(id: string, projection?: Object, options?: Object): Promise<any>

  /**
  * @description Update a document matching the provided ID, with the body
  * @param id {string} ID for the document to update
  * @param body {object} Body to update the document with
  * @param {object} [options] Optional options to provide query
  * @returns {Promise} Returns the results of the query
  */
  update(id: string, body: Object, options?: Object): Promise<any>

}