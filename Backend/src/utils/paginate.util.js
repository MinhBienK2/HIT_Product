class paginate {
   constructor(query, queryString) {
      (this.query = query), (this.queryString = queryString);
   }

   search() {
      if (this.queryString.search) {
         console.log(this.queryString.search);
         this.query = this.query.find({
            name: {
               $regex: `${this.queryString.search}`,
               $options: `i`,
            },
         });
      }
      return this;
   }

   filter() {
      const queryStr = { ...this.queryString };
      const exclude = ["sort", "limit", "populate", "page", "select"];
      exclude.forEach((el) => {
         delete queryStr[el];
      });
      const jsonString = JSON.stringify(queryStr);
      const data = jsonString.replace(
         /\b(gt|gte|lt|lte|in)\b/g,
         (match) => `$${match}`
      );
      this.query = this.query.find(JSON.parse(data));
      return this;
   }

   sort() {
      if (this.queryString.sort) {
         const strSort = this.queryString.sort.split(",").join(" ");
         this.query = this.query.sort(strSort);
         console.log(strSort);
      }
      return this;
   }

   select() {
      if (this.queryString.select) {
         const strSelect = this.queryString.select.split(",").join(" ");
         this.query = this.query.select(strSelect);
         console.log(strSelect);
      }
      return this;
   }

   pagination() {
      const limit = this.queryString.limit * 1 || 20;
      const page = this.queryString.page * 1 || 1;
      const skip = (page - 1) * limit;
      this.query = this.query.limit(limit).skip(skip);
      return this;
   }

   populate() {
      if (this.queryString.populate) {
         this.queryString.populate.split(",").forEach((populateOption) => {
            this.query = this.query.populate(populateOption);
            // const test = populateOption
            //    .split(".")
            //    .reverse()
            //    .reduce((a, b) => ({ path: b, populate: a }));
            console.log(populateOption);
         });
      }
      return this;
   }
}

module.exports = paginate;
