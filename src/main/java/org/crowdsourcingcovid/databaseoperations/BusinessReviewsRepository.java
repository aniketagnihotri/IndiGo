package org.crowdsourcingcovid.databaseoperations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository("mysql")
public class BusinessReviewsRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static class BusinessReviewRowMapper implements RowMapper<BusinessReview> {
        @Override
        public BusinessReview mapRow(ResultSet resultSet, int i) throws SQLException {
            BusinessReview businessReview = new BusinessReview();
            businessReview.setId(resultSet.getString("id"));
            businessReview.setUser(resultSet.getString("user"));
            businessReview.setRating(resultSet.getDouble("rating"));
            businessReview.setReview(resultSet.getString("review"));
            businessReview.setDateTime(resultSet.getString("dateTime"));
            return businessReview;
        }
    }

    public List getBusinessReviewsByID(String id) {
        final String sql = "SELECT id, user, rating, review, dateTime FROM business_reviews WHERE id = ?";
        List<BusinessReview> businessReviewsList = jdbcTemplate.query(sql, new BusinessReviewRowMapper(), id);
        return businessReviewsList;
    }

    public boolean addBusinessReviewByID(String id, String user, double rating, String review, String dateTime) {
        final String sql = "INSERT INTO business_reviews (id, user, rating, review, dateTime) VALUES (?, ?, ?, ?, ?)";
        int dbReturn = jdbcTemplate.update(sql, new Object[] {id, user, rating, review, dateTime});
        if (dbReturn == 1) {
            return true;
        } else {
            return false;
        }
    }

    public boolean removeBusinessReviewByUserAndReview(String user, String review) {
        final String sql = "DELETE FROM business_reviews WHERE (user = ? AND review = ?)";
        int dbReturn = jdbcTemplate.update(sql, user, review);
        if (dbReturn == 1) {
            return true;
        } else {
            return false;
        }
    }

}