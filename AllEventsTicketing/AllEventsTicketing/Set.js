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

        if (listA === null || listB === null) {//check for invalid inputs
            return null;//exit and return null to indicate an error
        }


        var complimentA = this.relativeComplement(listA,listB);
        var complimentB = this.relativeComplement(listB,listA);
        var intersection = this.intersection(listA,listB);

        for(i=0; i < complimentA.length; i++){
            resultList.push(complimentA[i]);
        }
        for(i=0; i < complimentB.length; i++){
            resultList.push(complimentB[i]);
        }
        for(i=0; i < intersection.length; i++){
            resultList.push(intersection[i]);
        }



        return resultList;

    }


    this.relativeComplement = function (listA, listB) {
        var resultList = [];
        if (listA === null || listB === null) {//check for invalid inputs
            return null;//exit and return null to indicate an error
        }
        if(listB == 0){
            return listA;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    break;
                }
                if (j == listB.length - 1){
                    resultList.push(nextValue);
                }//if statement
            }//list b inner loop
        }//list a outer loop
        return resultList;
    }


    this.symmetricDifference = function (listA, listB) {
        if (listA === null || listB === null) {//check for invalid inputs
            return null;//exit and return null to indicate an error
        }
        var resultList = [];

        var complimentA = this.relativeComplement(listA,listB);
        var complimentB = this.relativeComplement(listB,listA);

        for(i=0; i < complimentA.length; i++){
            resultList.push(complimentA[i]);
        }
        for(i=0; i < complimentB.length; i++){
            resultList.push(complimentB[i]);
        }

        return resultList;
    }
}
	


