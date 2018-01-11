function Set() {


    this.intersection = function (listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) {//check for invalid inputs
            return null;//exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    resultList.push(listB[j]);
                    break;
                }//if statement
            }//list b inner loop
        }//list a outer loop
        return resultList;

    } //end function


    this.union = function (listA, listB) {

        var resultList = [];

        /*-------------------------------Insert your code here -------------------------------------*/

        /*-------------------------------Insert your code here -------------------------------------*/

        return resultList;
    }


    this.relativeComplement = function (listA, listB) {

        var resultList = [];

        /*-------------------------------Insert your code here -------------------------------------*/

        /*-------------------------------Insert your code here -------------------------------------*/

        return resultList;
    }


    this.symmetricDifference = function (listA, listB) {

        var resultList = [];

        /*-------------------------------Insert your code here -------------------------------------*/

        /*-------------------------------Insert your code here -------------------------------------*/

        return resultList;
    }
}
	


