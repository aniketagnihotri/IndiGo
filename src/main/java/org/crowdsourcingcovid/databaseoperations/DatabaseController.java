package org.crowdsourcingcovid.databaseoperations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Controller
@RequestMapping("/api/db")
public class DatabaseController {

    @Autowired
    private BusinessReviewsRepository businessReviewsRepository;

    @RequestMapping(path="/getBusinessReview/{id}")
    public @ResponseBody Collection<BusinessReview> getReviewsByBusiness(@PathVariable String id) {
        return businessReviewsRepository.getBusinessReviewsByID(id);
    }

    @RequestMapping(path="/addBusinessReview/{id}/{user}/{rating}/{review}/{dateTime}")
    public @ResponseBody boolean addBusinessReviewByID(@PathVariable String id, @PathVariable String user,
                                                       @PathVariable double rating, @PathVariable String review,
                                                       @PathVariable String dateTime) {
        return businessReviewsRepository.addBusinessReviewByID(id, user, rating, review, dateTime);
    }

    @RequestMapping("/removeBusinessReview/{user}/{review}")
    public @ResponseBody boolean removeBusinessReviewByUserAndReview(@PathVariable String user, @PathVariable String review) {
        return businessReviewsRepository.removeBusinessReviewByUserAndReview(user, review);
    }

}